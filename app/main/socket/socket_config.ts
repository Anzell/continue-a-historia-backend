import * as WebSocket from 'ws';
import {Server} from "http";
import {adaptSocketMessage} from "../adapters/socket_message_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import {SocketController} from "../protocols/controller";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {CustomMessage} from "../protocols/custom_message";

export default async (server: Server): Promise<void> => {
    const ws = new WebSocket.Server({
        server: server,
        verifyClient: await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });

    ws.on('connection', (ws: WebSocket) => {
        ws.on('message', async (data: any) => {
            let controller: SocketController;
            switch (data['type']) {
                case TypeSocketMessages.playerEnterInRoom:
                    controller = await ControllersInjectorFactory.playerEnterInRoomControllerFactory();
                    break;
                case TypeSocketMessages.sendPhraseToHistory:
                    controller = await ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory();
                    break;
                default:
                    ws.send(new CustomMessage({
                        type: TypeSocketMessages.error,
                        content: "invalid_message_type"
                    }))
                    break;
            }
            await adaptSocketMessage(ws, data, controller!);
        });
    });
}
