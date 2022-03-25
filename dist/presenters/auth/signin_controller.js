"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const signin_converter_1 = require("./converters/signin_converter");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const code_helper_1 = require("../../core/helper/code_helper");
class SignInController {
    constructor(signInUseCase, signInConverter) {
        this.signInUseCase = signInUseCase;
        this.signInConverter = signInConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.signInConverter.handle(new signin_converter_1.SignInConverterParams({
                email: request['email'],
                password: request['password'],
            }));
            converter.map(async (convertedObject) => {
                const result = await this.signInUseCase.handle({
                    password: convertedObject.password,
                    email: convertedObject.email
                });
                result.map((token) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        code: server_codes_1.ServerCodes.success,
                        result: {
                            id: token.id,
                            token: token.token
                        }
                    });
                    resolve(true);
                });
                result.leftMap((failure) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 400,
                        message: failure_mapper_1.FailureHelper.mapFailureToMessage(failure),
                        code: code_helper_1.CodeHelper.failureToCode(failure),
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new custom_response_1.CustomResponse({
                    codeStatus: 400,
                    message: failure.message,
                    code: code_helper_1.CodeHelper.failureToCode(failure),
                    result: {}
                });
                resolve(false);
            });
        });
        return serverResponse;
    }
}
exports.SignInController = SignInController;
