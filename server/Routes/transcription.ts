import { Router, Request, Response } from 'express'
import fs from 'fs'
import openai from 'openai'

const router = Router()

// router.get('/transcription', async (req: Request, res: Response) => {
// 	const transcription = await openai.audio.transcriptions.create({
// 		file: fs.createReadStream('./audio.m4a'),
// 		model: 'whisper-1',
// 	})

// 	res.json({ message: `${transcription.text}` })
// })

// router.post(
// 	'/transcription/upload',
// 	upload.single('audio'),
// 	async (req, res) => {
// 		console.log('File received:', req.file)
// 		res.json({ message: `Uploaded!` })
// 	}
// )

export { router }
