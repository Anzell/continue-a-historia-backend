import {UserEntity} from "../../domain/entities/user_entity";
import {UserModel} from "../models/user_model";
import {UserMapper} from "./user_mapper";

describe('user mapper', function () {
    const entity = new UserEntity({
       id: "validId",
       username: "anzell",
        email: "test@email.com"
    });
    const model = new UserModel({
       id: "validId",
        username: "anzell",
        email: "test@email.com"
    });

    it('entity to model', function () {
        const result = UserMapper.entityToModel(entity);
        expect(result).toBeInstanceOf(UserModel);
    });

    it('model to entity', function () {
        const result = UserMapper.modelToEntity(model);
        expect(result).toBeInstanceOf(UserEntity);
    });
});