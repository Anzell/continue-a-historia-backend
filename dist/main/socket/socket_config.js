"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("socket.io");
const socket_message_adapter_1 = require("../adapters/socket_message_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
const type_messages_1 = require("../../core/constants/socket/type_messages");
const custom_response_1 = require("../protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const error_messages_1 = require("../../core/constants/messages/error_messages");
exports.default = (server) => {
    const wss = new WebSocket.Server(server, { cors: { origin: "*" } });
    wss.use(async (socket, next) => {
        console.log("nova requisicao");
        if (await (await controllers_injector_1.ControllersInjectorFactory.authGuardSocketFactory("user")).handle(socket)) {
            next();
        }
        socket.disconnect();
    });
    wss.sockets.on('connection', (ws) => {
        ws.on('message', async (data) => {
            switch (data['type']) {
                case type_messages_1.TypeSocketMessages.playerEnterInRoom:
                    await (0, socket_message_adapter_1.adaptSocketMessage)(ws, wss, data, await controllers_injector_1.ControllersInjectorFactory.playerEnterInRoomControllerFactory());
                    break;
                case type_messages_1.TypeSocketMessages.sendPhraseToHistory:
                    await (0, socket_message_adapter_1.adaptSocketMessage)(ws, wss, data, await controllers_injector_1.ControllersInjectorFactory.playerSendPhraseToHistoryControllerFactory());
                    break;
                case type_messages_1.TypeSocketMessages.joinRoom:
                    ws.join(data["content"]["room_id"]);
                    await (0, socket_message_adapter_1.adaptSocketMessage)(ws, wss, data, await controllers_injector_1.ControllersInjectorFactory.getRoomByIdControllerFactory());
                    break;
                default:
                    ws.send(JSON.stringify(new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        code: server_codes_1.ServerCodes.serverFailure,
                        message: error_messages_1.ErrorMessages.serverFailure,
                        result: {}
                    })));
                    break;
            }
        });
    });
};
