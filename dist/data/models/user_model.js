"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const user_entity_1 = require("../../domain/entities/user_entity");
class UserModel extends user_entity_1.UserEntity {
    toJson() {
        return {
            "username": this.username,
            "id": this.id,
            "email": this.email,
            "permission": this.permission
        };
    }
    static fromJson(json) {
        return new UserModel({
            username: json['username'],
            id: json['id'],
            email: json['email'],
            permission: json['permission']
        });
    }
}
exports.UserModel = UserModel;
