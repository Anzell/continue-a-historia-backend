"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailure = exports.ServerFailure = void 0;
class ServerFailure {
}
exports.ServerFailure = ServerFailure;
class ValidationFailure {
    constructor({ message }) {
        this.message = message;
    }
}
exports.ValidationFailure = ValidationFailure;
