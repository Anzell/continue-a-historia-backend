import {UserEntity} from "../entities/user_entity";
import {Failure} from "../../core/failures/failures";

export interface UserRepository {
    getUserById: ({id}: {id: string}) => Promise<Either<Failure, UserEntity>>;
    getUserByUsername: ({username}: {username: string}) => Promise<Either<Failure, UserEntity>>;
    getUserPermissions: ({id}: {id: string}) => Promise<Either<Failure, string>>;
}