import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {ResumeGameRoom} from "../../entities/resume_game_room";
import {GetUserRoomsUsecaseImpl} from "./get_user_rooms";

describe('getUserRoomsUsecase', function () {
    it('should return a right with Resumed Rooms if call to repository is success', async function () {
        let expected = [
            new ResumeGameRoom({id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102}),
            new ResumeGameRoom({id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40}),
            new ResumeGameRoom({id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0}),
        ];
        const mockRepository: any = {
            getPlayerRooms: jest.fn().mockReturnValue(right(expected))
        };
        const usecase = new GetUserRoomsUsecaseImpl({repository: mockRepository});
        const result = await usecase.handle({userId: "testId"});
        expect(result).toStrictEqual(right(expected));
    });

    it('should return left server failure if call to repository fails', async function () {
        const mockRepository: any = {
            getPlayerRooms: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const usecase = new GetUserRoomsUsecaseImpl({repository: mockRepository});
        const result = await usecase.handle({userId: "testId"});
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});