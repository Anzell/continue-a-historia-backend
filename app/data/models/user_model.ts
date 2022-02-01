import {UserEntity} from "../../domain/entities/user_entity";

export class UserModel extends UserEntity{
    toJson(): any {
        return {
            "username": this.username,
            "id": this.id,
            "email": this.email,
            "permission": this.permission
        };
    }

    static fromJson(json: any): UserModel {
        return new UserModel({
            username: json['username'],
            id: json['id'],
            email: json['email'],
            permission: json['permission']
        });
    }
}