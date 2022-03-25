import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {AuthRepository} from "../../repositories/auth_repository";
import {Failure} from "../../../core/failures/failures";
import {AuthToken} from "../../entities/auth_token";

export abstract class SignInUsecase implements PromiseUsecase<AuthToken, SignInUseCaseParams>{
    abstract handle: (params: SignInUseCaseParams) => Promise<Either<Failure, AuthToken>>
}


export class SignInUseCaseImpl implements SignInUsecase{
    constructor (private readonly repository: AuthRepository) {}

    async handle (params: SignInUseCaseParams): Promise<Either<Failure, AuthToken>> {
        return await this.repository.signIn({
            email: params.email,
            password: params.password,
        });
    }

}

export class SignInUseCaseParams {
    email: string;
    password: string;

    constructor ({email, password}: {
        email: string,
        password: string
    }) {
        this.email = email;
        this.password = password;
    }
}