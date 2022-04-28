import * as WebSocket from 'socket.io';
import { Server } from "http";
import { adaptSocketMessage } from "../adapters/socket_message_adapter";
import { ControllersInjectorFactory } from "../../di/controllers_injector";
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import {CustomResponse} from "../protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

export default (server: Server): void => {
    const wss = new WebSocket.Server(server, {cors: {origin: "*"}});

    wss.use(async (socket, next) => {
            if(await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle(socket)){
                next();
            }
            socket.disconnect();
        });

    wss.sockets.on('connection', (ws) => {
         ws.on('message', async (data: any) => {
             await adaptSocketMessage(ws, wss, data);
         });
    });

}
