import { RequestHandler } from "express";
import {VerifyClientCallbackAsync} from "ws";

export interface Middleware {
    handle: () => Promise<RequestHandler | VerifyClientCallbackAsync>;
}