"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationFailure = exports.PlayerDontExistsInRoomFailure = exports.NotFoundFailure = exports.InvalidCredentialsFailure = exports.EmailAlreadyExistFailure = exports.UsernameAlreadyExistFailure = exports.ServerFailure = void 0;
class ServerFailure {
}
exports.ServerFailure = ServerFailure;
class UsernameAlreadyExistFailure {
}
exports.UsernameAlreadyExistFailure = UsernameAlreadyExistFailure;
class EmailAlreadyExistFailure {
}
exports.EmailAlreadyExistFailure = EmailAlreadyExistFailure;
class InvalidCredentialsFailure {
}
exports.InvalidCredentialsFailure = InvalidCredentialsFailure;
class NotFoundFailure {
}
exports.NotFoundFailure = NotFoundFailure;
class PlayerDontExistsInRoomFailure {
}
exports.PlayerDontExistsInRoomFailure = PlayerDontExistsInRoomFailure;
class ValidationFailure {
    constructor({ message }) {
        this.message = message;
    }
}
exports.ValidationFailure = ValidationFailure;
