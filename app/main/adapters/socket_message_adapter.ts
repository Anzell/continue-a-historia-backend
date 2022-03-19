import {SocketController} from "../protocols/controller";
import * as WebSocket from 'ws';
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import { GameRoom } from "../../domain/entities/game_room";

export const adaptSocketMessage = async (ws: WebSocket, wss: WebSocket.Server, data: any, controller: SocketController) => {
    const response = await controller.handle(data['content']);
    ws.send(JSON.stringify(response.content));
    if(data['type'] === TypeSocketMessages.sendPhraseToHistory){
        console.log("deve atualizar todo mundo");
        ws.emit("updateRoom", JSON.stringify(response.content as GameRoom));
    }
    
}