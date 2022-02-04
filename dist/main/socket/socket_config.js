"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const socket_message_adapter_1 = require("../adapters/socket_message_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
exports.default = async (server) => {
    const ws = new WebSocket.Server({
        server: server,
        verifyClient: await (await controllers_injector_1.ControllersInjectorFactory.authGuardSocketFactory("user")).handle()
    });
    ws.on('connection', (ws) => {
        ws.on('message', (data) => (0, socket_message_adapter_1.adaptSocketMessage)(ws, data));
    });
};
