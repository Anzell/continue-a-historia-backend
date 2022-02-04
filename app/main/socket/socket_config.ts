import * as WebSocket from 'ws';
import {Server} from "http";
import {adaptSocketMessage} from "../adapters/socket_message_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import {Controller} from "../protocols/controller";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {CustomMessage} from "../protocols/custom_message";
import {PlayerEnterInRoomController} from "../../presenters/room/player_enter_in_room_controller";
import {UsecasesInjector} from "../../di/usecases_injector";
import {ConvertersInjector} from "../../di/converters_injector";

export default async (server: Server): Promise<void> => {
    const ws = new WebSocket.Server({
        server: server,
        verifyClient: await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });

    ws.on('connection', (ws: WebSocket) => {
        ws.on('message', async (data: any) => {
            let controller: Controller;
            switch (data['type']) {
                case TypeSocketMessages.playerEnterInRoom:
                    controller = new PlayerEnterInRoomController(await UsecasesInjector.insertUserInRoomUsecase(), await ConvertersInjector.playerEnterInRoomConverterFactory());
                    break;
                default:
                    ws.send(new CustomMessage({
                        type: "error",
                        content: "invalid_message_type"
                    }))
                    break;
            }
            await adaptSocketMessage(ws, data, controller!);
        });
    });
}
