import { DateHelper } from "../../core/helper/date_helper";
import { GameRoomModel } from "./game_room";

import {  PhraseModel } from "./phrase_model";

describe("game room model", () => {
    let model: GameRoomModel;

    beforeEach(()=> {
        model = new GameRoomModel({
            history: [
                new PhraseModel({
                    phrase:"Era uma vez",
                    senderId: "admin1",
                    sendAt: new Date(2021,10,10)
                })
            ],
            adminsIds:["admin1"],
            name: "Sala de testes",
            createdAt: new Date(2021,10,10),
            playersIds: [],
            id: "validId"
        });
    });

    it("to json", () => {
        const expected = {
            "history": [
                {
                    "phrase":"Era uma vez",
                    "senderId": "admin1",
                    "sendAt": DateHelper.dateToNumber(new Date(2021,10,10))
                }
            ],
            "adminsIds":["admin1"],
            "name": "Sala de testes",
            "createdAt": DateHelper.dateToNumber(new Date(2021,10,10)),
            "playersIds": [],
            "id": "validId"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected); 
    });

    it("from json", () => {
        const result = GameRoomModel.fromJson({
            "history": [
                {
                    "phrase":"Era uma vez",
                    "senderId": "admin1",
                    "sendAt": DateHelper.dateToNumber(new Date(2021,10,10))
                }
            ],
            "adminsIds":["admin1"],
            "name": "Sala de testes",
            "createdAt": DateHelper.dateToNumber(new Date(2021,10,10)),
            "playersIds": [],
            "id": "validId"
        });
        expect(result).toStrictEqual(model);
    });
});