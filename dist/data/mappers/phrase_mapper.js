"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhraseMapper = void 0;
const phrase_1 = require("../../domain/entities/phrase");
const phrase_model_1 = require("../models/phrase_model");
class PhraseMapper {
    static entityToModel(entity) {
        return new phrase_model_1.PhraseModel({
            phrase: entity.phrase,
            senderId: entity.senderId,
            sendAt: entity.sendAt,
        });
    }
    static modelToEntity(model) {
        return new phrase_1.Phrase({
            phrase: model.phrase,
            sendAt: model.sendAt,
            senderId: model.senderId,
        });
    }
}
exports.PhraseMapper = PhraseMapper;
