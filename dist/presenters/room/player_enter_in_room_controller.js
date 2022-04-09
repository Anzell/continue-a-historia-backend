"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomController = void 0;
const player_enter_in_room_1 = require("../../domain/usecases/room/player_enter_in_room");
const player_enter_in_room_converter_1 = require("./converters/player_enter_in_room_converter");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const code_helper_1 = require("../../core/helper/code_helper");
class PlayerEnterInRoomController {
    constructor(insertPlayerInRoomUsecase, insertPlayerConverter, getUserByUsernameConverter, getUserByUsernameUsecase) {
        this.insertPlayerInRoomUsecase = insertPlayerInRoomUsecase;
        this.insertPlayerConverter = insertPlayerConverter;
        this.getUserByUsernameConverter = getUserByUsernameConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: "Erro no servidor",
            code: server_codes_1.ServerCodes.serverFailure,
            result: {}
        });
        await new Promise((resolve) => {
            const converter = this.insertPlayerConverter.handle(new player_enter_in_room_converter_1.PlayerEnterInRoomConverterParams({
                userId: request['userId'],
                roomId: request['roomId'],
            }));
            converter.map(async (data) => {
                const result = await this.insertPlayerInRoomUsecase.handle(new player_enter_in_room_1.PlayerEnterInRoomUsecaseParams({
                    roomId: data.roomId,
                    userId: data.userId,
                }));
                result.map((_) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        code: server_codes_1.ServerCodes.success,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        result: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                    result: {},
                });
                resolve(false);
            });
        });
        return serverResponse;
    }
}
exports.PlayerEnterInRoomController = PlayerEnterInRoomController;
