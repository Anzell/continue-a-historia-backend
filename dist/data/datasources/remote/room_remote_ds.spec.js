"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_collections_1 = require("../../../core/constants/db/db_collections");
const game_room_1 = require("../../../domain/entities/game_room");
const phrase_1 = require("../../../domain/entities/phrase");
const room_remote_ds_1 = require("./room_remote_ds");
const game_room_mapper_1 = require("../../mappers/game_room_mapper");
const game_room_2 = require("../../models/game_room");
const exceptions_1 = require("../../../core/failures/exceptions");
const phrase_model_1 = require("../../models/phrase_model");
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
    describe('insert player', function () {
        const mockStringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        };
        it('should insert a new player in game room when array exists in document', async function () {
            const roomId = "validIdExistingArray";
            const userId = "exampleValidUserId";
            const exampleRoom = new game_room_2.GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new phrase_model_1.PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021, 10, 10)
                    })
                ],
                id: "validIdExistingArray",
                playersIds: ["aId"],
                createdAt: new Date(2021, 10, 10)
            });
            await db.collection(db_collections_1.DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.insertPlayer({ roomId, userId });
            const documentResult = await db.collection(db_collections_1.DbCollections.rooms).findOne({ id: "validIdExistingArray" });
            const roomModel = game_room_2.GameRoomModel.fromJson(documentResult);
            expect(roomModel.playersIds?.length).toStrictEqual(2);
        });
        it('should insert a new player in game room when array dont exists in document', async function () {
            const roomId = "validIdDontExistingArray";
            const userId = "exampleValidUserId";
            const exampleRoom = new game_room_2.GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new phrase_model_1.PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021, 10, 10)
                    })
                ],
                id: "validIdDontExistingArray",
                playersIds: undefined,
                createdAt: new Date(2021, 10, 10)
            });
            await db.collection(db_collections_1.DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.insertPlayer({ roomId, userId });
            const documentResult = await db.collection(db_collections_1.DbCollections.rooms).findOne({ id: "validIdDontExistingArray" });
            const roomModel = game_room_2.GameRoomModel.fromJson(documentResult);
            expect(roomModel.playersIds?.length).toStrictEqual(1);
        });
        it('should throw NotFoundException when roomId provided dont exists', async function () {
            const roomId = "invalidId";
            const userId = "exampleValidUserId";
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            const result = datasource.insertPlayer({ roomId, userId });
            await expect(result).rejects.toStrictEqual(new exceptions_1.NotFoundException());
        });
    });
    describe('send phrase', function () {
        const mockStringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        };
        it('should register a new phrase in history', async function () {
            const roomId = "roomForTestPhrase";
            const userId = "player1";
            const phrase = "um cara que";
            const exampleRoom = new game_room_2.GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new phrase_model_1.PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021, 10, 10)
                    })
                ],
                id: "roomForTestPhrase",
                playersIds: ["player1"],
                createdAt: new Date(2021, 10, 10)
            });
            await db.collection(db_collections_1.DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.sendPhrase({ userId, roomId, phrase });
            const documentAfterUpdate = await db.collection(db_collections_1.DbCollections.rooms).findOne({ id: roomId });
            expect(documentAfterUpdate['history'].length).toStrictEqual(2);
        });
    });
    describe('get room by id', function () {
        const mockStringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        };
        it('should return a valid GameRoom', async function () {
            const expected = new game_room_1.GameRoom({
                id: "getRoomByIdTest",
                adminsIds: ["admin1"],
                history: [],
                createdAt: new Date(2021, 10, 10),
                name: "test",
                playersIds: []
            });
            await db.collection(db_collections_1.DbCollections.rooms).insertOne({ ...game_room_mapper_1.GameRoomMapper.entityToModel(expected).toJson() });
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            const result = await datasource.getRoomById({ id: "getRoomByIdTest" });
            expect(result).toStrictEqual(expected);
        });
        it('should throw a NotFoundException if document dont exists in database', async function () {
            const datasource = new room_remote_ds_1.RoomRemoteDsImpl(db, mockStringHelper);
            const result = datasource.getRoomById({ id: "invalidGetRoomByIdTest" });
            await expect(result).rejects.toStrictEqual(new exceptions_1.NotFoundException());
        });
    });
});
