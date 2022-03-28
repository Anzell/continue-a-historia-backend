"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerRoomsConverterErrorMessages = exports.GetPlayerRoomsConverterParams = exports.GetPlayerRoomsConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class GetPlayerRoomsConverter {
    handle(params) {
        if (params.userId === undefined || params.userId === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: GetPlayerRoomsConverterErrorMessages.missingId }));
        }
        return (0, either_ts_1.right)({ userId: params.userId });
    }
}
exports.GetPlayerRoomsConverter = GetPlayerRoomsConverter;
class GetPlayerRoomsConverterParams {
    constructor({ userId }) {
        this.userId = userId;
    }
}
exports.GetPlayerRoomsConverterParams = GetPlayerRoomsConverterParams;
class GetPlayerRoomsConverterErrorMessages {
}
exports.GetPlayerRoomsConverterErrorMessages = GetPlayerRoomsConverterErrorMessages;
GetPlayerRoomsConverterErrorMessages.missingId = "É necessário informar o usuário";
