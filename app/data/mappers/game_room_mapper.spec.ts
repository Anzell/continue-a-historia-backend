import {Phrase} from "../../domain/entities/phrase";
import {GameRoom} from "../../domain/entities/game_room";
import {GameRoomModel} from "../models/game_room";
import {GameRoomMapper} from "./game_room_mapper";
import {PhraseModel} from "../models/phrase_model";

describe("game room mapper", () => {
    const entity = new GameRoom({
        playersIds:[],
        createdAt: new Date(2021,10,10),
        name: 'Sala de testes',
        adminsIds: ["admin1"],
        id: "validRoomId",
        history: [
            new Phrase({
                senderId: "validId",
                sendAt: new Date(2021,10,10),
                phrase: "Era uma vez"
            })
        ]
    });
    const model = new GameRoomModel({
        playersIds:[],
        createdAt: new Date(2021,10,10),
        name: 'Sala de testes',
        adminsIds: ["admin1"],
        id: "validRoomId",
        history: [
            new PhraseModel({
                senderId: "validId",
                sendAt: new Date(2021,10,10),
                phrase: "Era uma vez"
            })
        ]
    });

    it("entity to model", () => {
        const result = GameRoomMapper.entityToModel(entity);
        expect(result).toStrictEqual(model);
    });

    it("model to entity", () => {
        const result = GameRoomMapper.modelToEntity(model);
        expect(result).toStrictEqual(entity);
    });
});