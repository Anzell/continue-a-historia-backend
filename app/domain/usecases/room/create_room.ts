import { Failure } from "../../../core/failures/failures";
import { PromiseUsecase } from "../../../core/usecases/promise_usecase";
import { GameRoom } from "../../entities/game_room";
import { RoomRepository } from "../../repositories/room_repository";

export abstract class CreateRoomUsecase implements  PromiseUsecase<null, CreateRoomUsecaseParams>{
    abstract handle(params : CreateRoomUsecaseParams): Promise<Either<Failure, null>>;
}

export class CreateRoomUsecaseImpl implements CreateRoomUsecase{
    constructor(private repository: RoomRepository){}

    async handle(params: CreateRoomUsecaseParams): Promise<Either<Failure, null>> {
        return await this.repository.createRoom(params.room);
    }
}

export class CreateRoomUsecaseParams {
    public room: GameRoom;

    constructor({room}: {
        room: GameRoom
    }){
        this.room = room;
    }
}