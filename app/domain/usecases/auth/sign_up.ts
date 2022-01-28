import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {Failure} from "../../../core/failures/failures";
import {AuthRepository} from "../../repositories/auth_repository";

export abstract class SignUpUsecase implements PromiseUsecase<null, SignUpUsecaseParams>{
    abstract handle: (params: SignUpUsecaseParams) => Promise<Either<Failure, null>>
}

export class SignUpUsecaseImpl implements SignUpUsecase {
    constructor (private readonly repository: AuthRepository) {
    }

    async handle (params: SignUpUsecaseParams): Promise<Either<Failure, null>> {
        return await this.repository.signUp({
            username: params.username,
            password: params.password
        });
    }

}

export class SignUpUsecaseParams{
    username: string;
    password: string;
    email: string;

    constructor ({username, password, email}: {
        username: string,
        password: string,
        email: string
    }) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}