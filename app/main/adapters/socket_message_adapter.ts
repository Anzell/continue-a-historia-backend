import {Controller} from "../protocols/controller";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import * as WebSocket from 'ws';

export const adaptSocketMessage = async (ws: WebSocket, data: any) => {
    const controller: Controller = await ControllersInjectorFactory.playerEnterInRoomControllerFactory();
    const response = await controller.handle(data);
    ws.send(response.message);
}