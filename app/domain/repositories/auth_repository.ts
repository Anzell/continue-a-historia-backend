import {Failure} from "../../core/failures/failures";

export interface AuthRepository{
    signUp({username, password}:{username: string, password: string}): Promise<Either<Failure, null>>
}