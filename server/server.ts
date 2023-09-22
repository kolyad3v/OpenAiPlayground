import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
var cors = require('cors')
import OpenAI from 'openai'
import fs from 'fs'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

const app = express()
const port = 3000

app.use(cors())
app.get('/', (req, res) => {
	res.json({ message: `All Good on port ${port}` })
})

app.get('/hello', (req, res) => {
	res.send('Hello you cunt !')
})

app.get('/fact', async (req, res) => {
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

app.get('/transcription', async (req, res) => {
	const transcription = await openai.audio.transcriptions.create({
		file: fs.createReadStream('./audio.m4a'),
		model: 'whisper-1',
	})

	res.json({ message: `${transcription.text}` })
})

app.post('/transcription/upload', upload.single('audio'), async (req, res) => {
	console.log('File received:', req.file)
	res.json({ message: `Uploaded!` })
})

app.listen(port, '0.0.0.0', () => {
	console.log(`Server running on http://localhost:${port}`)
})
