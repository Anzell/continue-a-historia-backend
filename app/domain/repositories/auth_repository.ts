import {Failure} from "../../core/failures/failures";
import {AuthToken} from "../entities/auth_token";

export interface AuthRepository{
    signUp({username, password, email}:{username: string, password: string, email: string}): Promise<Either<Failure, null>>
    signIn({email, password}: {email: string, password: string}): Promise<Either<Failure, AuthToken>>;
}