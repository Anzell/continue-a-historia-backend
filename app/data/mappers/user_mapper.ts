import {UserEntity} from "../../domain/entities/user_entity";
import {UserModel} from "../models/user_model";

export class UserMapper{
    static entityToModel(entity: UserEntity): UserModel{
        return new UserModel({
           id: entity.id,
           username: entity.username,
            email: entity.email
        });
    }

    static modelToEntity(model: UserModel): UserEntity{
        return new UserEntity({
            id: model.id,
            username: model.username,
            email: model.email
        });
    }
}