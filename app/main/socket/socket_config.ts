import * as WebSocket from 'ws';
import {Server} from "http";
import {adaptSocketMessage} from "../adapters/socket_message_adapter";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import {SocketController} from "../protocols/controller";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {CustomMessage} from "../protocols/custom_message";
import {GameRoom} from "../../domain/entities/game_room";

export default async (server: Server): Promise<void> => {
    const wss = new WebSocket.Server({
        server: server,
        verifyClient: await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });


    wss.on('connection', (ws: WebSocket) => {

        function sendUpdateRoomToUsers(room: GameRoom) {
            wss.clients.forEach((client) => {
                if(client.readyState === WebSocket.OPEN){

                }
            });
        }

        ws.on('message', async (data: Buffer) => {
            let controller: SocketController;
            const jsonData = JSON.parse(data.toString());
            switch (jsonData['type']) {
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
                    }));
                    break;
            }
            await adaptSocketMessage(ws, wss, jsonData.content, controller!);
        });
    });
}
