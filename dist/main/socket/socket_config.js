"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const socket_message_adapter_1 = require("../adapters/socket_message_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
const type_messages_1 = require("../../core/constants/socket/type_messages");
const custom_message_1 = require("../protocols/custom_message");
const player_enter_in_room_controller_1 = require("../../presenters/room/player_enter_in_room_controller");
const usecases_injector_1 = require("../../di/usecases_injector");
const converters_injector_1 = require("../../di/converters_injector");
exports.default = async (server) => {
    const ws = new WebSocket.Server({
        server: server,
        verifyClient: await (await controllers_injector_1.ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });
    ws.on('connection', (ws) => {
        ws.on('message', async (data) => {
            let controller;
            switch (data['type']) {
                case type_messages_1.TypeSocketMessages.playerEnterInRoom:
                    controller = new player_enter_in_room_controller_1.PlayerEnterInRoomController(await usecases_injector_1.UsecasesInjector.insertUserInRoomUsecase(), await converters_injector_1.ConvertersInjector.playerEnterInRoomConverterFactory());
                    break;
                default:
                    ws.send(new custom_message_1.CustomMessage({
                        type: type_messages_1.TypeSocketMessages.error,
                        content: "invalid_message_type"
                    }));
                    break;
            }
            await (0, socket_message_adapter_1.adaptSocketMessage)(ws, data, controller);
        });
    });
};
