import * as WebSocket from 'socket.io';
import { TypeSocketMessages } from "../../core/constants/socket/type_messages";
import {Socket} from "socket.io";
import {ControllersInjectorFactory} from "../../di/controllers_injector";
import {CustomResponse} from "../protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

export const adaptSocketMessage = async (ws: Socket, wss: WebSocket.Server, data: any) => {
    switch (data['type']) {
        case TypeSocketMessages.playerEnterInRoom:
            await handlePlayerEnterInRoom(ws, wss, data["content"]);
            break;
        case TypeSocketMessages.sendPhraseToHistory:
            await handleSendPhraseToHistory(ws, wss, data["content"]);
            break;
        case TypeSocketMessages.joinRoom:
            await handleJoinRoom(ws, wss, data["content"]);
            break;
        case TypeSocketMessages.lockRoom:
            await handleLockRoom(ws, wss, data["content"]);
            break;
        default:
            ws.emit(TypeSocketMessages.serverFailure, (data: any) => JSON.stringify(new CustomResponse({
                codeStatus: 400,
                code: ServerCodes.serverFailure,
                message: ErrorMessages.serverFailure,
                result: {}
            })));
            break;
    }
    
}

const handlePlayerEnterInRoom = async (ws: Socket, wss: WebSocket.Server, data: any): Promise<void> => {
    const controller = await ControllersInjectorFactory.playerEnterInRoomControllerFactory();
    const response = await controller.handle(data);
    if(response.codeStatus !== 400){
        ws.send(JSON.stringify(response.result));
    }else {
        ws.emit(TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
}

const handleSendPhraseToHistory = async (ws: Socket, wss: WebSocket.Server, data:any): Promise<void> => {
    const controller = await ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory();
    const response = await controller.handle(data);
    if(response.codeStatus !== 400){
        wss.sockets.in(response.result.id!).emit("updateRoom", JSON.stringify(response.result));
    }else {
        ws.emit(TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
}

const handleJoinRoom = async (ws: Socket, wss: WebSocket.Server, data: any): Promise<void> => {
    const controller = await ControllersInjectorFactory.getRoomByIdControllerFactory();
    const response = await controller.handle(data);
    if(response.codeStatus !== 400){
        ws.join(data["room_id"]);
        wss.sockets.in(response.result.id!).emit("updateRoom", JSON.stringify(response.result));
    }else {
        ws.emit(TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
}

const handleLockRoom = async (ws: Socket, wss: WebSocket.Server, data: any): Promise<void> => {
    const lockRoomController = await ControllersInjectorFactory.lockRoomControllerFactory();
    const getRoomByIdController = await ControllersInjectorFactory.getRoomByIdControllerFactory();
    data["lock"] = true;
    const response = await lockRoomController.handle(data);
    const roomResponse = await getRoomByIdController.handle({
        "room_id": data["roomId"]
    });
    if(response.codeStatus !== 400 && roomResponse.codeStatus !== 400){
        wss.sockets.in(roomResponse.result.id!).emit("updateRoom", JSON.stringify(roomResponse.result));
        new Promise((resolve) => {
           setTimeout(async (_) => {
               data["lock"] = false;
               await lockRoomController.handle(data);
               const roomResponse = await getRoomByIdController.handle({
                   "room_id": data["roomId"]
               });
               wss.sockets.in(roomResponse.result.id!).emit("updateRoom", JSON.stringify(roomResponse.result));
               resolve(true);
           }, 10000) ;
        });
    }else {
        ws.emit(TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
}

