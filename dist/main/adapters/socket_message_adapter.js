"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptSocketMessage = void 0;
const type_messages_1 = require("../../core/constants/socket/type_messages");
const adaptSocketMessage = async (ws, wss, data, controller) => {
    const response = await controller.handle(data['content']);
    if (response.codeStatus === 400) {
        ws.emit(type_messages_1.TypeSocketMessages.serverFailure, JSON.stringify(response));
    }
    else if (data['type'] === type_messages_1.TypeSocketMessages.sendPhraseToHistory || data["type"] === type_messages_1.TypeSocketMessages.joinRoom) {
        const room = (response.result);
        wss.sockets.in(room.id).emit("updateRoom", JSON.stringify(room));
    }
    else {
        ws.send(JSON.stringify(response.result));
    }
};
exports.adaptSocketMessage = adaptSocketMessage;
