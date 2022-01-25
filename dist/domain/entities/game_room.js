"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoom = void 0;
class GameRoom {
    constructor({ id, name, adminsIds, playersIds, history, createdAt }) {
        this.id = id;
        this.name = name;
        this.adminsIds = adminsIds;
        this.playersIds = playersIds;
        this.history = history;
        this.createdAt = createdAt;
    }
}
exports.GameRoom = GameRoom;
