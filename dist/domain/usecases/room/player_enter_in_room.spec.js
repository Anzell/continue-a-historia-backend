"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const player_enter_in_room_1 = require("./player_enter_in_room");
const failures_1 = require("../../../core/failures/failures");
describe('player enter in room usecase', function () {
    const exampleRoomId = "validRoomId";
    const exampleUserId = "validUserId";
    it('should return a right null if call to repository is success', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn().mockReturnValue((0, either_ts_1.right)(null)),
            sendPhrase: jest.fn()
        };
        const usecase = new player_enter_in_room_1.PlayerEnterInRoomUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId });
        expect(result).toStrictEqual((0, either_ts_1.right)(null));
    });
    it('should return left server failure if call to repository fails', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure())),
            sendPhrase: jest.fn()
        };
        const usecase = new player_enter_in_room_1.PlayerEnterInRoomUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId });
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
