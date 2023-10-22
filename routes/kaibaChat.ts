import { Router, Request, Response } from 'express'
import OpenAI from 'openai'
import {
	storeUserMessageAndAIResponseInCSVdb as storeInCSV,
	lookupCard,
	isUserMessageEmpty,
	IMessage,
	getOpenAiFormattedMessagesArray,
	addLatestMessageFromUser,
	lookupRuling,
	firstCompletion,
	getCompletionWithMessages,
} from '../utils'
import { runAiFunctionCallAndGetMessage } from '../services/functionCallingFunction'
import { Boat } from '../decorators/decorators'

const router = Router()

const openai = new OpenAI({
	apiKey: process.env.OPEN_API_KEY,
})
const boat = new Boat().fireCannons(2)
// boat.fireCannons()

router.post('/', async (req: Request, res: Response) => {
	const { messageHistory: userMessageHistory }: { messageHistory: string[] } =
		req.body
	const latestUserMessage = userMessageHistory[userMessageHistory.length - 1]

	if (isUserMessageEmpty(latestUserMessage, res)) {
		return
	}

	try {
		const messages: IMessage[] =
			getOpenAiFormattedMessagesArray(userMessageHistory)
		addLatestMessageFromUser(messages, latestUserMessage)

		const completion = await firstCompletion(openai, messages)

		const firstAiResponse = completion.choices[0].message

		if (!firstAiResponse.function_call) {
			const firstAiResponseContent = firstAiResponse.content
			storeInCSV(latestUserMessage, firstAiResponseContent as string)
			res.json({ message: `${firstAiResponse.content}` })
			return
		}

		const { role, name, content, functionArgument } =
			runAiFunctionCallAndGetMessage(firstAiResponse)
		messages.push({
			role,
			name,
			content,
		})

		const secondAiResponse = await getCompletionWithMessages(openai, messages)

		const secondAiResponseContent =
			secondAiResponse.choices[0].message.content?.toString()

		secondAiResponseContent &&
			storeInCSV(latestUserMessage, secondAiResponseContent, {
				name,
				argument: functionArgument,
			})

		res.json({ message: `${secondAiResponseContent}` })
	} catch (error: any) {
		if (error.response) {
			console.error(error.response.status, error.response.data)
			res.status(error.response.status).send(error.response.data)
		}
		console.error(`eroor with api req: ${error.message}`)
		res.status(500).send('error occured during the request')
	}
})

module.exports = router
