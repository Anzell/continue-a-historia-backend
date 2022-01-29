"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailure = exports.UsernameAlreadyExistFailure = exports.ServerFailure = void 0;
class ServerFailure {
}
exports.ServerFailure = ServerFailure;
class UsernameAlreadyExistFailure {
}
exports.UsernameAlreadyExistFailure = UsernameAlreadyExistFailure;
class ValidationFailure {
    constructor({ message }) {
        this.message = message;
    }
}
exports.ValidationFailure = ValidationFailure;
