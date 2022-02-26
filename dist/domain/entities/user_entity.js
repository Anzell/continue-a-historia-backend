"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
class UserEntity {
    constructor({ username, id, email, permission }) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.permission = permission;
    }
}
exports.UserEntity = UserEntity;
