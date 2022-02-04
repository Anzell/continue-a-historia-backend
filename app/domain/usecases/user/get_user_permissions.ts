import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {Failure} from "../../../core/failures/failures";
import {UserRepository} from "../../repositories/user_repository";

export class GetUserPermissionsUsecase implements PromiseUsecase<string, GetUserPermissionsUsecaseParams> {
    constructor (private readonly repository: UserRepository) {}

    async handle (params: GetUserPermissionsUsecaseParams): Promise<Either<Failure, string>> {
        return await this.repository.getUserPermissions({id: params.id});
    }

}

export class GetUserPermissionsUsecaseParams {
    readonly id: string;

    constructor ({id}: {id: string}) {
        this.id = id;
    }
}