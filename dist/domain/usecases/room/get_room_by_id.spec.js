"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const game_room_1 = require("../../entities/game_room");
const get_room_by_id_1 = require("./get_room_by_id");
describe('get room by id usecase', function () {
    const exampleRoomId = "validRoomId";
    it('should return a right null if call to repository is success', async function () {
        const expected = new game_room_1.GameRoom({
            id: exampleRoomId,
            adminsIds: ["admin1"],
            history: [],
            createdAt: new Date(2021, 10, 10),
            name: "test"
        });
        const mockRepository = {
            getRoomById: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const usecase = new get_room_by_id_1.GetRoomByIdUsecaseImpl(mockRepository);
        const result = await usecase.handle({ id: exampleRoomId });
        expect(result).toStrictEqual((0, either_ts_1.right)(expected));
    });
    it('should return left server failure if call to repository fails', async function () {
        const mockRepository = {
            getRoomById: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const usecase = new get_room_by_id_1.GetRoomByIdUsecaseImpl(mockRepository);
        const result = await usecase.handle({ id: exampleRoomId });
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
