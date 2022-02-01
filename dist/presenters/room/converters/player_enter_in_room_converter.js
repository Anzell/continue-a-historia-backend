"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomConverterErrorMessages = exports.PlayerEnterInRoomConverterParams = exports.PlayerEnterInRoomConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class PlayerEnterInRoomConverter {
    handle(params) {
        if (params.roomId === undefined || params.roomId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: PlayerEnterInRoomConverterErrorMessages.missingRoomId }));
        }
        if (params.userId === undefined || params.userId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: PlayerEnterInRoomConverterErrorMessages.missingUserId }));
        }
        return (0, either_ts_1.right)({
            userId: params.userId,
            roomId: params.roomId,
        });
    }
}
exports.PlayerEnterInRoomConverter = PlayerEnterInRoomConverter;
class PlayerEnterInRoomConverterParams {
    constructor({ userId, roomId }) {
        this.roomId = roomId;
        this.userId = userId;
    }
}
exports.PlayerEnterInRoomConverterParams = PlayerEnterInRoomConverterParams;
class PlayerEnterInRoomConverterErrorMessages {
}
exports.PlayerEnterInRoomConverterErrorMessages = PlayerEnterInRoomConverterErrorMessages;
PlayerEnterInRoomConverterErrorMessages.missingUserId = "É necessário informar um jogador";
PlayerEnterInRoomConverterErrorMessages.missingRoomId = "É necessário informar uma sala";
