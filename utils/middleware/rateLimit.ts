import rateLimiter from 'express-rate-limit'
import { RequestHandler, Handler } from "express"
import { middlewareRequest } from '../../typings/express/index'

const isDev = process.env.ENV === 'dev' ? 1 : 100


const limitThreeMultiPerDay = rateLimiter(
    {
        windowMs: 1000 * 60 * 60 * 24,
        max: function (req, res) {
            return 3 * res.locals.authMulti * isDev
        },
        message: "Too many keys requested, Try again tomorrow"
    }
)


const limitKMultiPerHour = rateLimiter(
    {
        windowMs: 1000 * 60 * 60,
        max: function (req, res) {
            return 1000 * res.locals.authMulti * isDev
        },
        message: "Too many requests, Try again in an hour"
    }
)


const limitTestFunction = rateLimiter(
    {
        windowMs: 1000 * 60 * 60,
        max: function (req, res) {
            return 1
        },
        message: "Too many requests, Try again in an hour"
    }
)

export { limitThreeMultiPerDay, limitKMultiPerHour, limitTestFunction }
