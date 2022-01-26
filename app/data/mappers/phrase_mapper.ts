import {Phrase} from "../../domain/entities/phrase";
import {PhraseModel} from "../models/phrase_model";

export class PhraseMapper{
    static entityToModel(entity: Phrase): PhraseModel {
        return new PhraseModel({
            phrase: entity.phrase!,
            senderId: entity.senderId!,
            sendAt: entity.sendAt,
        });
    }

    static modelToEntity(model: PhraseModel): Phrase {
        return new Phrase({
           phrase: model.phrase!,
            sendAt: model.sendAt,
            senderId: model.senderId!,
        });
    }
}