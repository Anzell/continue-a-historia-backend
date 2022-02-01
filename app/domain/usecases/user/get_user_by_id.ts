import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {UserEntity} from "../../entities/user_entity";
import {Failure} from "../../../core/failures/failures";
import {UserRepository} from "../../repositories/user_repository";

export class GetUserByIdUsecase implements PromiseUsecase<UserEntity, GetUserByIdUsecaseParams> {
    constructor (private readonly repository: UserRepository) {}

    async handle (params: GetUserByIdUsecaseParams): Promise<Either<Failure, UserEntity>> {
        return await this.repository.getUserById({id: params.id});
    }

}

export class GetUserByIdUsecaseParams {
    readonly id: string;

    constructor ({id}: {id: string}) {
        this.id = id;
    }
}