"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const resume_game_room_1 = require("../../entities/resume_game_room");
const get_user_rooms_1 = require("./get_user_rooms");
describe('getUserRoomsUsecase', function () {
    it('should return a right with Resumed Rooms if call to repository is success', async function () {
        let expected = [
            new resume_game_room_1.ResumeGameRoom({ id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102 }),
            new resume_game_room_1.ResumeGameRoom({ id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40 }),
            new resume_game_room_1.ResumeGameRoom({ id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0 }),
        ];
        const mockRepository = {
            getPlayerRooms: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const usecase = new get_user_rooms_1.GetUserRoomsUsecaseImpl({ repository: mockRepository });
        const result = await usecase.handle({ userId: "testId" });
        expect(result).toStrictEqual((0, either_ts_1.right)(expected));
    });
    it('should return left server failure if call to repository fails', async function () {
        const mockRepository = {
            getPlayerRooms: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const usecase = new get_user_rooms_1.GetUserRoomsUsecaseImpl({ repository: mockRepository });
        const result = await usecase.handle({ userId: "testId" });
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
