import * as WebSocket from 'ws';
import {Server} from "http";
import {adaptSocketMessage} from "../adapters/socket_message_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";

export default async (server: Server): Promise<void> => {
    const ws = new WebSocket.Server({
        server: server,
        verifyClient: await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });

    ws.on('connection', (ws: WebSocket) => {
        ws.on('message', (data: any) => adaptSocketMessage(ws, data));
    });
}
