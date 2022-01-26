import {GameRoom} from "../../domain/entities/game_room";
import {GameRoomModel} from "../models/game_room";

export class GameRoomMapper{
    static entityToModel(entity: GameRoom): GameRoomModel {
        return new GameRoomModel({
           adminsIds: entity.adminsIds!,
           id: entity.id,
           createdAt: entity.createdAt,
           history: entity.history,
           name: entity.name!,
           playersIds: entity.playersIds,
        });
    }

    static modelToEntity(model: GameRoomModel): GameRoom {
        return new GameRoom({
            adminsIds: model.adminsIds!,
            id: model.id,
            createdAt: model.createdAt,
            history: model.history,
            name: model.name!,
            playersIds: model.playersIds,
        });
    }
}