"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const player_send_phrase_to_history_converter_1 = require("./player_send_phrase_to_history_converter");
describe('player send phrase to history converter', function () {
    it('should return a valid object when data provided is valid', function () {
        const userId = "validId";
        const roomId = "validId";
        const phrase = "a long time ago";
        const converter = new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverter();
        const result = converter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({ userId, roomId, phrase }));
        expect(result).toStrictEqual((0, either_ts_1.right)({ userId, roomId, phrase }));
    });
    it('should return left validation failure when data provided is not valid', function () {
        const converter = new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverter();
        expect(converter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({ userId: "validId", phrase: "validPhrase" }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterErrorMessages.missingRoom })));
        expect(converter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({ roomId: "validId", phrase: "validPhrase" }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterErrorMessages.missingUser })));
        expect(converter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({ roomId: "validId", userId: "validId" }))).toStrictEqual((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterErrorMessages.missingPhrase })));
    });
});
