import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {GameRoom} from "../../entities/game_room";
import {RoomRepository} from "../../repositories/room_repository";
import {Failure} from "../../../core/failures/failures";

export abstract class GetRoomByIdUsecase implements PromiseUsecase<GameRoom, GetRoomByIdUsecaseParams>{
    constructor (private readonly repository: RoomRepository) {}

    async handle (params: GetRoomByIdUsecaseParams): Promise<Either<Failure, GameRoom>> {
        return await this.repository.getRoomById({id: params.id});
    }

}

export class GetRoomByIdUsecaseParams {
    readonly id: string;
    constructor ({id}: {id: string}) {
        this.id = id;
    }
}