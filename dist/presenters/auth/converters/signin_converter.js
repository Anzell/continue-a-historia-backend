"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInConverterErrorMessages = exports.SignInConverterParams = exports.SignInConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class SignInConverter {
    handle(params) {
        if (params.email == undefined || params.email == "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: SignInConverterErrorMessages.missingEmail }));
        }
        if (params.password == undefined || params.password == "") {
            return (0, either_ts_1.left)(new failures_1.ValidationFailure({ message: SignInConverterErrorMessages.missingPassword }));
        }
        return (0, either_ts_1.right)({
            password: params.password,
            email: params.email
        });
    }
}
exports.SignInConverter = SignInConverter;
class SignInConverterParams {
    constructor({ email, password }) {
        this.email = email;
        this.password = password;
    }
}
exports.SignInConverterParams = SignInConverterParams;
class SignInConverterErrorMessages {
}
exports.SignInConverterErrorMessages = SignInConverterErrorMessages;
SignInConverterErrorMessages.missingEmail = "Email é necessário";
SignInConverterErrorMessages.missingPassword = "Senha é necessário";
