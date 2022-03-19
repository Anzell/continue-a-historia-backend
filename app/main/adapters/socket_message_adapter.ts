import {SocketController} from "../protocols/controller";
import * as WebSocket from 'ws';

export const adaptSocketMessage = async (ws: WebSocket, wss: WebSocket.Server, data: any, controller: SocketController) => {
    const response = await controller.handle(data);
    wss.clients.forEach((client)=>{
       client.send(JSON.stringify(response.content));
    });
}