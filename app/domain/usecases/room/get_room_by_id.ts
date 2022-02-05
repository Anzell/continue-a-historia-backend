import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {GameRoom} from "../../entities/game_room";
import {RoomRepository} from "../../repositories/room_repository";
import {Failure} from "../../../core/failures/failures";

export abstract class GetRoomByIdUsecase implements PromiseUsecase<GameRoom, GetRoomByIdUsecaseParams> {
    abstract handle: (params: GetRoomByIdUsecaseParams) => Promise<Either<Failure, GameRoom>>;
}

export class GetRoomByIdUsecaseImpl implements GetRoomByIdUsecase {
async   handle (params: GetRoomByIdUsecaseParams): Promise<Either<Failure, GameRoom>> {
        return await this.repository.getRoomById({id: params.id});
    }

    constructor (private readonly repository: RoomRepository) {}

}

export class GetRoomByIdUsecaseParams {
    readonly id: string;

    constructor ({id}: {id: string}) {
        this.id = id;
    }
}