import {Db, MongoClient} from "mongodb";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {GameRoom} from "../../../domain/entities/game_room";
import {Phrase} from "../../../domain/entities/phrase";
import {RoomRemoteDs, RoomRemoteDsImpl} from "./room_remote_ds";
import {StringHelper} from "../../../core/helper/string_helper";
import {GameRoomMapper} from "../../mappers/game_room_mapper";
import {GameRoomModel} from "../../models/game_room";
import {NotFoundException} from "../../../core/failures/exceptions";
import {PhraseModel} from "../../models/phrase_model";
import {ResumeGameRoom} from "../../../domain/entities/resume_game_room";

describe("room remote ds", () => {
    let db: Db;

    beforeEach(async ()=>{
        let connection = await MongoClient.connect(process.env["MONGO_URL"]!);
        db = await connection.db();
    });

    describe("create room", () => {
        const exampleRoom = new GameRoom({
            adminsIds: ["admin1"],
            name: "roomName",
            history: [
                new Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: new Date(2021,10,10)
                })
            ],
            id: "validId",
            playersIds: [],
            createdAt: new Date(2021,10,10)
        });

        it("deve registrar a sala normalmente", async () => {
            const mockStringHelper: StringHelper = {
                generateUuid: jest.fn().mockReturnValue("validId")
            } as StringHelper;
            let datasource: RoomRemoteDs = new RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.createRoom(exampleRoom);
            const result = await db.collection(DbCollections.rooms).findOne({"id": "validId"});
            expect(result).not.toBe(null);
            expect(GameRoomMapper.modelToEntity(GameRoomModel.fromJson(result))).toBeInstanceOf(GameRoom);
        });
    });

    describe('insert player', function () {

        const mockStringHelper: StringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        } as StringHelper;

        it('should insert a new player in game room when array exists in document', async function () {
            const roomId = "validIdExistingArray";
            const userId = "exampleValidUserId";
            const exampleRoom = new GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021,10,10)
                    })
                ],
                id: "validIdExistingArray",
                playersIds: ["aId"],
                createdAt: new Date(2021,10,10)
            });
            await db.collection(DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.insertPlayer({roomId, userId});
            const documentResult = await db.collection(DbCollections.rooms).findOne({id: "validIdExistingArray"});
            const roomModel = GameRoomModel.fromJson(documentResult);
            expect(roomModel.playersIds?.length).toStrictEqual(2);
        });

        it('should insert a new player in game room when array dont exists in document', async function () {
            const roomId = "validIdDontExistingArray";
            const userId = "exampleValidUserId";
            const exampleRoom = new GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021,10,10)
                    })
                ],
                id: "validIdDontExistingArray",
                playersIds: undefined,
                createdAt: new Date(2021,10,10)
            });
            await db.collection(DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.insertPlayer({roomId, userId});
            const documentResult = await db.collection(DbCollections.rooms).findOne({id: "validIdDontExistingArray"});
            const roomModel = GameRoomModel.fromJson(documentResult);
            expect(roomModel.playersIds?.length).toStrictEqual(1);
        });

        it('should throw NotFoundException when roomId provided dont exists', async function () {
            const roomId = "invalidId";
            const userId = "exampleValidUserId";
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = datasource.insertPlayer({roomId, userId});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });

    describe('send phrase', function () {
        const mockStringHelper: StringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        } as StringHelper;

        it('should register a new phrase in history and return a updated Room', async function () {
            const roomId = "roomForTestPhrase";
            const userId = "player1";
            const phrase = "um cara que";
            const exampleRoom = new GameRoomModel({
                adminsIds: ["admin1"],
                name: "roomName",
                history: [
                    new PhraseModel({
                        phrase: "Era uma vez",
                        senderId: "admin1",
                        sendAt: new Date(2021, 10, 10)
                    })
                ],
                id: "roomForTestPhrase",
                playersIds: ["player1"],
                createdAt: new Date(2021, 10, 10)
            });
            await db.collection(DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = await datasource.sendPhrase({userId, roomId, phrase});
            const documentAfterUpdate = await db.collection(DbCollections.rooms).findOne({id: roomId});
            expect(documentAfterUpdate!['history'].length).toStrictEqual(2);
            expect(result.history?.length).toStrictEqual(2);
        });
    });

    describe('get room by id', function () {

        const mockStringHelper: StringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        } as StringHelper;

        it('should return a valid GameRoom', async function () {
            const expected = new GameRoom({
                id: "getRoomByIdTest",
                adminsIds: ["admin1"],
                history: [],
                createdAt: new Date(2021,10,10),
                name: "test",
                playersIds: []
            });

            await db.collection(DbCollections.rooms).insertOne({...GameRoomMapper.entityToModel(expected).toJson()});
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = await datasource.getRoomById({id: "getRoomByIdTest"});
            expect(result).toStrictEqual(expected);
        });

        it('should throw a NotFoundException if document dont exists in database', async function () {
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = datasource.getRoomById({id: "invalidGetRoomByIdTest"});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });

    describe('get player rooms', function () {
        const mockStringHelper: StringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        } as StringHelper;

        it('should return a valid array if call to db is success', async function () {
            const expected = [
                new GameRoomModel({
                    adminsIds: ["admin1"],
                    name: "roomName",
                    history: [
                        new PhraseModel({
                            phrase: "Era uma vez",
                            senderId: "admin1",
                            sendAt: new Date(2021, 10, 10)
                        })
                    ],
                    id: "validIdExistingArray",
                    playersIds: ["aId", "validId", "anotherId"],
                    createdAt: new Date(2021, 10, 10)
                }),
                new GameRoomModel({
                    adminsIds: ["admin1"],
                    name: "roomName",
                    history: [
                        new PhraseModel({
                            phrase: "Era uma vez",
                            senderId: "admin1",
                            sendAt: new Date(2021, 10, 10)
                        })
                    ],
                    id: "validIdExistingArray2",
                    playersIds: ["aId"],
                    createdAt: new Date(2021, 10, 10)
                }),
                new GameRoomModel({
                    adminsIds: ["admin1", "validId"],
                    name: "roomName 3",
                    history: [
                        new PhraseModel({
                            phrase: "Era uma vez",
                            senderId: "admin1",
                            sendAt: new Date(2021, 10, 10)
                        })
                    ],
                    id: "validIdExistingArray3",
                    playersIds: ["aId", "anotherId"],
                    createdAt: new Date(2021, 10, 10)
                }),
            ];
            for(let x = 0; x < expected.length; x++){
                await db.collection(DbCollections.rooms).insertOne(expected[x]);
            }

            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = await datasource.getPlayerRooms({userId: "validId"});
            expect(result).toStrictEqual([
               new ResumeGameRoom({id: "validIdExistingArray", playersNumber: 3, phrasesNumber: 1, title: "roomName"}),
               new ResumeGameRoom({id: "validIdExistingArray3", playersNumber: 2, phrasesNumber: 1, title: "roomName 3"})
            ]);
        });
    });

    describe('update room', function () {
        const mockStringHelper: StringHelper = {
            generateUuid: jest.fn().mockReturnValue("validId")
        } as StringHelper;

        it('should update room and return the updated room', async function () {
            const exampleRoom = new GameRoomModel({id: "testUpdateRoom", name: "testName", adminsIds: ["admin1"]});
            const expected = new GameRoomModel({id: "testUpdateRoom", name: "changed Name Test", adminsIds: ["admin1"]});
            await db.collection(DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = await datasource.updateRoom({roomData: expected});
            const documentUpdated = await db.collection(DbCollections.rooms).findOne({id: exampleRoom.id});
            expect(documentUpdated!["name"]).toStrictEqual(expected.name);
        });

        it('should throw NotFoundFailure when id provided is invalid', async function () {
            const exampleRoom = new GameRoomModel({id: "testUpdateRoom", name: "testName", adminsIds: ["admin1"]});
            const expected = new GameRoomModel({id: "not existind document id", name: "changed Name Test", adminsIds: ["admin1"]});
            await db.collection(DbCollections.rooms).insertOne(exampleRoom.toJson());
            const datasource = new RoomRemoteDsImpl(db, mockStringHelper);
            const result = datasource.updateRoom({roomData: expected});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });
});