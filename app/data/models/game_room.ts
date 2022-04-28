import { DateHelper } from "../../core/helper/date_helper";
import { GameRoom } from "../../domain/entities/game_room";
import { PhraseModel } from "./phrase_model";

export class GameRoomModel extends GameRoom {

    public history?: Array<PhraseModel>;

    toJson(): any {
        let createdAt = DateHelper.dateToNumber(this.createdAt);
        return {
            "createdAt": createdAt ?? undefined,
            "name": this.name ?? "",
            "adminsIds": this.adminsIds ?? [],
            "history": this.history?.map((element) => new PhraseModel({senderId: element.senderId!, phrase: element.phrase!, sendAt: element.sendAt}).toJson()) ?? [],
            "playersIds": this.playersIds ?? [],
            "id": this.id ?? undefined,
            "someoneIsTapping": this.someoneIsTaping ?? undefined,
            "lastTappedId": this.lastTappedId ?? undefined,
        };
    }

    static fromJson(json: any): GameRoomModel {
        return new GameRoomModel({
            adminsIds: json['adminsIds'] ?? undefined,
            name: json['name'] ?? undefined,
            createdAt: DateHelper.numberToDate(Number.parseInt(json['createdAt'])) ?? undefined,
            history: json['history']?.map((element: any) => PhraseModel.fromJson(element)) ?? [],
            id: json['id'] ?? undefined,
            playersIds: json['playersIds'] ?? [],
            someoneIsTapping: json["someoneIsTapping"] ?? undefined,
            lastTappedId: json["lastTappedId"] ?? undefined
        });
    }
}