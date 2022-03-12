import {SocketController} from "../protocols/controller";
import * as WebSocket from 'ws';

export const adaptSocketMessage = async (ws: WebSocket, data: any, controller: SocketController) => {
    const response = await controller.handle(data);
    ws.send(JSON.stringify(response.content));
}