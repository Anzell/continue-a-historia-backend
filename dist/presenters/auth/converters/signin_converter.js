"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInConverterErrorMessages = exports.SignInConverterParams = exports.SignInConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class SignInConverter {
    handle(params) {
        if (params.username == undefined || params.username == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: SignInConverterErrorMessages.missingUsername }));
        }
        if (params.password == undefined || params.password == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: SignInConverterErrorMessages.missingPassword }));
        }
        return either_ts_1.right({
            password: params.password,
            username: params.username
        });
    }
}
exports.SignInConverter = SignInConverter;
class SignInConverterParams {
    constructor({ username, password }) {
        this.username = username;
        this.password = password;
    }
}
exports.SignInConverterParams = SignInConverterParams;
class SignInConverterErrorMessages {
}
exports.SignInConverterErrorMessages = SignInConverterErrorMessages;
SignInConverterErrorMessages.missingUsername = "Username é necessário";
SignInConverterErrorMessages.missingPassword = "Senha é necessário";
