"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoomConverterErrorMessages = exports.GameRoomConverterParams = exports.GameRoomConverter = void 0;
const game_room_1 = require("../../../domain/entities/game_room");
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class GameRoomConverter {
    handle(params) {
        if (params.name == undefined || params.name == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: GameRoomConverterErrorMessages.missingName }));
        }
        if (params.adminsIds == undefined || params.adminsIds.length == 0) {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: GameRoomConverterErrorMessages.missingAdmins }));
        }
        return either_ts_1.right(new game_room_1.GameRoom({
            id: params.id,
            name: params.name,
            adminsIds: params.adminsIds,
            history: params.history,
            createdAt: params.createdAt,
            playersIds: params.playersIds
        }));
    }
}
exports.GameRoomConverter = GameRoomConverter;
class GameRoomConverterParams {
    constructor({ id, name, adminsIds, playersIds, history, createdAt }) {
        this.id = id;
        this.name = name;
        this.adminsIds = adminsIds;
        this.playersIds = playersIds;
        this.history = history;
        this.createdAt = createdAt;
    }
}
exports.GameRoomConverterParams = GameRoomConverterParams;
class GameRoomConverterErrorMessages {
}
exports.GameRoomConverterErrorMessages = GameRoomConverterErrorMessages;
GameRoomConverterErrorMessages.missingName = "É necessário informar o nome da sala";
GameRoomConverterErrorMessages.missingAdmins = "É necessário informar o(s) administrador(es) da sala";
