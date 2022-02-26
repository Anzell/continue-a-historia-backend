"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_helper_1 = require("../../core/helper/date_helper");
const game_room_1 = require("./game_room");
const phrase_model_1 = require("./phrase_model");
describe("game room model", () => {
    let model;
    beforeEach(() => {
        model = new game_room_1.GameRoomModel({
            history: [
                new phrase_model_1.PhraseModel({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: new Date(2021, 10, 10)
                })
            ],
            adminsIds: ["admin1"],
            name: "Sala de testes",
            createdAt: new Date(2021, 10, 10),
            playersIds: [],
            id: "validId"
        });
    });
    it("to json", () => {
        const expected = {
            "history": [
                {
                    "phrase": "Era uma vez",
                    "senderId": "admin1",
                    "sendAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10))
                }
            ],
            "adminsIds": ["admin1"],
            "name": "Sala de testes",
            "createdAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10)),
            "playersIds": [],
            "id": "validId"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected);
    });
    it("from json", () => {
        const result = game_room_1.GameRoomModel.fromJson({
            "history": [
                {
                    "phrase": "Era uma vez",
                    "senderId": "admin1",
                    "sendAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10))
                }
            ],
            "adminsIds": ["admin1"],
            "name": "Sala de testes",
            "createdAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10)),
            "playersIds": [],
            "id": "validId"
        });
        expect(result).toStrictEqual(model);
    });
});
