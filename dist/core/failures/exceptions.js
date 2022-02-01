"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = exports.AccessDeniedException = exports.InvalidCredentialsException = exports.UsernameAlreadyExistException = exports.ServerException = void 0;
class ServerException extends Error {
}
exports.ServerException = ServerException;
class UsernameAlreadyExistException extends Error {
}
exports.UsernameAlreadyExistException = UsernameAlreadyExistException;
class InvalidCredentialsException extends Error {
}
exports.InvalidCredentialsException = InvalidCredentialsException;
class AccessDeniedException extends Error {
}
exports.AccessDeniedException = AccessDeniedException;
class NotFoundException extends Error {
}
exports.NotFoundException = NotFoundException;
