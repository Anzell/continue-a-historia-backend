import {GameRoom} from "../../domain/entities/game_room";
import {GameRoomModel} from "../models/game_room";
import {PhraseMapper} from "./phrase_mapper";
import {Phrase} from "../../domain/entities/phrase";
import {PhraseModel} from "../models/phrase_model";

export class GameRoomMapper{
    static entityToModel(entity: GameRoom): GameRoomModel {
        return new GameRoomModel({
           adminsIds: entity.adminsIds!,
           id: entity.id,
           createdAt: entity.createdAt,
           history: entity.history?.map((element: Phrase) => PhraseMapper.entityToModel(element)),
           name: entity.name!,
           playersIds: entity.playersIds,
            lastTappedId: entity.lastTappedId,
            someoneIsTapping: entity.someoneIsTaping,
        });
    }

    static modelToEntity(model: GameRoomModel): GameRoom {
        return new GameRoom({
            adminsIds: model.adminsIds!,
            id: model.id,
            createdAt: model.createdAt,
            history: model.history?.map((element: PhraseModel) => PhraseMapper.modelToEntity(element)),
            name: model.name!,
            playersIds: model.playersIds,
            lastTappedId: model.lastTappedId,
            someoneIsTapping: model.someoneIsTaping,
        });
    }
}