"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRemoteDsImpl = void 0;
const db_collections_1 = require("../../../core/constants/db/db_collections");
const game_room_mapper_1 = require("../../mappers/game_room_mapper");
const date_helper_1 = require("../../../core/helper/date_helper");
class RoomRemoteDsImpl {
    constructor(db, stringHelper) {
        this.db = db;
        this.stringHelper = stringHelper;
    }
    async createRoom(room) {
        const id = this.stringHelper.generateUuid();
        await this.db.collection(db_collections_1.DbCollections.rooms).insertOne({
            ...game_room_mapper_1.GameRoomMapper.entityToModel(room).toJson(),
            "id": id,
            "createdAt": date_helper_1.DateHelper.dateToNumber(new Date())
        });
    }
}
exports.RoomRemoteDsImpl = RoomRemoteDsImpl;
