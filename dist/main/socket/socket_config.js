"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("socket.io");
const socket_message_adapter_1 = require("../adapters/socket_message_adapter");
const controllers_injector_1 = require("../../di/controllers_injector");
exports.default = (server) => {
    const wss = new WebSocket.Server(server, { cors: { origin: "*" } });
    wss.use(async (socket, next) => {
        if (await (await controllers_injector_1.ControllersInjectorFactory.authGuardSocketFactory("user")).handle(socket)) {
            next();
        }
        socket.disconnect();
    });
    wss.sockets.on('connection', (ws) => {
        ws.on('message', async (data) => {
            await (0, socket_message_adapter_1.adaptSocketMessage)(ws, wss, data);
        });
    });
};
