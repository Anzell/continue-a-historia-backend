"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeHelper = void 0;
const failures_1 = require("../failures/failures");
const server_codes_1 = require("../constants/messages/server_codes");
class CodeHelper {
    static failureToCode(failure) {
        if (failure instanceof failures_1.ServerFailure) {
            return server_codes_1.ServerCodes.serverFailure;
        }
        if (failure instanceof failures_1.ValidationFailure) {
            return server_codes_1.ServerCodes.validationError + ":" + failure.message;
        }
        if (failure instanceof failures_1.InvalidCredentialsFailure) {
            return server_codes_1.ServerCodes.invalidCredentials;
        }
        if (failure instanceof failures_1.NotFoundFailure) {
            return server_codes_1.ServerCodes.serverFailure;
        }
        if (failure instanceof failures_1.UsernameAlreadyExistFailure) {
            return server_codes_1.ServerCodes.usernameAlreadyRegistered;
        }
        if (failure instanceof failures_1.EmailAlreadyExistFailure) {
            return server_codes_1.ServerCodes.emailAlreadyRegistered;
        }
        return server_codes_1.ServerCodes.unknownError;
    }
}
exports.CodeHelper = CodeHelper;
