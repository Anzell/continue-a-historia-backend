"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEnterInRoomController = void 0;
const player_enter_in_room_1 = require("../../domain/usecases/room/player_enter_in_room");
const player_enter_in_room_converter_1 = require("./converters/player_enter_in_room_converter");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class PlayerEnterInRoomController {
    constructor(insertPlayerInRoomUsecase, insertPlayerConverter) {
        this.insertPlayerInRoomUsecase = insertPlayerInRoomUsecase;
        this.insertPlayerConverter = insertPlayerConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
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
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        result: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    message: failure.message,
                    result: {}
                });
                resolve(false);
            });
        });
        return serverResponse;
    }
}
exports.PlayerEnterInRoomController = PlayerEnterInRoomController;
