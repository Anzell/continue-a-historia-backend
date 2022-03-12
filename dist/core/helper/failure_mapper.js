"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailureHelper = void 0;
const failures_1 = require("../failures/failures");
const error_messages_1 = require("../constants/messages/error_messages");
class FailureHelper {
    static mapFailureToMessage(failure) {
        if (failure instanceof failures_1.ServerFailure) {
            return error_messages_1.ErrorMessages.serverFailure;
        }
        if (failure instanceof failures_1.ValidationFailure) {
            return failure.message;
        }
        if (failure instanceof failures_1.InvalidCredentialsFailure) {
            return error_messages_1.ErrorMessages.invalidCredentials;
        }
        if (failure instanceof failures_1.NotFoundFailure) {
            return error_messages_1.ErrorMessages.notFound;
        }
        if (failure instanceof failures_1.UsernameAlreadyExistFailure) {
            return error_messages_1.ErrorMessages.usernameAlreadyexists;
        }
        return error_messages_1.ErrorMessages.unknownFailure;
    }
}
exports.FailureHelper = FailureHelper;
