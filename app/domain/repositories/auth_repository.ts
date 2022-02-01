import {Failure} from "../../core/failures/failures";
import {AuthToken} from "../entities/auth_token";

export interface AuthRepository{
    signUp({username, password, email}:{username: string, password: string, email: string}): Promise<Either<Failure, null>>
    signIn({username, password}: {username: string, password: string}): Promise<Either<Failure, AuthToken>>;
}