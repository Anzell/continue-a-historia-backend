import {UserEntity} from "../../../domain/entities/user_entity";
import {Db} from "mongodb";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {NotFoundException, PlayerNotFoundException} from "../../../core/failures/exceptions";
import {UserMapper} from "../../mappers/user_mapper";
import {UserModel} from "../../models/user_model";

export interface UserRemoteDs {
    getUserById: ({id}: {id: string}) => Promise<UserEntity>;
    getUserByUsername: ({username}: {username: string}) => Promise<UserEntity>;
    getUserPermissions: ({id}: {id: string}) => Promise<string>;
}

export class UserRemoteDsImpl implements UserRemoteDs {

    async getUserPermissions ({id}: { id: string }): Promise<string> {
        const document = await this.db.collection(DbCollections.users).findOne({id});
        if (document == undefined) {
            throw new NotFoundException();
        }
        return document['permission'];
    }

    constructor (private readonly db: Db) {}
    async getUserByUsername({ username }: { username: string; }): Promise<UserEntity>{
        const document = await this.db.collection(DbCollections.users).findOne({username});
        if(document == undefined){
            throw new PlayerNotFoundException();
        }
        return UserMapper.modelToEntity(UserModel.fromJson(document));
    }

    async getUserById ({id}: { id: string }): Promise<UserEntity> {
        const document = await this.db.collection(DbCollections.users).findOne({id});
        if(document == undefined){
            throw new PlayerNotFoundException();
        }
        return UserMapper.modelToEntity(UserModel.fromJson(document));
    }
}