import { left, right } from "either-ts";
import { Failure, ServerFailure } from "../../core/failures/failures";
import { GameRoom } from "../../domain/entities/game_room";
import { RoomRepository } from "../../domain/repositories/room_repository";
import { RoomRemoteDs } from "../datasources/remote/room_remote_ds";

export class RoomRepositoryImpl implements RoomRepository {

    constructor(public datasource: RoomRemoteDs){}

    async createRoom(room: GameRoom): Promise<Either<Failure, null>> {
        try{
            await this.datasource.createRoom(room);
            return right(null);
        }catch(e){
            return left(new ServerFailure());
        }
    }

    async insertPlayer ({userId, roomId}: { userId: string; roomId: string }): Promise<Either<Failure, null>> {
        try {
            await this.datasource.insertPlayer({userId, roomId});
            return right(null);
        }catch(e){
            return left(new ServerFailure());
        }
    }

}