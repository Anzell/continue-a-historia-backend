"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdConverterErrorMessages = exports.GetUserByIdConverterParams = exports.GetUserByIdConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class GetUserByIdConverter {
    handle(params) {
        if (params.id === undefined || params.id === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: GetUserByIdConverterErrorMessages.missingId }));
        }
        return (0, either_ts_1.right)({ id: params.id });
    }
}
exports.GetUserByIdConverter = GetUserByIdConverter;
class GetUserByIdConverterParams {
    constructor({ id }) {
        this.id = id;
    }
}
exports.GetUserByIdConverterParams = GetUserByIdConverterParams;
class GetUserByIdConverterErrorMessages {
}
exports.GetUserByIdConverterErrorMessages = GetUserByIdConverterErrorMessages;
GetUserByIdConverterErrorMessages.missingId = "É necessário informar o usuário";
