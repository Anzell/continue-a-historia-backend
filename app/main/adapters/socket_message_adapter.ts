import {SocketController} from "../protocols/controller";
import * as WebSocket from 'socket.io';
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import { GameRoom } from "../../domain/entities/game_room";
import {Socket} from "socket.io";

export const adaptSocketMessage = async (ws: Socket, wss: WebSocket.Server, data: any, controller: SocketController) => {
    const response = await controller.handle(data['content']);
    if(data['type'] === TypeSocketMessages.sendPhraseToHistory){
        const room = (response.content) as GameRoom;
        wss.sockets.in(room.id!).emit("updateRoom", JSON.stringify(room));
    }else{
        ws.send(JSON.stringify(response.content));
    }
    
}