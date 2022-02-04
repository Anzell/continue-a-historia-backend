import {RoomRepository} from "../../repositories/room_repository";
import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {PlayerSendPhraseToHistoryUsecaseImpl} from "./player_send_phrase_to_history";

describe('player send phrase to history usecase', function () {
    const exampleRoomId = "validRoomId";
    const exampleUserId = "validUserId";
    const examplePhrase = "era uma vez";

    it('should return a right null if call to repository is success', async function () {
        const mockRepository: RoomRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue(right(null))
        };
        const usecase = new PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase});
        expect(result).toStrictEqual(right(null));
    });

    it('should return left server failure if call to repository fails', async function () {
        const mockRepository: RoomRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const usecase = new PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase});
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});