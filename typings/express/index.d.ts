import { Request } from "express";
import { Options } from "express-rate-limit";

export interface middlewareRequest extends Request {
    authMulti?: number
}

