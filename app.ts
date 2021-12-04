import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import handleProjects from './routes/handleProjects'
import handleAPIKey from './routes/handleAPIkey'
import { setAuthMultiplier } from './utils/middleware/setAuthMultiplier'
import { readApiKey } from './utils/middleware/readApiKey'
import { limitThreeMultiPerDay, limitKMultiPerHour } from './utils/middleware/rateLimit'
import pool from './db/index'
const app = express()
app.use(morgan("tiny"))
app.use(cors({ origin: true }))
app.use(express.json())


app.use('/key', limitThreeMultiPerDay, handleAPIKey)
app.use(readApiKey)
app.use(setAuthMultiplier)

app.use('/api', limitKMultiPerHour, handleProjects)

app.get('/', async (req, res) => {
    return res.send("Connected")
})



export default app

// docker-compose -f docker-compose.dev.yml up --build