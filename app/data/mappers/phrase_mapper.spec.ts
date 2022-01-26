import {Phrase} from "../../domain/entities/phrase";
import {PhraseModel} from "../models/phrase_model";
import {PhraseMapper} from "./phrase_mapper";

describe("phrase mapper", () => {
    const entity = new Phrase({
        senderId: "validId",
        sendAt: new Date(2021,10,10),
        phrase: "Era uma vez"
    });
    const model = new PhraseModel({
        senderId: "validId",
        sendAt: new Date(2021,10,10),
        phrase: "Era uma vez"
    });

    it("entity to model", () => {
        const result = PhraseMapper.entityToModel(entity);
        expect(result).toStrictEqual(model);
    });

    it("model to entity", () => {
        const result = PhraseMapper.modelToEntity(model);
        expect(result).toStrictEqual(entity);
    });
});