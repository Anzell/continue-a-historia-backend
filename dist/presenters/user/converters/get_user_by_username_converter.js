"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByUsernameConverterErrorMessages = exports.GetUserByUsernameConverterParams = exports.GetUserByUsernameConverter = void 0;
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
class GetUserByUsernameConverter {
    handle(params) {
        if (params.username === undefined || params.username === "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: GetUserByUsernameConverterErrorMessages.missingUsername }));
        }
        return (0, either_ts_1.right)({ username: params.username });
    }
}
exports.GetUserByUsernameConverter = GetUserByUsernameConverter;
class GetUserByUsernameConverterParams {
    constructor({ username }) {
        this.username = username;
    }
}
exports.GetUserByUsernameConverterParams = GetUserByUsernameConverterParams;
class GetUserByUsernameConverterErrorMessages {
}
exports.GetUserByUsernameConverterErrorMessages = GetUserByUsernameConverterErrorMessages;
GetUserByUsernameConverterErrorMessages.missingUsername = "É necessário informar o usuário";
