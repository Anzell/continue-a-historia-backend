"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const type_messages_1 = require("../../core/constants/socket/type_messages");
const controllers_injector_1 = require("../../di/controllers_injector");
const custom_response_1 = require("../protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const error_messages_1 = require("../../core/constants/messages/error_messages");
const adaptSocketMessage = async (ws, wss, data) => {
    switch (data['type']) {
        case type_messages_1.TypeSocketMessages.playerEnterInRoom:
            await handlePlayerEnterInRoom(ws, wss, data["content"]);
            break;
        case type_messages_1.TypeSocketMessages.sendPhraseToHistory:
            await handleSendPhraseToHistory(ws, wss, data["content"]);
            break;
        case type_messages_1.TypeSocketMessages.joinRoom:
            await handleJoinRoom(ws, wss, data["content"]);
            break;
        case type_messages_1.TypeSocketMessages.lockRoom:
            await handleLockRoom(ws, wss, data["content"]);
            break;
        default:
            ws.emit(type_messages_1.TypeSocketMessages.serverFailure, (data) => JSON.stringify(new custom_response_1.CustomResponse({
                codeStatus: 400,
                code: server_codes_1.ServerCodes.serverFailure,
                message: error_messages_1.ErrorMessages.serverFailure,
                result: {}
            })));
            break;
    }
};
exports.adaptSocketMessage = adaptSocketMessage;
const handlePlayerEnterInRoom = async (ws, wss, data) => {
    const controller = await controllers_injector_1.ControllersInjectorFactory.playerEnterInRoomControllerFactory();
    const response = await controller.handle(data);
    if (response.codeStatus !== 400) {
        ws.send(JSON.stringify(response.result));
    }
    else {
        ws.emit(type_messages_1.TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
};
const handleSendPhraseToHistory = async (ws, wss, data) => {
    const controller = await controllers_injector_1.ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory();
    const response = await controller.handle(data);
    if (response.codeStatus !== 400) {
        wss.sockets.in(response.result.id).emit("updateRoom", JSON.stringify(response.result));
    }
    else {
        ws.emit(type_messages_1.TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
};
const handleJoinRoom = async (ws, wss, data) => {
    const controller = await controllers_injector_1.ControllersInjectorFactory.getRoomByIdControllerFactory();
    const response = await controller.handle(data);
    if (response.codeStatus !== 400) {
        ws.join(data["room_id"]);
        wss.sockets.in(response.result.id).emit("updateRoom", JSON.stringify(response.result));
    }
    else {
        ws.emit(type_messages_1.TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
};
const handleLockRoom = async (ws, wss, data) => {
    const lockRoomController = await controllers_injector_1.ControllersInjectorFactory.lockRoomControllerFactory();
    const getRoomByIdController = await controllers_injector_1.ControllersInjectorFactory.getRoomByIdControllerFactory();
    data["lock"] = true;
    const response = await lockRoomController.handle(data);
    const roomResponse = await getRoomByIdController.handle({
        "room_id": data["roomId"]
    });
    if (response.codeStatus !== 400 && roomResponse.codeStatus !== 400) {
        wss.sockets.in(roomResponse.result.id).emit("updateRoom", JSON.stringify(roomResponse.result));
        new Promise((resolve) => {
            setTimeout(async (_) => {
                data["lock"] = false;
                await lockRoomController.handle(data);
                const roomResponse = await getRoomByIdController.handle({
                    "room_id": data["roomId"]
                });
                wss.sockets.in(roomResponse.result.id).emit("updateRoom", JSON.stringify(roomResponse.result));
                resolve(true);
            }, 10000);
        });
    }
    else {
        ws.emit(type_messages_1.TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
};
