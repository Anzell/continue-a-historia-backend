"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const exceptions_1 = require("../../core/failures/exceptions");
const failures_1 = require("../../core/failures/failures");
const date_helper_1 = require("../../core/helper/date_helper");
const game_room_1 = require("../../domain/entities/game_room");
const phrase_1 = require("../../domain/entities/phrase");
const room_repository_impl_1 = require("./room_repository_impl");
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
                createRoom: jest.fn().mockReturnValue(null)
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.createRoom(exampleRoom);
            expect(result).toStrictEqual((0, either_ts_1.right)(null));
        });
        it("deve retornar left failure caso chamada ao repository der erro", async () => {
            const mockRoomDatasource = {
                createRoom: jest.fn().mockRejectedValue(new exceptions_1.ServerException())
            };
            let repository = new room_repository_impl_1.RoomRepositoryImpl(mockRoomDatasource);
            let result = await repository.createRoom(exampleRoom);
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
});
