import { request } from "./utils/superHook";
import pool from '../db'
import { Request, Response, NextFunction } from "express";
import { limitKMultiPerHour, limitTestFunction } from '../utils/middleware/rateLimit'
import { readApiKey } from '../utils/middleware/readApiKey'
import { setAuthMultiplier } from '../utils/middleware/setAuthMultiplier'
import { exportNamespaceSpecifier } from "@babel/types";


beforeAll(async () => {
    let connect = await pool.connect()
})
describe('Middleware ', () => {

    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction = jest.fn()

    beforeEach(() => {
        mockReq = {}
        mockRes = {
            json: jest.fn()
        }
    })


    describe(' Auth multiplier middleware ', () => {


        test('should fail since there is no key or invalid key provided ', async () => {

            mockReq = {
                headers: {

                }
            }

            setAuthMultiplier(mockReq as Request, mockRes as Response, mockNext)
            expect(mockRes.json).toBeCalledWith({ "message": "Key does not exist" })
        })
        test('should have an auth multiplier of 5', () => {
            mockRes = {
                locals: {
                    apiKeyInfo: {
                        AuthLevel: 4
                    }
                }
            }
            setAuthMultiplier(mockReq as Request, mockRes as Response, mockNext)
            expect(mockRes.locals.authMulti).toBe(5)
        })

    })

    describe('api key reader', () => {
        test('should fail with no x-api-key header provided', () => {
            mockReq = {
                headers: {
                    'x-api-key': ''
                }
            }
            readApiKey(mockReq as Request, mockRes as Response, mockNext)
            expect(mockNext).toBeCalledTimes(1)
        })
        test('should succeed given a valid api key', () => {
            mockReq = {
                headers: {
                    'x-api-key': '4613ea21-5b29-42a4-a336-98aaecf53856'
                }
            }

            readApiKey(mockReq as Request, mockRes as Response, mockNext)
            // console.log(mockRes.locals)
            // expect(mockRes.locals.apiKeyInfo).toHaveReturned()
        })


    })


})