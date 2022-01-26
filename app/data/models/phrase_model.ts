import { DateHelper } from "../../core/helper/date_helper";
import { Phrase } from "../../domain/entities/phrase";

export class PhraseModel extends Phrase{
    toJson() {
        let sendAt = DateHelper.dateToNumber(this.sendAt);
        return {
            "phrase": this.phrase,
            "sendAt": sendAt,
            "senderId": this.senderId
        };
    }

    static fromJson(json: any): PhraseModel {
        return new PhraseModel({
            phrase: json['phrase'],
            senderId: json['senderId'],
            sendAt: DateHelper.numberToDate(Number.parseInt(json['sendAt']))
        });
    }
}