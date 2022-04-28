"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const game_room_converter_1 = require("./converters/game_room_converter");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const code_helper_1 = require("../../core/helper/code_helper");
class CreateRoomController {
    constructor(createRoomUsecase, gameRoomConverter) {
        this.createRoomUsecase = createRoomUsecase;
        this.gameRoomConverter = gameRoomConverter;
    }
    async handle(request) {
        return await new Promise((resolve) => {
            const converter = this.gameRoomConverter.handle(new game_room_converter_1.GameRoomConverterParams({
                name: request['name'],
                adminsIds: request['adminsIds'],
                playersIds: request['playersIds']
            }));
            converter.map(async (room) => {
                const result = await this.createRoomUsecase.handle({ room });
                result.map((_) => {
                    resolve(new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        code: server_codes_1.ServerCodes.success,
                        result: {}
                    }));
                });
                result.leftMap((failure) => {
                    resolve(new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        result: {}
                    }));
                });
            });
            converter.leftMap((failure) => {
                resolve(new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    message: failure.message,
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    result: {}
                }));
            });
        });
    }
}
exports.CreateRoomController = CreateRoomController;
