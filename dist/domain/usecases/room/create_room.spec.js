"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const game_room_1 = require("../../entities/game_room");
const phrase_1 = require("../../entities/phrase");
const create_room_1 = require("./create_room");
jest.mock("../../repositories/room_repository");
describe("teste de usecase", () => {
    const exampleRoom = new game_room_1.GameRoom({
        adminsIds: ["admin1"],
        name: "roomName",
        history: [
            new phrase_1.Phrase({
                phrase: "Era uma vez",
                senderId: "admin1",
                sendAt: Date.now()
            })
        ],
        id: "validId",
        playersIds: [],
        createdAt: Date.now()
    });
    it("deve retornar right void caso chamada ao repository der sucesso", async () => {
        const mockRoomRepository = {
            createRoom: jest.fn().mockReturnValue(either_ts_1.right(null))
        };
        let usecase = new create_room_1.CreateRoomUsecase(mockRoomRepository);
        let result = await usecase.handle(new create_room_1.CreateRoomUsecaseParams({ room: exampleRoom }));
        expect(result).toStrictEqual(either_ts_1.right(null));
    });
    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockRoomRepository = {
            createRoom: jest.fn().mockReturnValue(either_ts_1.left(new failures_1.ServerFailure()))
        };
        let usecase = new create_room_1.CreateRoomUsecase(mockRoomRepository);
        let result = await usecase.handle(new create_room_1.CreateRoomUsecaseParams({ room: exampleRoom }));
        expect(result).toStrictEqual(either_ts_1.left(new failures_1.ServerFailure()));
    });
});