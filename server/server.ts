import dotenv from 'dotenv'
dotenv.config()
import express, { Router } from 'express'
var cors = require('cors')

const app = express()
const port = 3000

app.use(cors(), express.json())
app.use('/api/fact', require('./Routes/fact'))
app.use('/api/kaibaChat', require('./Routes/kaibaChat'))

app.listen(port, '0.0.0.0', () => {
	console.log(`Server running on http://localhost:${port}`)
})
