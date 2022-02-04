import { Failure } from "../../core/failures/failures";
import { GameRoom } from "../entities/game_room";

export interface RoomRepository{
    createRoom: (room: GameRoom) => Promise<Either<Failure, null>>;
    insertPlayer: ({userId, roomId}: {userId: string, roomId: string}) => Promise<Either<Failure, null>>;
    sendPhrase: ({userId, roomId, phrase}: {userId: string, roomId: string, phrase: string}) => Promise<Either<Failure, null>>;
}