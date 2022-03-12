"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const player_send_phrase_to_history_1 = require("./player_send_phrase_to_history");
const game_room_1 = require("../../entities/game_room");
const phrase_1 = require("../../entities/phrase");
const date_helper_1 = require("../../../core/helper/date_helper");
describe('player send phrase to history usecase', function () {
    const exampleRoomId = "validRoomId";
    const exampleUserId = "validUserId";
    const examplePhrase = "era uma vez";
    const exampleRoom = new game_room_1.GameRoom({
        adminsIds: ["admin1"],
        name: "roomName",
        history: [
            new phrase_1.Phrase({
                phrase: examplePhrase,
                senderId: exampleUserId,
                sendAt: date_helper_1.DateHelper.numberToDate(Date.now())
            })
        ],
        id: exampleRoomId,
        playersIds: [exampleUserId],
        createdAt: date_helper_1.DateHelper.numberToDate(Date.now())
    });
    it('should return a right null if call to repository is success', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue(either_ts_1.right(exampleRoom)),
            getRoomById: jest.fn()
        };
        const usecase = new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase });
        expect(result).toStrictEqual(either_ts_1.right(exampleRoom));
    });
    it('should return left server failure if call to repository fails', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue(either_ts_1.left(new failures_1.ServerFailure())),
            getRoomById: jest.fn()
        };
        const usecase = new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase });
        expect(result).toStrictEqual(either_ts_1.left(new failures_1.ServerFailure()));
    });
});
