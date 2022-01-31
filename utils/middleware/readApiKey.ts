// search db for key crypto(api-key-uuid)
import { RequestHandler } from "express"
import { readApiKey as keyParser } from '../apiKey'
import pool from '../../db/index'


const readApiKey: RequestHandler = async (req, res, next) => {
    const apiKey = req.get('x-api-key')
    const parsedKey = keyParser(apiKey!)
    try {
        const dbLookup = await pool.query(`
            SELECT * from apilogs
            WHERE api_key = $1
    `, [parsedKey]) // find apikey in db and get some info
        if (dbLookup.rowCount > 0) {
            res.locals.apiKeyInfo = dbLookup.rows[0]
        } else {
            return res.status(403).send({ message: "Key does not exist" })
        }

    } catch (error) {
        return res.status(500).send({ message: "Server Error" })
    }
    next()
}

export { readApiKey }