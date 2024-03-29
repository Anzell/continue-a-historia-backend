import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {GetPlayerRoomsConverter, GetPlayerRoomsConverterParams} from "./converters/get_player_rooms_converter";
import {GetUserRoomsUsecase, GetUserRoomsUsecaseParams} from "../../domain/usecases/room/get_user_rooms";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CodeHelper} from "../../core/helper/code_helper";
import {FailureHelper} from "../../core/helper/failure_mapper";

export class GetPlayerRoomsController implements Controller {
    readonly converter: GetPlayerRoomsConverter;
    readonly usecase: GetUserRoomsUsecase;

    constructor ({converter, usecase}: {converter: GetPlayerRoomsConverter, usecase: GetUserRoomsUsecase}) {
        this.usecase = usecase;
        this.converter = converter;
    }

    async handle (request: any): Promise<CustomResponse> {
        return await new Promise<CustomResponse>((resolve) => {
            const converterResult = this.converter.handle(new GetPlayerRoomsConverterParams({userId: request["userId"]}));
            converterResult.map(async (convertedRequest) => {
                const usecaseResult = await this.usecase.handle(new GetUserRoomsUsecaseParams({userId: convertedRequest.userId}));
                usecaseResult.map((rooms) => {
                   resolve(new CustomResponse({
                       code: ServerCodes.success,
                       codeStatus: 200,
                       message: SuccessMessages.operationSuccess,
                       result: rooms
                   }));
                });
                usecaseResult.leftMap((failure) => {
                    resolve(new CustomResponse({
                        code: CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {},
                        message: FailureHelper.mapFailureToMessage(failure)
                    }));
                });
            });
            converterResult.leftMap((failure) => {
               resolve(new CustomResponse({
                   code: CodeHelper.failureToCode(failure),
                   codeStatus: 400,
                   result: {},
                   message: FailureHelper.mapFailureToMessage(failure)
               }));
            });
        });
    }

}