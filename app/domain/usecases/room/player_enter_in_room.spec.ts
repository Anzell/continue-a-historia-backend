import {RoomRepository} from "../../repositories/room_repository";
import {left, right} from "either-ts";
import { PlayerEnterInRoomUsecaseImpl} from "./player_enter_in_room";
import {ServerFailure} from "../../../core/failures/failures";

describe('player enter in room usecase', function () {
    const exampleRoomId = "validRoomId";
    const exampleUserId = "validUserId";

    it('should return a right null if call to repository is success', async function () {
        const mockRepository: RoomRepository = {
          createRoom: jest.fn(),
          insertPlayer: jest.fn().mockReturnValue(right(null)),
            sendPhrase: jest.fn(),
            getRoomById: jest.fn()
        };
        const usecase = new PlayerEnterInRoomUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId});
        expect(result).toStrictEqual(right(null));
    });

    it('should return left server failure if call to repository fails', async function () {
        const mockRepository: RoomRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn().mockReturnValue(left(new ServerFailure())),
            sendPhrase: jest.fn(),
            getRoomById: jest.fn()
        };
        const usecase = new PlayerEnterInRoomUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId});
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});