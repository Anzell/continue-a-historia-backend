"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRoomModel = void 0;
const date_helper_1 = require("../../core/helper/date_helper");
const game_room_1 = require("../../domain/entities/game_room");
const phrase_model_1 = require("./phrase_model");
class GameRoomModel extends game_room_1.GameRoom {
    toJson() {
        let createdAt = date_helper_1.DateHelper.dateToNumber(this.createdAt);
        return {
            "createdAt": createdAt ?? undefined,
            "name": this.name ?? "",
            "adminsIds": this.adminsIds ?? [],
            "history": this.history?.map((element) => new phrase_model_1.PhraseModel({ senderId: element.senderId, phrase: element.phrase, sendAt: element.sendAt }).toJson()) ?? [],
            "playersIds": this.playersIds ?? [],
            "id": this.id ?? undefined,
            "someoneIsTapping": this.someoneIsTaping ?? undefined,
            "lastTappedId": this.lastTappedId ?? undefined,
        };
    }
    static fromJson(json) {
        return new GameRoomModel({
            adminsIds: json['adminsIds'] ?? undefined,
            name: json['name'] ?? undefined,
            createdAt: date_helper_1.DateHelper.numberToDate(Number.parseInt(json['createdAt'])) ?? undefined,
            history: json['history']?.map((element) => phrase_model_1.PhraseModel.fromJson(element)) ?? [],
            id: json['id'] ?? undefined,
            playersIds: json['playersIds'] ?? [],
            someoneIsTapping: json["someoneIsTapping"] ?? undefined,
            lastTappedId: json["lastTappedId"] ?? undefined
        });
    }
}
exports.GameRoomModel = GameRoomModel;
