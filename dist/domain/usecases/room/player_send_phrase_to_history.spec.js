"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const player_send_phrase_to_history_1 = require("./player_send_phrase_to_history");
describe('player send phrase to history usecase', function () {
    const exampleRoomId = "validRoomId";
    const exampleUserId = "validUserId";
    const examplePhrase = "era uma vez";
    it('should return a right null if call to repository is success', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue((0, either_ts_1.right)(null)),
            getRoomById: jest.fn()
        };
        const usecase = new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase });
        expect(result).toStrictEqual((0, either_ts_1.right)(null));
    });
    it('should return left server failure if call to repository fails', async function () {
        const mockRepository = {
            createRoom: jest.fn(),
            insertPlayer: jest.fn(),
            sendPhrase: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure())),
            getRoomById: jest.fn()
        };
        const usecase = new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseImpl(mockRepository);
        const result = await usecase.handle({ roomId: exampleRoomId, userId: exampleUserId, phrase: examplePhrase });
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
