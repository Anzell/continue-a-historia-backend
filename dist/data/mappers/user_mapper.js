"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const user_entity_1 = require("../../domain/entities/user_entity");
const user_model_1 = require("../models/user_model");
class UserMapper {
    static entityToModel(entity) {
        return new user_model_1.UserModel({
            id: entity.id,
            username: entity.username,
            email: entity.email
        });
    }
    static modelToEntity(model) {
        return new user_entity_1.UserEntity({
            id: model.id,
            username: model.username,
            email: model.email
        });
    }
}
exports.UserMapper = UserMapper;
