import {UserRepository} from "../../domain/repositories/user_repository";
import {UserEntity} from "../../domain/entities/user_entity";
import {Failure, NotFoundFailure, ServerFailure} from "../../core/failures/failures";
import {UserRemoteDs} from "../datasources/remote/user_remote_ds";
import {left, right} from "either-ts";
import {NotFoundException} from "../../core/failures/exceptions";

export class UserRepositoryImpl implements UserRepository {

    constructor (private readonly datasource: UserRemoteDs) {}
    async getUserByUsername({ username }: { username: string; }): Promise<Either<Failure, UserEntity>>{
        try{
            const result = await this.datasource.getUserByUsername({username});
            return right(result);
        }catch(e){
            if(e instanceof NotFoundException){
                return left(new NotFoundFailure());
            }
            return left(new ServerFailure());
        }
    }

    async getUserById ({id}: { id: string }): Promise<Either<Failure, UserEntity>> {
        try{
          const result = await this.datasource.getUserById({id});
          return right(result);
        }catch (e){
            if(e instanceof NotFoundException){
                return left(new NotFoundFailure());
            }
            return left(new ServerFailure());
        }
    }

    async getUserPermissions ({id}: { id: string }): Promise<Either<Failure, string>> {
        try {
            const result = await this.datasource.getUserPermissions({id});
            return right(result);
        } catch (e) {
            if (e instanceof NotFoundException) {
                return left(new NotFoundFailure());
            }
            return left(new ServerFailure());
        }
    }
}