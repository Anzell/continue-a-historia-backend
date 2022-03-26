import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {GetUserByIdUsecase, GetUserByIdUsecaseParams} from "../../domain/usecases/user/get_user_by_id";
import {GetUserByIdConverter, GetUserByIdConverterParams} from "./converters/get_user_by_id_converter";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {CodeHelper} from "../../core/helper/code_helper";

export class GetUserByIdController implements Controller {
    constructor (private readonly getUserByIdUsecase: GetUserByIdUsecase, private readonly getUserByIdConverter: GetUserByIdConverter) {}

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: ServerCodes.serverFailure,
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.getUserByIdConverter.handle(new GetUserByIdConverterParams({id: request["id"]}));
            converter.map(async (convertedRequest) => {
                const resultUsecase = await this.getUserByIdUsecase.handle(new GetUserByIdUsecaseParams({
                    id: convertedRequest.id
                }));
                resultUsecase.map((user) => {
                   serverResponse = new CustomResponse({
                       code: ServerCodes.success,
                       message: SuccessMessages.operationSuccess,
                       codeStatus: 200,
                       result: user
                   });
                   resolve(true);
                });
                resultUsecase.leftMap((failure) => {
                   serverResponse = new CustomResponse({
                       code: CodeHelper.failureToCode(failure),
                       codeStatus: 400,
                       message: FailureHelper.mapFailureToMessage(failure),
                       result: {}
                   });
                   resolve(true);
                });
            });
            converter.leftMap((failure) => {
               serverResponse = new CustomResponse({
                   code: CodeHelper.failureToCode(failure),
                   codeStatus: 400,
                   message: FailureHelper.mapFailureToMessage(failure),
                   result: {}
               });
               resolve(true);
            });
        });
        return serverResponse;
    }

}