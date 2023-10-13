import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response } from 'express'
import path from 'path'
var cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors(), express.json())
app.use('/api/fact', require('./routes/fact'))
app.use('/api/kaibaChat', require('./routes/kaibaChat'))
// serve static assets in production
app.use(express.static('client/dist'))

app.get('*', (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
