"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupConverterErrorMessages = exports.SignupConvertersParams = exports.SignupConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class SignupConverter {
    handle(params) {
        if (params.username == undefined || params.username == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: SignupConverterErrorMessages.missingUsername }));
        }
        if (params.email == undefined || params.email == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: SignupConverterErrorMessages.missingEmail }));
        }
        if (params.password == undefined || params.password == "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: SignupConverterErrorMessages.missingPassword }));
        }
        return either_ts_1.right({
            username: params.username.toString(),
            email: params.email.toString(),
            password: params.password.toString(),
        });
    }
}
exports.SignupConverter = SignupConverter;
class SignupConvertersParams {
    constructor({ username, email, password }) {
        this.password = password;
        this.email = email;
        this.username = username;
    }
}
exports.SignupConvertersParams = SignupConvertersParams;
class SignupConverterErrorMessages {
}
exports.SignupConverterErrorMessages = SignupConverterErrorMessages;
SignupConverterErrorMessages.missingEmail = "Um email é necessario para criar a conta";
SignupConverterErrorMessages.missingPassword = "É necessário prover uma senha para a conta";
SignupConverterErrorMessages.missingUsername = "É necessário prover um nome de usuário para jogar";
