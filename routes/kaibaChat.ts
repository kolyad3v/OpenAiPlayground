import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import {
	appendToCsv,
	lookupCard,
	generateYugiohResponse,
	standardSystemContent,
	extractMessageHistoryAsGPTObject,
} from '../utils'

const router = Router()

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

router.post('/', async (req: Request, res: Response) => {
	console.log(req.body)
	const { messageHistory } = req.body
	const latestMessage = messageHistory[messageHistory.length - 1]
	if (latestMessage.trim().length === 0) {
		res.status(418).json({
			error: {
				message:
					"Don't waste my time with empty words. I have a company to run. ",
			},
		})
		return
	}
	try {
		const messages: {
			role: 'system' | 'assistant' | 'user' | 'function'
			name?: string
			content: string
		}[] = [
			{
				role: 'system',
				content: standardSystemContent,
			},
		]
		for (let msg of messageHistory) {
			messages.push(extractMessageHistoryAsGPTObject(msg))
		}

		messages.push({
			role: 'user',
			content: generateYugiohResponse(latestMessage),
		})
		console.log(messages)

		const completion = await openai.chat.completions.create({
			messages,
			model: 'gpt-3.5-turbo',
			temperature: 0.1,
			functions: [
				{
					name: 'lookup_card',
					description:
						' use this function to look up the exact details of a card from the user message, eg blue eyes',
					parameters: {
						type: 'object',
						properties: {
							cardName: {
								type: 'string',
								description:
									'the name of the card the user is referring to, eg dark magician',
							},
						},
						required: ['cardName'],
					},
				},
			],
		})
		console.log(completion)

		const responseMessage = completion.choices[0].message

		if (responseMessage.function_call) {
			const availableFunctions = {
				lookup_card: lookupCard,
			}
			const functionName = responseMessage.function_call.name
			//@ts-ignore
			const functionToCall = availableFunctions[functionName]
			const functionArgs = JSON.parse(responseMessage.function_call.arguments)
			const functionResponse = functionToCall(functionArgs.cardName)
			messages.push({
				role: 'assistant',
				content:
					'You must call the function I provide to check the effect and details of every card the user includes in their query. ',
			}) // extend conversation with function response
			messages.push({
				role: 'function',
				name: functionName,
				content: functionResponse,
			}) // extend conversation with function response
		}

		const secondResponse = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			temperature: 0.1,
			messages,
		})

		// Handle Storage of responses
		const csvString = `"${latestMessage}"\n` // Wrap it in quotes to handle commas in the message
		const csvAnswer = `"${secondResponse.choices[0].message.content}"\n`
		// Save it to a file (assuming the file already exists)
		try {
			appendToCsv(csvString, csvAnswer)
		} catch (err) {
			console.error(err)
		}
		res.json({ message: `${secondResponse.choices[0].message.content}` })
	} catch (error: any) {
		if (error.response) {
			console.error(error.response.status, error.response.data)
			res.status(error.response.status).json(error.response.data)
		} else {
		}
		console.error(`eroor with api req: ${error.message}`)
		res
			.status(500)
			.json({ error: { message: 'error occured during the request' } })
	}
})

module.exports = router
