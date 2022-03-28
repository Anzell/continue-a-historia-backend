"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const exceptions_1 = require("../../core/failures/exceptions");
const failures_1 = require("../../core/failures/failures");
const date_helper_1 = require("../../core/helper/date_helper");
const game_room_1 = require("../../domain/entities/game_room");
const phrase_1 = require("../../domain/entities/phrase");
const room_repository_impl_1 = require("./room_repository_impl");
const resume_game_room_1 = require("../../domain/entities/resume_game_room");
describe("teste de room repository impl", () => {
    describe("create room", () => {
        const exampleRoom = new game_room_1.GameRoom({
            adminsIds: ["admin1"],
            name: "roomName",
            history: [
                new phrase_1.Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: date_helper_1.DateHelper.numberToDate(Date.now())
                })
            ],
            id: "validId",
            playersIds: [],
            createdAt: date_helper_1.DateHelper.numberToDate(Date.now())
        });
        it("deve retornar right null caso chamada ao datasource der sucesso", async () => {
            const mockRoomDatasource = {
                createRoom: jest.fn().mockReturnValue(null),
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.createRoom(exampleRoom);
            expect(result).toStrictEqual((0, either_ts_1.right)(null));
        });
        it("deve retornar left failure caso chamada ao repository der erro", async () => {
            const mockRoomDatasource = {
                createRoom: jest.fn().mockRejectedValue(new exceptions_1.ServerException()),
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.createRoom(exampleRoom);
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
    describe('insert player', function () {
        const exampleRoomId = "validRoomId";
        const exampleUserId = "validUserId";
        it('should return a right null if call to datasource is success', async function () {
            const mockRoomDatasource = {
                insertPlayer: jest.fn().mockReturnValue(null),
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.insertPlayer({ userId: exampleUserId, roomId: exampleRoomId });
            expect(result).toStrictEqual((0, either_ts_1.right)(null));
        });
        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource = {
                insertPlayer: jest.fn().mockRejectedValue(new exceptions_1.ServerException()),
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.insertPlayer({ userId: exampleUserId, roomId: exampleRoomId });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
    describe('send phrase', function () {
        const exampleRoomId = "validRoomId";
        const exampleUserId = "validUserId";
        const examplePhrase = "era uma vez";
        const exampleRoom = new game_room_1.GameRoom({
            adminsIds: ["admin1"],
            name: "roomName",
            history: [
                new phrase_1.Phrase({
                    phrase: examplePhrase,
                    senderId: exampleUserId,
                    sendAt: date_helper_1.DateHelper.numberToDate(Date.now())
                })
            ],
            id: exampleRoomId,
            playersIds: [exampleUserId],
            createdAt: date_helper_1.DateHelper.numberToDate(Date.now())
        });
        it('should return a right GameRoom if call to datasource is success', async function () {
            const mockRoomDatasource = {
                sendPhrase: jest.fn().mockReturnValue(exampleRoom)
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.sendPhrase({ userId: exampleUserId, roomId: exampleRoomId, phrase: examplePhrase });
            expect(result).toStrictEqual((0, either_ts_1.right)(exampleRoom));
        });
        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource = {
                sendPhrase: jest.fn().mockRejectedValue(new exceptions_1.ServerException()),
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.sendPhrase({ userId: exampleUserId, roomId: exampleRoomId, phrase: examplePhrase });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
    describe('get room by id', function () {
        it('should return a right with game room entity if call to datasource is success', async function () {
            const expected = new game_room_1.GameRoom({
                id: "getRoomByIdTest",
                adminsIds: ["admin1"],
                history: [],
                createdAt: new Date(2021, 10, 10),
                name: "test",
                playersIds: []
            });
            const mockRoomDatasource = {
                getRoomById: jest.fn().mockReturnValue(expected)
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({ id: "getRoomByIdTest" });
            expect(result).toStrictEqual((0, either_ts_1.right)(expected));
        });
        it('should return left not found failure if call to datasource fails', async function () {
            const mockRoomDatasource = {
                getRoomById: jest.fn().mockRejectedValue(new exceptions_1.NotFoundException())
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({ id: "getRoomByIdTest" });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.NotFoundFailure()));
        });
        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource = {
                getRoomById: jest.fn().mockRejectedValue(new exceptions_1.ServerException())
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({ id: "getRoomByIdTest" });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
    describe('get player rooms', function () {
        it('should return a valid array of resumed rooms if call to datasource is success', async function () {
            let expected = [
                new resume_game_room_1.ResumeGameRoom({ id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102 }),
                new resume_game_room_1.ResumeGameRoom({ id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40 }),
                new resume_game_room_1.ResumeGameRoom({ id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0 }),
            ];
            const mockRoomDatasource = {
                getPlayerRooms: jest.fn().mockReturnValue(expected)
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getPlayerRooms({ userId: "validTest" });
            expect(result).toStrictEqual((0, either_ts_1.right)(expected));
        });
        it('should return a left if call to datasource is fail', async function () {
            let expected = [
                new resume_game_room_1.ResumeGameRoom({ id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102 }),
                new resume_game_room_1.ResumeGameRoom({ id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40 }),
                new resume_game_room_1.ResumeGameRoom({ id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0 }),
            ];
            const mockRoomDatasource = {
                getPlayerRooms: jest.fn().mockRejectedValue(new exceptions_1.ServerException())
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getPlayerRooms({ userId: "validTest" });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
});
