import { RequestHandler } from "express"
import { middlewareRequest } from '../../typings/express/index'
import pool from '../../db/index'
import { readApiKey } from '../apiKey'
export const setAuthMultiplier: RequestHandler = async (req: middlewareRequest, res, next) => {
    try {
        switch (parseInt(res.locals.apiKeyInfo.AuthLevel)) {
            case 0:
                req.authMulti = 1
                break;
            case 1:
                req.authMulti = 2
                break;
            case 2:
                req.authMulti = 3
                break;
            case 3:
                req.authMulti = 4
                break;
            default:
                req.authMulti = 5
                break;
        }
        res.locals.authMulti = req.authMulti



    } catch (error) {
        //send error
        // console.log(error)

        return res.json({ message: "Key does not exist" })

    }
    next()
}



