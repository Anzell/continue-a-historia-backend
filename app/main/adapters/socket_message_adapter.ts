import {Controller} from "../protocols/controller";
import * as WebSocket from 'ws';

export const adaptSocketMessage = async (ws: WebSocket, data: any, controller: Controller) => {
    const response = await controller.handle(data);
    ws.send(response.message);
}