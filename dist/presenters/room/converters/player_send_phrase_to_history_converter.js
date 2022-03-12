"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSendPhraseToHistoryConverterErrorMessages = exports.PlayerSendPhraseToHistoryConverterParams = exports.PlayerSendPhraseToHistoryConverter = void 0;
const failures_1 = require("../../../core/failures/failures");
const either_ts_1 = require("either-ts");
class PlayerSendPhraseToHistoryConverter {
    handle(params) {
        if (params.phrase === undefined || params.phrase === "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: PlayerSendPhraseToHistoryConverterErrorMessages.missingPhrase }));
        }
        if (params.roomId === undefined || params.roomId === "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: PlayerSendPhraseToHistoryConverterErrorMessages.missingRoom }));
        }
        if (params.userId === undefined || params.userId === "") {
            return either_ts_1.left(new failures_1.ValidationFailure({ message: PlayerSendPhraseToHistoryConverterErrorMessages.missingUser }));
        }
        return either_ts_1.right({
            phrase: params.phrase,
            roomId: params.roomId,
            userId: params.userId
        });
    }
}
exports.PlayerSendPhraseToHistoryConverter = PlayerSendPhraseToHistoryConverter;
class PlayerSendPhraseToHistoryConverterParams {
    constructor({ phrase, roomId, userId }) {
        this.phrase = phrase;
        this.userId = userId;
        this.roomId = roomId;
    }
}
exports.PlayerSendPhraseToHistoryConverterParams = PlayerSendPhraseToHistoryConverterParams;
class PlayerSendPhraseToHistoryConverterErrorMessages {
}
exports.PlayerSendPhraseToHistoryConverterErrorMessages = PlayerSendPhraseToHistoryConverterErrorMessages;
PlayerSendPhraseToHistoryConverterErrorMessages.missingPhrase = "É necessário informar a frase";
PlayerSendPhraseToHistoryConverterErrorMessages.missingRoom = "É necessário informar a sala";
PlayerSendPhraseToHistoryConverterErrorMessages.missingUser = "É necessário informar o jogador";
