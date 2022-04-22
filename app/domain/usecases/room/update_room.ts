import { Failure } from "../../../core/failures/failures";
import { PromiseUsecase } from "../../../core/usecases/promise_usecase";
import { GameRoom } from "../../entities/game_room";
import { RoomRepository } from "../../repositories/room_repository";

export abstract class UpdateRoomUseCase implements  PromiseUsecase<null, UpdateRoomUseCaseParams>{
    abstract handle(params : UpdateRoomUseCaseParams): Promise<Either<Failure, null>>;
}

export class UpdateRoomUseCaseImpl implements UpdateRoomUseCase{
    constructor(private repository: RoomRepository){}

    async handle(params: UpdateRoomUseCaseParams): Promise<Either<Failure, null>> {
        return await this.repository.updateRoom({roomData: params.room});
    }
}

export class UpdateRoomUseCaseParams {
    public room: GameRoom;

    constructor({room}: {
        room: GameRoom
    }){
        this.room = room;
    }
}