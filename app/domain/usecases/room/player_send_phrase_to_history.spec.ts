import {RoomRepository} from "../../repositories/room_repository";
import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {PlayerSendPhraseToHistoryUsecaseImpl} from "./player_send_phrase_to_history";
import {GameRoom} from "../../entities/game_room";
import {Phrase} from "../../entities/phrase";
import {DateHelper} from "../../../core/helper/date_helper";

describe('player send phrase to history usecase', function () {
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

    it('should return a right null if call to repository is success', async function () {
        const mockRepository: any = {
            sendPhrase: jest.fn().mockReturnValue(right(exampleRoom)),
        };
        const usecase = new PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase});
        expect(result).toStrictEqual(right(exampleRoom));
    });

    it('should return left server failure if call to repository fails', async function () {
        const mockRepository: any = {
            sendPhrase: jest.fn().mockReturnValue(left(new ServerFailure())),
        };
        const usecase = new PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase});
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});