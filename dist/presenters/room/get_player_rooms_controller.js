"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPlayerRoomsController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const get_player_rooms_converter_1 = require("./converters/get_player_rooms_converter");
const get_user_rooms_1 = require("../../domain/usecases/room/get_user_rooms");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const code_helper_1 = require("../../core/helper/code_helper");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class GetPlayerRoomsController {
    constructor({ converter, usecase }) {
        this.usecase = usecase;
        this.converter = converter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: "Erro no servidor",
            code: server_codes_1.ServerCodes.serverFailure,
            result: {}
        });
        await new Promise((resolve) => {
            const converterResult = this.converter.handle(new get_player_rooms_converter_1.GetPlayerRoomsConverterParams({ userId: request["userId"] }));
            converterResult.map(async (convertedRequest) => {
                const usecaseResult = await this.usecase.handle(new get_user_rooms_1.GetUserRoomsUsecaseParams({ userId: convertedRequest.userId }));
                usecaseResult.map((rooms) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        code: server_codes_1.ServerCodes.success,
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        result: rooms
                    });
                    resolve(true);
                });
                usecaseResult.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {},
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(true);
                });
            });
            converterResult.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    codeStatus: 400,
                    result: {},
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                });
                resolve(true);
            });
        });
        return serverResponse;
    }
}
exports.GetPlayerRoomsController = GetPlayerRoomsController;
