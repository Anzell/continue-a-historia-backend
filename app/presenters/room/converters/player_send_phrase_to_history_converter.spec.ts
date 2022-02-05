import {left, right} from "either-ts";
import {ValidationFailure} from "../../../core/failures/failures";
import {
    PlayerSendPhraseToHistoryConverter, PlayerSendPhraseToHistoryConverterErrorMessages,
    PlayerSendPhraseToHistoryConverterParams
} from "./player_send_phrase_to_history_converter";

describe('player send phrase to history converter', function () {

    it('should return a valid object when data provided is valid', function () {
        const userId: string = "validId";
        const roomId: string = "validId";
        const phrase: string = "a long time ago";
        const converter = new PlayerSendPhraseToHistoryConverter();
        const result = converter.handle(new PlayerSendPhraseToHistoryConverterParams({userId, roomId, phrase}));
        expect(result).toStrictEqual(right({userId, roomId, phrase}));
    });

    it('should return left validation failure when data provided is not valid', function () {
        const converter = new PlayerSendPhraseToHistoryConverter();
        expect(converter.handle(new PlayerSendPhraseToHistoryConverterParams({userId: "validId", phrase: "validPhrase"}))).toStrictEqual(left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingRoom})));
        expect(converter.handle(new PlayerSendPhraseToHistoryConverterParams({roomId: "validId", phrase: "validPhrase"}))).toStrictEqual(left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingUser})));
        expect(converter.handle(new PlayerSendPhraseToHistoryConverterParams({roomId: "validId", userId: "validId"}))).toStrictEqual(left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingPhrase})));
    });

});