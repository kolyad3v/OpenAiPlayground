import { Router, Request, Response } from 'express'
import OpenAI from 'openai'

const router = Router()

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

router.get('/', async (req: Request, res: Response) => {
	const completion = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content:
					'You will give me a random interesting fact,chosen from either animals,culture or history keep to 20 words or less',
			},
		],
		model: 'gpt-3.5-turbo',
		temperature: 0.8,
		max_tokens: 50,
	})
	console.log(completion)

	res.json({ message: `${completion.choices[0].message.content}` })
})
module.exports = router
