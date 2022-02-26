"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoomMapper = void 0;
const game_room_1 = require("../../domain/entities/game_room");
const game_room_2 = require("../models/game_room");
const phrase_mapper_1 = require("./phrase_mapper");
class GameRoomMapper {
    static entityToModel(entity) {
        return new game_room_2.GameRoomModel({
            adminsIds: entity.adminsIds,
            id: entity.id,
            createdAt: entity.createdAt,
            history: entity.history?.map((element) => phrase_mapper_1.PhraseMapper.entityToModel(element)),
            name: entity.name,
            playersIds: entity.playersIds,
        });
    }
    static modelToEntity(model) {
        return new game_room_1.GameRoom({
            adminsIds: model.adminsIds,
            id: model.id,
            createdAt: model.createdAt,
            history: model.history?.map((element) => phrase_mapper_1.PhraseMapper.modelToEntity(element)),
            name: model.name,
            playersIds: model.playersIds,
        });
    }
}
exports.GameRoomMapper = GameRoomMapper;
