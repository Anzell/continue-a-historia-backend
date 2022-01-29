"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameAlreadyExistException = exports.ServerException = void 0;
class ServerException extends Error {
}
exports.ServerException = ServerException;
class UsernameAlreadyExistException extends Error {
}
exports.UsernameAlreadyExistException = UsernameAlreadyExistException;
