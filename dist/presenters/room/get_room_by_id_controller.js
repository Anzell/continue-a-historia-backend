"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetRoomByIdController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const code_helper_1 = require("../../core/helper/code_helper");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const get_room_by_id_converter_1 = require("./converters/get_room_by_id_converter");
const get_room_by_id_1 = require("../../domain/usecases/room/get_room_by_id");
const game_room_mapper_1 = require("../../data/mappers/game_room_mapper");
class GetRoomByIdController {
    constructor({ converter, usecase }) {
        this.usecase = usecase;
        this.converter = converter;
    }
    async handle(request) {
        return await new Promise((resolve) => {
            const converterResult = this.converter.handle(new get_room_by_id_converter_1.GetRoomByIdConverterParams({ roomId: request["room_id"] }));
            converterResult.map(async (convertedRequest) => {
                const usecaseResult = await this.usecase.handle(new get_room_by_id_1.GetRoomByIdUsecaseParams({ id: convertedRequest.roomId }));
                usecaseResult.map((room) => {
                    resolve(new custom_response_1.CustomResponse({
                        code: server_codes_1.ServerCodes.success,
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        result: game_room_mapper_1.GameRoomMapper.entityToModel(room).toJson()
                    }));
                });
                usecaseResult.leftMap((failure) => {
                    resolve(new custom_response_1.CustomResponse({
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {},
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                    }));
                });
            });
            converterResult.leftMap((failure) => {
                resolve(new custom_response_1.CustomResponse({
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    codeStatus: 400,
                    result: {},
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure)
                }));
            });
        });
    }
}
exports.GetRoomByIdController = GetRoomByIdController;
