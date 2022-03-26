"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const get_user_by_id_1 = require("../../domain/usecases/user/get_user_by_id");
const get_user_by_id_converter_1 = require("./converters/get_user_by_id_converter");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const code_helper_1 = require("../../core/helper/code_helper");
class GetUserByIdController {
    constructor(getUserByIdUsecase, getUserByIdConverter) {
        this.getUserByIdUsecase = getUserByIdUsecase;
        this.getUserByIdConverter = getUserByIdConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.getUserByIdConverter.handle(new get_user_by_id_converter_1.GetUserByIdConverterParams({ id: request["id"] }));
            converter.map(async (convertedRequest) => {
                const resultUsecase = await this.getUserByIdUsecase.handle(new get_user_by_id_1.GetUserByIdUsecaseParams({
                    id: convertedRequest.id
                }));
                resultUsecase.map((user) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        code: server_codes_1.ServerCodes.success,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        codeStatus: 200,
                        result: user
                    });
                    resolve(true);
                });
                resultUsecase.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        result: {}
                    });
                    resolve(true);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    codeStatus: 400,
                    message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                    result: {}
                });
                resolve(true);
            });
        });
        return serverResponse;
    }
}
exports.GetUserByIdController = GetUserByIdController;
