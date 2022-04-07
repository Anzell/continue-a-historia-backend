"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomByIdConverterErrorMessages = exports.GetRoomByIdConverterParams = exports.GetRoomByIdConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class GetRoomByIdConverter {
    handle(params) {
        if (params.roomId === undefined || params.roomId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: GetRoomByIdConverterErrorMessages.missingId }));
        }
        return (0, either_ts_1.right)({ roomId: params.roomId });
    }
}
exports.GetRoomByIdConverter = GetRoomByIdConverter;
class GetRoomByIdConverterParams {
    constructor({ roomId }) {
        this.roomId = roomId;
    }
}
exports.GetRoomByIdConverterParams = GetRoomByIdConverterParams;
class GetRoomByIdConverterErrorMessages {
}
exports.GetRoomByIdConverterErrorMessages = GetRoomByIdConverterErrorMessages;
GetRoomByIdConverterErrorMessages.missingId = "É necessário informar a sala";
