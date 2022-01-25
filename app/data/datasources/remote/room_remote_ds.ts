import { GameRoom } from "../../../domain/entities/game_room";

export interface RoomRemoteDs {
    createRoom: (room: GameRoom) => Promise<void>;
}