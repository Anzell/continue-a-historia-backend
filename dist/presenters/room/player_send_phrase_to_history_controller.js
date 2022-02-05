"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSendPhraseToHistoryController = void 0;
const custom_message_1 = require("../../main/protocols/custom_message");
const type_messages_1 = require("../../core/constants/socket/type_messages");
class PlayerSendPhraseToHistoryController {
    constructor(playerSendPhraseUsecase, playerSendPhraseConverter) {
        this.playerSendPhraseUsecase = playerSendPhraseUsecase;
        this.playerSendPhraseConverter = playerSendPhraseConverter;
    }
    async handle(request) {
        let serverResponse = new custom_message_1.CustomMessage({
            type: type_messages_1.TypeSocketMessages.error,
            content: {}
        });
        return serverResponse;
    }
}
exports.PlayerSendPhraseToHistoryController = PlayerSendPhraseToHistoryController;
