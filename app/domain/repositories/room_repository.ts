import { Failure } from "../../core/failures/failures";
import { GameRoom } from "../entities/game_room";
import {ResumeGameRoom} from "../entities/resume_game_room";

export interface RoomRepository{
    createRoom: (room: GameRoom) => Promise<Either<Failure, null>>;
    insertPlayer: ({userId, roomId}: {userId: string, roomId: string}) => Promise<Either<Failure, null>>;
    sendPhrase: ({userId, roomId, phrase}: {userId: string, roomId: string, phrase: string}) => Promise<Either<Failure, GameRoom>>;
    getRoomById: ({id}: {id: string}) => Promise<Either<Failure, GameRoom>>;
    getPlayerRooms: ({userId}: {userId: string}) => Promise<Either<Failure, Array<ResumeGameRoom>>>;
    updateRoom: ({roomData}: {roomData: GameRoom}) => Promise<Either<Failure, null>>;
}