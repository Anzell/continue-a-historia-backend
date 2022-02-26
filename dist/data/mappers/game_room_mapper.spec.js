"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phrase_1 = require("../../domain/entities/phrase");
const game_room_1 = require("../../domain/entities/game_room");
const game_room_2 = require("../models/game_room");
const game_room_mapper_1 = require("./game_room_mapper");
const phrase_model_1 = require("../models/phrase_model");
describe("game room mapper", () => {
    const entity = new game_room_1.GameRoom({
        playersIds: [],
        createdAt: new Date(2021, 10, 10),
        name: 'Sala de testes',
        adminsIds: ["admin1"],
        id: "validRoomId",
        history: [
            new phrase_1.Phrase({
                senderId: "validId",
                sendAt: new Date(2021, 10, 10),
                phrase: "Era uma vez"
            })
        ]
    });
    const model = new game_room_2.GameRoomModel({
        playersIds: [],
        createdAt: new Date(2021, 10, 10),
        name: 'Sala de testes',
        adminsIds: ["admin1"],
        id: "validRoomId",
        history: [
            new phrase_model_1.PhraseModel({
                senderId: "validId",
                sendAt: new Date(2021, 10, 10),
                phrase: "Era uma vez"
            })
        ]
    });
    it("entity to model", () => {
        const result = game_room_mapper_1.GameRoomMapper.entityToModel(entity);
        expect(result).toStrictEqual(model);
    });
    it("model to entity", () => {
        const result = game_room_mapper_1.GameRoomMapper.modelToEntity(model);
        expect(result).toStrictEqual(entity);
    });
});
