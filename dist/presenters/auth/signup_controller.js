"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpController = void 0;
const custom_response_1 = require("../../main/protocols/custom_response");
const signup_converters_1 = require("./converters/signup_converters");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failure_mapper_1 = require("../../core/helper/failure_mapper");
const code_helper_1 = require("../../core/helper/code_helper");
const server_codes_1 = require("../../core/constants/messages/server_codes");
class SignUpController {
    constructor(signUpUsecase, signUpConverter) {
        this.signUpUsecase = signUpUsecase;
        this.signUpConverter = signUpConverter;
    }
    async handle(request) {
        let serverResponse = new custom_response_1.CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400
        });
        console.log(request);
        await new Promise((resolve) => {
            const converter = this.signUpConverter.handle(new signup_converters_1.SignupConvertersParams({
                username: request['username'],
                email: request['email'],
                password: request['password'],
            }));
            converter.map(async (convertedObject) => {
                const result = await this.signUpUsecase.handle({
                    email: convertedObject.email,
                    password: convertedObject.password,
                    username: convertedObject.username
                });
                result.map((_) => {
                    serverResponse = new custom_response_1.CustomResponse({
                        codeStatus: 200,
                        message: success_messages_1.SuccessMessages.operationSuccess,
                        code: server_codes_1.ServerCodes.success,
                        result: {}
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
exports.SignUpController = SignUpController;
