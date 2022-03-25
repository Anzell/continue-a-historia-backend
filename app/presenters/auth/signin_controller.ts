import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SignInConverter, SignInConverterParams} from "./converters/signin_converter";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {AuthToken} from "../../domain/entities/auth_token";
import {SignInUsecase} from "../../domain/usecases/auth/sign_in";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {CodeHelper} from "../../core/helper/code_helper";

export class SignInController implements Controller{
    constructor (
        private readonly signInUseCase: SignInUsecase,
        private readonly signInConverter: SignInConverter
    ) {
    }

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: ServerCodes.serverFailure,
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.signInConverter.handle(new SignInConverterParams({
                email: request['email'],
                password: request['password'],
            }));
            converter.map(async (convertedObject) => {
                const result = await this.signInUseCase.handle({
                    password: convertedObject.password,
                    email: convertedObject.email
                });
                result.map((token: AuthToken) => {
                    serverResponse = new CustomResponse({
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
                        code: ServerCodes.success,
                        result: {
                            id: token.id,
                            token: token.token
                        }
                    });
                    resolve(true);
                });
                result.leftMap((failure: Failure)=>{
                    serverResponse = new CustomResponse({
                        codeStatus: 400,
                        message: FailureHelper.mapFailureToMessage(failure),
                        code: CodeHelper.failureToCode(failure),
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new CustomResponse({
                    codeStatus: 400,
                    message: (failure as ValidationFailure).message!,
                    code:  CodeHelper.failureToCode(failure),
                    result: {}
                });
                resolve(false);
            });
        });

        return serverResponse;
    }

}