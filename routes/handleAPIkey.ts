import { Router } from 'express'
import pool from '../db/index'
import { generator } from '../utils/apiKey'
let router = Router();

router.get('/generate', async (req, res) => {
	try {
		const isPaid = req.body.isPaid
		const authLevel = req.body.auth | 0
		const name = req.body.name || ""
		const keyGenerator = generator()
		let newKeyQuery = `
							INSERT INTO apilogs ( "api_key", "auth_level")
							VALUES($1, $2)
                        	`
		if (isPaid) {
			newKeyQuery =
				`
				INSERT INTO apilogs ("api_key","auth_level","paid","name")
				VALUES ($1, $2, $3, $4)
           		`
			await pool.query(newKeyQuery, [keyGenerator.encryption, authLevel, true, name])

		} else {
			await pool.query(newKeyQuery, [keyGenerator.encryption, authLevel])
		}


		return res.send({ key: keyGenerator.uuid })
	} catch (error) {
		console.log(error)
		return res.send(error)
	}

})

// router.get('/', async (req, res) => { // authlevel > 9 can fetch all apikeys

// })

// router.get('/:apiKey', async (req, res) => { // authlevel > 9 can fetch apikey and logs

// })

// router.put('/:apiKey', async (req, res) => {

// }) // auth level 8 > can update other auth levels





export default router
