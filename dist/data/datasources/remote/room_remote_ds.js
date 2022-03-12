"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRemoteDsImpl = void 0;
const db_collections_1 = require("../../../core/constants/db/db_collections");
const game_room_mapper_1 = require("../../mappers/game_room_mapper");
const date_helper_1 = require("../../../core/helper/date_helper");
const exceptions_1 = require("../../../core/failures/exceptions");
const game_room_1 = require("../../models/game_room");
const phrase_model_1 = require("../../models/phrase_model");
class RoomRemoteDsImpl {
    constructor(db, stringHelper) {
        this.db = db;
        this.stringHelper = stringHelper;
    }
    async insertPlayer({ roomId, userId }) {
        const roomDocument = await this.db.collection(db_collections_1.DbCollections.rooms).findOne({ id: roomId });
        if (roomDocument === null) {
            throw new exceptions_1.NotFoundException();
        }
        const roomModel = game_room_1.GameRoomModel.fromJson(roomDocument);
        if (roomModel.playersIds !== undefined && roomModel.playersIds?.length > 0) {
            roomModel.playersIds.push(userId);
        }
        else {
            roomModel.playersIds = [userId];
        }
        await this.db.collection(db_collections_1.DbCollections.rooms).updateOne({ "id": roomId }, { $set: {
                ...roomModel.toJson()
            } }, { upsert: true });
    }
    async createRoom(room) {
        const id = this.stringHelper.generateUuid();
        await this.db.collection(db_collections_1.DbCollections.rooms).insertOne({
            ...game_room_mapper_1.GameRoomMapper.entityToModel(room).toJson(),
            "id": id,
            "createdAt": date_helper_1.DateHelper.dateToNumber(new Date())
        });
    }
    async sendPhrase({ userId, roomId, phrase }) {
        const roomDocument = await this.db.collection(db_collections_1.DbCollections.rooms).findOne({ id: roomId });
        if (roomDocument === null) {
            throw new exceptions_1.NotFoundException();
        }
        const roomModel = game_room_1.GameRoomModel.fromJson(roomDocument);
        if (!roomModel.playersIds?.some((player) => userId === player) && !roomModel.adminsIds?.some((admin) => admin === userId)) {
            throw new exceptions_1.PlayerDontExistsInRoomException();
        }
        const phraseModel = new phrase_model_1.PhraseModel({
            sendAt: new Date(),
            senderId: userId,
            phrase: phrase
        });
        roomModel.history?.push(phraseModel);
        await this.db.collection(db_collections_1.DbCollections.rooms).findOneAndUpdate({ id: roomId }, { $set: { ...roomModel.toJson() } });
        return game_room_mapper_1.GameRoomMapper.modelToEntity(roomModel);
    }
    async getRoomById({ id }) {
        const document = await this.db.collection(db_collections_1.DbCollections.rooms).findOne({ id });
        if (document === null) {
            throw new exceptions_1.NotFoundException();
        }
        return game_room_mapper_1.GameRoomMapper.modelToEntity(game_room_1.GameRoomModel.fromJson(document));
    }
}
exports.RoomRemoteDsImpl = RoomRemoteDsImpl;
