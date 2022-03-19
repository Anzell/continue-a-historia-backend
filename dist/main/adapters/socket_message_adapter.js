"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const type_messages_1 = require("../../core/constants/socket/type_messages");
const adaptSocketMessage = async (ws, wss, data, controller) => {
    const response = await controller.handle(data['content']);
    ws.send(JSON.stringify(response.content));
    if (data['type'] === type_messages_1.TypeSocketMessages.sendPhraseToHistory) {
        console.log("deve atualizar todo mundo");
        ws.emit("updateRoom", JSON.stringify(response.content));
    }
};
exports.adaptSocketMessage = adaptSocketMessage;
