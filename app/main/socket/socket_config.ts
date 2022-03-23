import * as WebSocket from 'socket.io';
import { Server } from "http";
import { adaptSocketMessage } from "../adapters/socket_message_adapter";
import { ControllersInjectorFactory } from "../../di/controllers_injector";
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import { CustomMessage } from "../protocols/custom_message";
import {Socket} from "socket.io";
import { GameRoom } from '../../domain/entities/game_room';

export default (server: Server): void => {
    const wss = new WebSocket.Server(server, {cors: {origin: "*"}});

    wss.use(async (socket, next) => {
            if(await (await ControllersInjectorFactory.authGuardSocketFactory("user")).handle(socket)){
                next();
            }
            socket.disconnect();
        });
        
        wss.on("updateRoom", () => {
            console.log("emitiu");
        })    

    wss.sockets.on('connection', (ws) => {         



         ws.on('message', async (data: any) => {
             switch (data['type']) {
                 case TypeSocketMessages.playerEnterInRoom:
                     await adaptSocketMessage(ws, wss, data, await ControllersInjectorFactory.playerEnterInRoomControllerFactory());
                     break;
                 case TypeSocketMessages.sendPhraseToHistory:
                     await adaptSocketMessage(ws, wss, data, await ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory());
                     break;
                 case TypeSocketMessages.joinRoom:
                     ws.join(data["content"]["room_id"]);
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
