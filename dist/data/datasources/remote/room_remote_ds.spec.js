"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_collections_1 = require("../../../core/constants/db/db_collections");
const game_room_1 = require("../../../domain/entities/game_room");
const phrase_1 = require("../../../domain/entities/phrase");
const room_remote_ds_1 = require("./room_remote_ds");
const game_room_mapper_1 = require("../../mappers/game_room_mapper");
const game_room_2 = require("../../models/game_room");
describe("room remote ds", () => {
    let db;
    beforeEach(async () => {
        let connection = await mongodb_1.MongoClient.connect(process.env["MONGO_URL"]);
        db = await connection.db();
    });
    describe("create room", () => {
        const exampleRoom = new game_room_1.GameRoom({
            adminsIds: ["admin1"],
            name: "roomName",
            history: [
                new phrase_1.Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: new Date(2021, 10, 10)
                })
            ],
            id: "validId",
            playersIds: [],
            createdAt: new Date(2021, 10, 10)
        });
        it("deve registrar a sala normalmente", async () => {
            const mockStringHelper = {
                generateUuid: jest.fn().mockReturnValue("validId")
            };
            let datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.createRoom(exampleRoom);
            const result = await db.collection(db_collections_1.DbCollections.rooms).findOne({ "id": "validId" });
            expect(result).not.toBe(null);
            expect(game_room_mapper_1.GameRoomMapper.modelToEntity(game_room_2.GameRoomModel.fromJson(result))).toBeInstanceOf(game_room_1.GameRoom);
        });
    });
});
