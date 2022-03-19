"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const socket_message_adapter_1 = require("../adapters/socket_message_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
const type_messages_1 = require("../../core/constants/socket/type_messages");
const custom_message_1 = require("../protocols/custom_message");
exports.default = async (server) => {
    const wss = new WebSocket.Server({
        server: server,
        verifyClient: await (await controllers_injector_1.ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });
    wss.on('connection', (ws) => {
        var joinedRoom = "";
        ws.on("updateRoom", (bufferedRoom) => {
            const formattedRoom = JSON.parse(bufferedRoom.toString());
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN && formattedRoom.id === joinedRoom) {
                    client.send(JSON.stringify(formattedRoom));
                }
            });
        });
        ws.on('message', async (data) => {
            const jsonData = JSON.parse(data.toString());
            switch (jsonData['type']) {
                case type_messages_1.TypeSocketMessages.playerEnterInRoom:
                    await socket_message_adapter_1.adaptSocketMessage(ws, wss, jsonData, await controllers_injector_1.ControllersInjectorFactory.playerEnterInRoomControllerFactory());
                    break;
                case type_messages_1.TypeSocketMessages.sendPhraseToHistory:
                    await socket_message_adapter_1.adaptSocketMessage(ws, wss, jsonData, await controllers_injector_1.ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory());
                    break;
                case type_messages_1.TypeSocketMessages.joinRoom:
                    joinedRoom = jsonData["room_id"];
                    break;
                default:
                    ws.send(JSON.stringify(new custom_message_1.CustomMessage({
                        type: type_messages_1.TypeSocketMessages.error,
                        content: "invalid_message_type"
                    })));
                    break;
            }
        });
    });
};
