"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../domain/entities/user_entity");
const user_model_1 = require("../models/user_model");
const user_mapper_1 = require("./user_mapper");
describe('user mapper', function () {
    const entity = new user_entity_1.UserEntity({
        id: "validId",
        username: "anzell",
        email: "test@email.com"
    });
    const model = new user_model_1.UserModel({
        id: "validId",
        username: "anzell",
        email: "test@email.com"
    });
    it('entity to model', function () {
        const result = user_mapper_1.UserMapper.entityToModel(entity);
        expect(result).toBeInstanceOf(user_model_1.UserModel);
    });
    it('model to entity', function () {
        const result = user_mapper_1.UserMapper.modelToEntity(model);
        expect(result).toBeInstanceOf(user_entity_1.UserEntity);
    });
});
