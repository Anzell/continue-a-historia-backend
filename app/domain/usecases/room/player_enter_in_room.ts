import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {Failure} from "../../../core/failures/failures";
import {RoomRepository} from "../../repositories/room_repository";

export abstract class PlayerEnterInRoomUsecase implements PromiseUsecase<null, PlayerEnterInRoomUsecaseParams>{
    abstract handle (params: PlayerEnterInRoomUsecaseParams): Promise<Either<Failure, null>>;
}

export class PlayerEnterInRoomUsecaseImpl implements  PlayerEnterInRoomUsecase {
    constructor (private readonly repository: RoomRepository) {}

    async handle (params: PlayerEnterInRoomUsecaseParams): Promise<Either<Failure, null>> {
        return await this.repository.insertPlayer({userId: params.userId, roomId: params.roomId});
    }
}

export class PlayerEnterInRoomUsecaseParams {
    readonly roomId: string;
    readonly userId: string;

    constructor({roomId, userId}: {roomId: string, userId: string}){
        this.roomId = roomId;
        this.userId = userId;
    }
}