"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const type_messages_1 = require("../../core/constants/socket/type_messages");
const adaptSocketMessage = async (ws, wss, data, controller) => {
    const response = await controller.handle(data['content']);
    if (data['type'] === type_messages_1.TypeSocketMessages.sendPhraseToHistory) {
        const room = (response.content);
        wss.sockets.in(room.id).emit("updateRoom", JSON.stringify(room));
    }
    else {
        ws.send(JSON.stringify(response.content));
    }
};
exports.adaptSocketMessage = adaptSocketMessage;
