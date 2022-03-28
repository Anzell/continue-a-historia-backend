import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {ResumeGameRoom} from "../../entities/resume_game_room";
import {Failure} from "../../../core/failures/failures";
import {RoomRepository} from "../../repositories/room_repository";

export abstract class GetUserRoomsUsecase implements PromiseUsecase<Array<ResumeGameRoom>, GetUserRoomsUsecaseParams>{
    abstract handle (params: GetUserRoomsUsecaseParams): Promise<Either<Failure, Array<ResumeGameRoom>>>;
}

export class GetUserRoomsUsecaseImpl implements GetUserRoomsUsecase {
    readonly repository: RoomRepository;

    constructor ({repository}: {repository: RoomRepository}) {
        this.repository = repository;
    }

    async handle (params: GetUserRoomsUsecaseParams): Promise<Either<Failure, Array<ResumeGameRoom>>> {
        return await this.repository.getPlayerRooms({userId: params.userId});
    }

}

export class GetUserRoomsUsecaseParams {
    readonly userId: string;

    constructor ({userId}: {userId: string}) {
        this.userId = userId;
    }
}