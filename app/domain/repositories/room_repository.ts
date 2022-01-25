import { Failure } from "../../core/failures/failures";
import { GameRoom } from "../entities/game_room";

export interface RoomRepository{
    createRoom: (room: GameRoom) => Promise<Either<Failure, null>>;
}