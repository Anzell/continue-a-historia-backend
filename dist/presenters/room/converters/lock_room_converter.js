"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockRoomConverterErrorMessages = exports.LockRoomConverterParams = exports.LockRoomConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class LockRoomConverter {
    handle(params) {
        if (params.userId === undefined || params.userId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: LockRoomConverterErrorMessages.missingUserId }));
        }
        if (params.roomId === undefined || params.roomId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: LockRoomConverterErrorMessages.missingRoomId }));
        }
        return (0, either_ts_1.right)({ userId: params.userId, roomId: params.roomId });
    }
}
exports.LockRoomConverter = LockRoomConverter;
class LockRoomConverterParams {
    constructor({ userId, roomId }) {
        this.userId = userId;
        this.roomId = roomId;
    }
}
exports.LockRoomConverterParams = LockRoomConverterParams;
class LockRoomConverterErrorMessages {
}
exports.LockRoomConverterErrorMessages = LockRoomConverterErrorMessages;
LockRoomConverterErrorMessages.missingUserId = "É necessário informar o usuário";
LockRoomConverterErrorMessages.missingRoomId = "É necessário informar a sala";
