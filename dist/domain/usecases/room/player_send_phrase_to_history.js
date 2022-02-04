"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSendPhraseToHistoryUsecaseParams = exports.PlayerSendPhraseToHistoryUsecaseImpl = exports.PlayerSendPhraseToHistoryUsecase = void 0;
class PlayerSendPhraseToHistoryUsecase {
}
exports.PlayerSendPhraseToHistoryUsecase = PlayerSendPhraseToHistoryUsecase;
class PlayerSendPhraseToHistoryUsecaseImpl {
    constructor(repository) {
        this.repository = repository;
    }
    async handle(params) {
        return await this.repository.sendPhrase({ userId: params.userId, phrase: params.phrase, roomId: params.roomId });
    }
}
exports.PlayerSendPhraseToHistoryUsecaseImpl = PlayerSendPhraseToHistoryUsecaseImpl;
class PlayerSendPhraseToHistoryUsecaseParams {
    constructor({ roomId, userId, phrase }) {
        this.phrase = phrase;
        this.userId = userId;
        this.roomId = roomId;
    }
}
exports.PlayerSendPhraseToHistoryUsecaseParams = PlayerSendPhraseToHistoryUsecaseParams;
