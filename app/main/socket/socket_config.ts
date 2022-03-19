import * as WebSocket from 'ws';
import { Server } from "http";
import { adaptSocketMessage } from "../adapters/socket_message_adapter";
import { ControllersInjectorFactory } from "../../di/controllers_injector";
import { SocketController } from "../protocols/controller";
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import { CustomMessage } from "../protocols/custom_message";
import { GameRoom } from "../../domain/entities/game_room";

export default async (server: Server): Promise<void> => {
    const wss = new WebSocket.Server({
        server: server,
        verifyClient: await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });

    
    wss.on('connection', (ws: WebSocket) => {
        var joinedRoom: string = "";

        ws.on("updateRoom", (bufferedRoom: Buffer) => {
            const formattedRoom = JSON.parse(bufferedRoom.toString());
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && formattedRoom.id === joinedRoom) {
                    client.send(JSON.stringify(formattedRoom));
                }
            });
        });
    

        ws.on('message', async (data: Buffer) => {
            const jsonData = JSON.parse(data.toString());
            switch (jsonData['type']) {
                case TypeSocketMessages.playerEnterInRoom:
                    await adaptSocketMessage(ws, wss, jsonData, await ControllersInjectorFactory.playerEnterInRoomControllerFactory());
                    break;
                case TypeSocketMessages.sendPhraseToHistory:
                    await adaptSocketMessage(ws, wss, jsonData, await ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory());
                    break;
                case TypeSocketMessages.joinRoom:
                    joinedRoom = jsonData["room_id"];
                    break;
                default:
                    ws.send(JSON.stringify(new CustomMessage({
                        type: TypeSocketMessages.error,
                        content: "invalid_message_type"
                    })));
                    break;
            }

        });
    });
}
