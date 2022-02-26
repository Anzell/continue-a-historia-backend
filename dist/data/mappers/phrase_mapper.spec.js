"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phrase_1 = require("../../domain/entities/phrase");
const phrase_model_1 = require("../models/phrase_model");
const phrase_mapper_1 = require("./phrase_mapper");
describe("phrase mapper", () => {
    const entity = new phrase_1.Phrase({
        senderId: "validId",
        sendAt: new Date(2021, 10, 10),
        phrase: "Era uma vez"
    });
    const model = new phrase_model_1.PhraseModel({
        senderId: "validId",
        sendAt: new Date(2021, 10, 10),
        phrase: "Era uma vez"
    });
    it("entity to model", () => {
        const result = phrase_mapper_1.PhraseMapper.entityToModel(entity);
        expect(result).toStrictEqual(model);
    });
    it("model to entity", () => {
        const result = phrase_mapper_1.PhraseMapper.modelToEntity(model);
        expect(result).toStrictEqual(entity);
    });
});
