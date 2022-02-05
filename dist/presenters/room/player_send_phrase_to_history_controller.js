"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSendPhraseToHistoryController = void 0;
const custom_message_1 = require("../../main/protocols/custom_message");
const player_send_phrase_to_history_1 = require("../../domain/usecases/room/player_send_phrase_to_history");
const player_send_phrase_to_history_converter_1 = require("./converters/player_send_phrase_to_history_converter");
const type_messages_1 = require("../../core/constants/socket/type_messages");
const get_room_by_id_1 = require("../../domain/usecases/room/get_room_by_id");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class PlayerSendPhraseToHistoryController {
    constructor(playerSendPhraseUsecase, playerSendPhraseConverter, getRoomByIdUsecase) {
        this.playerSendPhraseUsecase = playerSendPhraseUsecase;
        this.playerSendPhraseConverter = playerSendPhraseConverter;
        this.getRoomByIdUsecase = getRoomByIdUsecase;
    }
    async handle(request) {
        let serverResponse = new custom_message_1.CustomMessage({
            type: type_messages_1.TypeSocketMessages.error,
            content: {}
        });
        await new Promise((resolve) => {
            const converterResult = this.playerSendPhraseConverter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({
                phrase: request['phrase'],
                roomId: request['roomId'],
                userId: request['userId']
            }));
            converterResult.leftMap((failure) => {
                serverResponse = new custom_message_1.CustomMessage({
                    type: type_messages_1.TypeSocketMessages.error,
                    content: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                });
                resolve(true);
            });
            converterResult.map(async (convertedRequest) => {
                const roomResult = await this.getRoomByIdUsecase.handle(new get_room_by_id_1.GetRoomByIdUsecaseParams({ id: convertedRequest.roomId }));
                roomResult.leftMap((failure) => {
                    serverResponse = new custom_message_1.CustomMessage({
                        type: type_messages_1.TypeSocketMessages.error,
                        content: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(true);
                });
                roomResult.map(async (room) => {
                    const sendPhraseResult = await this.playerSendPhraseUsecase.handle(new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseParams({
                        roomId: convertedRequest.roomId,
                        phrase: convertedRequest.phrase,
                        userId: convertedRequest.userId
                    }));
                    sendPhraseResult.leftMap((failure) => {
                        serverResponse = new custom_message_1.CustomMessage({
                            type: type_messages_1.TypeSocketMessages.error,
                            content: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                        });
                        resolve(true);
                    });
                    sendPhraseResult.map((_) => {
                        serverResponse = new custom_message_1.CustomMessage({
                            type: type_messages_1.TypeSocketMessages.sendPhraseToHistory,
                            content: {}
                        });
                    });
                });
            });
        });
        return serverResponse;
    }
}
exports.PlayerSendPhraseToHistoryController = PlayerSendPhraseToHistoryController;
