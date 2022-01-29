import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SignUpUsecase} from "../../domain/usecases/auth/sign_up";
import {SignupConverter, SignupConvertersParams} from "./converters/signup_converters";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";

export class SignUpController implements Controller{
    constructor (private readonly signUpUsecase: SignUpUsecase, private readonly signUpConverter: SignupConverter) {
    }

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.signUpConverter.handle(new SignupConvertersParams({
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
                result.map((_: any) => {
                    serverResponse = new CustomResponse({
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
                        result: {}
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