"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const adaptSocketMessage = async (ws, wss, data, controller) => {
    const response = await controller.handle(data);
    wss.clients.forEach((client) => {
        client.send(JSON.stringify(response.content));
    });
};
exports.adaptSocketMessage = adaptSocketMessage;
