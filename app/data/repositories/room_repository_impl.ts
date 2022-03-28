import { left, right } from "either-ts";
import {Failure, NotFoundFailure, ServerFailure} from "../../core/failures/failures";
import { GameRoom } from "../../domain/entities/game_room";
import { RoomRepository } from "../../domain/repositories/room_repository";
import { RoomRemoteDs } from "../datasources/remote/room_remote_ds";
import {NotFoundException} from "../../core/failures/exceptions";
import {ResumeGameRoom} from "../../domain/entities/resume_game_room";

export class RoomRepositoryImpl implements RoomRepository {
    constructor(public datasource: RoomRemoteDs){}

    async getPlayerRooms ({userId}: { userId: string }): Promise<Either<Failure, Array<ResumeGameRoom>>> {
        try{
            const result = await this.datasource.getPlayerRooms({userId});
            return right(result);
        }catch(e){
            return left(new ServerFailure());
        }
    }

    async getRoomById ({id}: { id: string }): Promise<Either<Failure, GameRoom>> {
        try{
            const result = await this.datasource.getRoomById({id});
            return right(result);
        }catch(e){
            if(e instanceof NotFoundException){
                return left(new NotFoundFailure());
            }
            return left(new ServerFailure());
        }
    }

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

    async sendPhrase ({userId, roomId, phrase}: { userId: string; roomId: string; phrase: string }): Promise<Either<Failure, GameRoom>> {
        try {
            const result = await this.datasource.sendPhrase({userId, roomId, phrase});
            return right(result);
        }catch(e){
            return left(new ServerFailure());
        }
    }

}