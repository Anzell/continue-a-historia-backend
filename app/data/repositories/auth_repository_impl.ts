import {AuthRepository} from "../../domain/repositories/auth_repository";
import {
    EmailAlreadyExistFailure,
    Failure,
    InvalidCredentialsFailure,
    ServerFailure,
    UsernameAlreadyExistFailure
} from "../../core/failures/failures";
import {AuthRemoteDs} from "../datasources/remote/auth_remote_ds";
import {
    EmailAlreadyExistException,
    InvalidCredentialsException,
    UsernameAlreadyExistException
} from "../../core/failures/exceptions";
import {left, right} from "either-ts";
import {AuthToken} from "../../domain/entities/auth_token";

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
            if(e instanceof EmailAlreadyExistException){
                return left(new EmailAlreadyExistFailure());
            }
            return left(new ServerFailure());
        }
    }


    async signIn ({username, password}: { username: string; password: string }): Promise<Either<Failure, AuthToken>> {
        try{
            const result = await this.datasource.signIn({username, password});
            return right(result);
        }catch(e){
            if(e instanceof InvalidCredentialsException){
                return left(new InvalidCredentialsFailure());
            }
            return left(new ServerFailure());
        }
    }

}