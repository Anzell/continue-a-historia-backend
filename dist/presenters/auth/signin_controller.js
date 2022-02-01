"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const signin_converter_1 = require("./converters/signin_converter");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
class SignInController {
    constructor(signInUseCase, signInConverter) {
        this.signInUseCase = signInUseCase;
        this.signInConverter = signInConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.signInConverter.handle(new signin_converter_1.SignInConverterParams({
                username: request['username'],
                password: request['password'],
            }));
            converter.map(async (convertedObject) => {
                const result = await this.signInUseCase.handle({
                    password: convertedObject.password,
                    username: convertedObject.username
                });
                result.map((token) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
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
exports.SignInController = SignInController;
