import { Failure } from "../../../core/failures/failures";
import { PromiseUsecase } from "../../../core/usecases/promise_usecase";
import { UserEntity } from "../../entities/user_entity";
import { UserRepository } from "../../repositories/user_repository";
import { GetUserByIdUsecaseParams } from "./get_user_by_id";

export class GetUserByUsernameUsecase implements PromiseUsecase<UserEntity, GetUserByUsernameUsecaseParams> {
    constructor (private readonly repository: UserRepository) {}

    async handle (params: GetUserByUsernameUsecaseParams): Promise<Either<Failure, UserEntity>> {
        return await this.repository.getUserByUsername({username: params.username});
    }

}

export class GetUserByUsernameUsecaseParams {
    readonly username: string;

    constructor ({username}: {username: string}) {
        this.username = username;
    }
}