import {AuthRepository} from "../../domain/repositories/auth_repository";
import {Failure, ServerFailure, UsernameAlreadyExistFailure} from "../../core/failures/failures";
import {AuthRemoteDs} from "../datasources/remote/auth_remote_ds";
import {UsernameAlreadyExistException} from "../../core/failures/exceptions";
import {left, right} from "either-ts";

export class AuthRepositoryImpl implements  AuthRepository {
    constructor (private readonly datasource: AuthRemoteDs) {}

    async signUp ({username, password, email}: { username: string; password: string, email: string }): Promise<Either<Failure, null>> {
        try{
            await this.datasource.signUp({username, password, email});
            return right(null);
        } catch(e){
            if(e instanceof UsernameAlreadyExistException){
                return left(new UsernameAlreadyExistFailure());
            }
            return left(new ServerFailure());
        }
    }

}