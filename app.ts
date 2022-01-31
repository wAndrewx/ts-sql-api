import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet, { frameguard } from "helmet"
import handleProjects from './routes/handleProjects'
import handleAPIKey from './routes/handleAPIkey'
import { setAuthMultiplier } from './utils/middleware/setAuthMultiplier'
import { readApiKey } from './utils/middleware/readApiKey'
import { limitThreeMultiPerDay, limitKMultiPerHour } from './utils/middleware/rateLimit'
import pool from './db/index'
const app = express()
app.use(morgan("tiny"))
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "same-site" },
    frameguard: false,
    permittedCrossDomainPolicies: { permittedPolicies: "none" }
}))
app.disable("x-powered-by")
app.use(cors({ origin: "*" }))
app.use(express.json())

app.use('/key', limitThreeMultiPerDay, handleAPIKey)
app.use('/api', readApiKey, setAuthMultiplier, limitKMultiPerHour, handleProjects)

app.get('/', async (req, res) => {
    return res.send("Connected")
})
app.get('/test',(req,res)=>{
    return res.send("Test proxy")
})



export default app

// docker-compose -f docker-compose.dev.yml up --build