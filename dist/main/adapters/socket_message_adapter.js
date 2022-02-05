"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const adaptSocketMessage = async (ws, data, controller) => {
    const response = await controller.handle(data);
    ws.send(response.content);
};
exports.adaptSocketMessage = adaptSocketMessage;
