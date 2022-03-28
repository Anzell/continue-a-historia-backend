import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {GameRoom} from "../../entities/game_room";
import {GetRoomByIdUsecaseImpl} from "./get_room_by_id";

describe('get room by id usecase', function () {
    const exampleRoomId = "validRoomId";

    it('should return a right null if call to repository is success', async function () {
        const expected = new GameRoom({
            id: exampleRoomId,
            adminsIds: ["admin1"],
            history: [],
            createdAt: new Date(2021,10,10),
            name: "test"
        });
        const mockRepository: any = {
            getRoomById: jest.fn().mockReturnValue(right(expected))
        };
        const usecase = new GetRoomByIdUsecaseImpl(mockRepository);
        const result = await usecase.handle({id: exampleRoomId});
        expect(result).toStrictEqual(right(expected));
    });

    it('should return left server failure if call to repository fails', async function () {
        const mockRepository: any = {
            getRoomById: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const usecase = new GetRoomByIdUsecaseImpl(mockRepository);
        const result = await usecase.handle({id: exampleRoomId});
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});