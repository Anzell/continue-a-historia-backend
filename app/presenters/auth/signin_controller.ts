import {HttpController} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SignInConverter, SignInConverterParams} from "./converters/signin_converter";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {AuthToken} from "../../domain/entities/auth_token";
import {SignInUsecase} from "../../domain/usecases/auth/sign_in";

export class SignInController implements HttpController{
    constructor (
        private readonly signInUseCase: SignInUsecase,
        private readonly signInConverter: SignInConverter
    ) {
    }

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.signInConverter.handle(new SignInConverterParams({
                username: request['username'],
                password: request['password'],
            }));
            converter.map(async (convertedObject) => {
                const result = await this.signInUseCase.handle({
                    password: convertedObject.password,
                    username: convertedObject.username
                });
                result.map((token: AuthToken) => {
                    serverResponse = new CustomResponse({
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
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
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new CustomResponse({
                    codeStatus: 400,
                    message: (failure as ValidationFailure).message!,
                    result: {}
                });
                resolve(false);
            });
        });

        return serverResponse;
    }

}