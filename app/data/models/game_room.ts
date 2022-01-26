import { DateHelper } from "../../core/helper/date_helper";
import { GameRoom } from "../../domain/entities/game_room";
import { PhraseModel } from "./phrase_model";

export class GameRoomModel extends GameRoom {
    toJson(): any {
        let createdAt = DateHelper.dateToNumber(this.createdAt);
        return {
            "createdAt": createdAt,
            "name": this.name,
            "adminsIds": this.adminsIds,
            "history": this.history?.map((element) => new PhraseModel({senderId: element.senderId!, phrase: element.phrase!, sendAt: element.sendAt}).toJson()),
            "playersIds": this.playersIds,
            "id": this.id
        };
    }

    static fromJson(json: any): GameRoomModel {
        return new GameRoomModel({
            adminsIds: json['adminsIds'],
            name: json['name'],
            createdAt: DateHelper.numberToDate(Number.parseInt(json['createdAt'])),
            history: json['history'].map((element: any) => PhraseModel.fromJson(element)),
            id: json['id'],
            playersIds: json['playersIds']
        });
    }
}