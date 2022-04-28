"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerSendPhraseToHistoryController = void 0;
const player_send_phrase_to_history_1 = require("../../domain/usecases/room/player_send_phrase_to_history");
const player_send_phrase_to_history_converter_1 = require("./converters/player_send_phrase_to_history_converter");
const get_room_by_id_1 = require("../../domain/usecases/room/get_room_by_id");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const game_room_mapper_1 = require("../../data/mappers/game_room_mapper");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const code_helper_1 = require("../../core/helper/code_helper");
const success_messages_1 = require("../../core/constants/messages/success_messages");
class PlayerSendPhraseToHistoryController {
    constructor(playerSendPhraseUsecase, playerSendPhraseConverter, getRoomByIdUsecase) {
        this.playerSendPhraseUsecase = playerSendPhraseUsecase;
        this.playerSendPhraseConverter = playerSendPhraseConverter;
        this.getRoomByIdUsecase = getRoomByIdUsecase;
    }
    async handle(request) {
        return await new Promise((resolve) => {
            const converterResult = this.playerSendPhraseConverter.handle(new player_send_phrase_to_history_converter_1.PlayerSendPhraseToHistoryConverterParams({
                phrase: request['phrase'],
                roomId: request['roomId'],
                userId: request['userId']
            }));
            converterResult.leftMap((failure) => {
                resolve(new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                    result: {}
                }));
            });
            converterResult.map(async (convertedRequest) => {
                const roomResult = await this.getRoomByIdUsecase.handle(new get_room_by_id_1.GetRoomByIdUsecaseParams({ id: convertedRequest.roomId }));
                roomResult.leftMap((failure) => {
                    resolve(new custom_response_1.CustomResponse({
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        result: {},
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    }));
                });
                roomResult.map(async (room) => {
                    const sendPhraseResult = await this.playerSendPhraseUsecase.handle(new player_send_phrase_to_history_1.PlayerSendPhraseToHistoryUsecaseParams({
                        roomId: convertedRequest.roomId,
                        phrase: convertedRequest.phrase,
                        userId: convertedRequest.userId
                    }));
                    sendPhraseResult.leftMap((failure) => {
                        resolve(new custom_response_1.CustomResponse({
                            result: {},
                            code: code_helper_1.CodeHelper.failureToCode(failure),
                            codeStatus: 400,
                            message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                        }));
                    });
                    sendPhraseResult.map((updatedRoom) => {
                        resolve(new custom_response_1.CustomResponse({
                            message: success_messages_1.SuccessMessages.operationSuccess,
                            code: server_codes_1.ServerCodes.success,
                            codeStatus: 200,
                            result: game_room_mapper_1.GameRoomMapper.entityToModel(updatedRoom).toJson()
                        }));
                    });
                });
            });
        });
    }
}
exports.PlayerSendPhraseToHistoryController = PlayerSendPhraseToHistoryController;
