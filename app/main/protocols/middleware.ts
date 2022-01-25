import { RequestHandler } from "express";

export interface Middleware {
    handle: () => Promise<RequestHandler>;
}