"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhraseModel = void 0;
const date_helper_1 = require("../../core/helper/date_helper");
const phrase_1 = require("../../domain/entities/phrase");
class PhraseModel extends phrase_1.Phrase {
    toJson() {
        let sendAt = date_helper_1.DateHelper.dateToNumber(this.sendAt);
        return {
            "phrase": this.phrase,
            "sendAt": sendAt,
            "senderId": this.senderId
        };
    }
    static fromJson(json) {
        return new PhraseModel({
            phrase: json['phrase'],
            senderId: json['senderId'],
            sendAt: date_helper_1.DateHelper.numberToDate(Number.parseInt(json['sendAt']))
        });
    }
}
exports.PhraseModel = PhraseModel;
