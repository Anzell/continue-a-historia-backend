import * as WebSocket from 'socket.io';
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import { GameRoom } from "../../domain/entities/game_room";
import {Socket} from "socket.io";
import {Controller} from "../protocols/controller";

export const adaptSocketMessage = async (ws: Socket, wss: WebSocket.Server, data: any, controller: Controller) => {
    const response = await controller.handle(data['content']);
    if(data['type'] === TypeSocketMessages.sendPhraseToHistory || data["type"] === TypeSocketMessages.joinRoom){
        const room = (response.result) as GameRoom;
        console.log("emissao");
        wss.sockets.in(room.id!).emit("updateRoom", JSON.stringify(room));
    }else{
        ws.send(JSON.stringify(response.result));
    }
    
}