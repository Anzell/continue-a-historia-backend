import {RequestHandler} from "express";
import {Socket} from "socket.io";

export interface HttpMiddleware {
    handle: () => Promise<RequestHandler>;
}

export interface SocketMiddleware{
    handle: (info: Socket) => Promise<boolean>;
}