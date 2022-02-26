"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_helper_1 = require("../../core/helper/date_helper");
const phrase_model_1 = require("./phrase_model");
describe("phrase model", () => {
    let model;
    beforeEach(() => {
        model = new phrase_model_1.PhraseModel({
            phrase: "Era uma vez",
            senderId: "userId",
            sendAt: new Date(2021, 10, 10)
        });
    });
    it("to json", () => {
        const expected = {
            "phrase": "Era uma vez",
            "sendAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10)),
            "senderId": "userId"
        };
        const result = model.toJson();
        expect(result).toStrictEqual(expected);
    });
    it("from json", () => {
        const result = phrase_model_1.PhraseModel.fromJson({
            "phrase": "Era uma vez",
            "sendAt": date_helper_1.DateHelper.dateToNumber(new Date(2021, 10, 10)),
            "senderId": "userId"
        });
        expect(result).toStrictEqual(model);
    });
});
