import { left, right } from "either-ts";
import {NotFoundException, ServerException} from "../../core/failures/exceptions";
import {NotFoundFailure, ServerFailure} from "../../core/failures/failures";
import { DateHelper } from "../../core/helper/date_helper";
import { GameRoom } from "../../domain/entities/game_room";
import { Phrase } from "../../domain/entities/phrase";
import { RoomRepository } from "../../domain/repositories/room_repository";
import { RoomRemoteDs } from "../datasources/remote/room_remote_ds";
import { RoomRepositoryImpl } from "./room_repository_impl";

describe("teste de room repository impl", () => {

    describe("create room", () => {
        const exampleRoom = new GameRoom({
            adminsIds:["admin1"],
            name: "roomName",
            history: [
                new Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: DateHelper.numberToDate(Date.now())
                })
            ],
            id: "validId",
            playersIds:[],
            createdAt: DateHelper.numberToDate(Date.now())
        });

        it("deve retornar right null caso chamada ao datasource der sucesso", async () => {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn().mockReturnValue(null),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
          let result = await repository.createRoom(exampleRoom);
          expect(result).toStrictEqual(right(null));
        });
    
        it("deve retornar left failure caso chamada ao repository der erro", async () => {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn().mockRejectedValue(new ServerException()),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
          let result = await repository.createRoom(exampleRoom);
          expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe('insert player', function () {
        const exampleRoomId = "validRoomId";
        const exampleUserId = "validUserId";

        it('should return a right null if call to datasource is success', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn().mockReturnValue(null),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.insertPlayer({userId: exampleUserId, roomId: exampleRoomId});
            expect(result).toStrictEqual(right(null));
        });

        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn().mockRejectedValue(new ServerException()),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.insertPlayer({userId: exampleUserId, roomId: exampleRoomId});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe('send phrase', function () {
        const exampleRoomId = "validRoomId";
        const exampleUserId = "validUserId";
        const examplePhrase = "era uma vez";
        const exampleRoom = new GameRoom({
            adminsIds:["admin1"],
            name: "roomName",
            history: [
                new Phrase({
                    phrase: examplePhrase,
                    senderId: exampleUserId,
                    sendAt: DateHelper.numberToDate(Date.now())
                })
            ],
            id: exampleRoomId,
            playersIds:[exampleUserId],
            createdAt: DateHelper.numberToDate(Date.now())
        });

        it('should return a right GameRoom if call to datasource is success', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn().mockReturnValue(exampleRoom),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.sendPhrase({userId: exampleUserId, roomId: exampleRoomId, phrase: examplePhrase});
            expect(result).toStrictEqual(right(exampleRoom));
        });

        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn().mockRejectedValue(new ServerException()),
                getRoomById: jest.fn()
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.sendPhrase({userId: exampleUserId, roomId: exampleRoomId, phrase: examplePhrase});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe('get room by id', function () {
        it('should return a right with game room entity if call to datasource is success', async function () {
            const expected = new GameRoom({
                id: "getRoomByIdTest",
                adminsIds: ["admin1"],
                history: [],
                createdAt: new Date(2021,10,10),
                name: "test",
                playersIds: []
            });
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn().mockReturnValue(expected)
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({id: "getRoomByIdTest"});
            expect(result).toStrictEqual(right(expected));
        });

        it('should return left not found failure if call to datasource fails', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn().mockRejectedValue(new NotFoundException())
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({id: "getRoomByIdTest"});
            expect(result).toStrictEqual(left(new NotFoundFailure()));
        });
        
        it('should return left server failure if call to datasource fails', async function () {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn(),
                insertPlayer: jest.fn(),
                sendPhrase: jest.fn(),
                getRoomById: jest.fn().mockRejectedValue(new ServerException())
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.getRoomById({id: "getRoomByIdTest"});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });
});