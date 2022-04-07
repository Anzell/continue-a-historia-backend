import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CodeHelper} from "../../core/helper/code_helper";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {GetRoomByIdConverter, GetRoomByIdConverterParams} from "./converters/get_room_by_id_converter";
import {GetRoomByIdUsecase, GetRoomByIdUsecaseParams} from "../../domain/usecases/room/get_room_by_id";

export class GetRoomByIdController implements Controller {
    readonly converter: GetRoomByIdConverter;
    readonly usecase: GetRoomByIdUsecase;

    constructor ({converter, usecase}: {converter: GetRoomByIdConverter, usecase: GetRoomByIdUsecase}) {
        this.usecase = usecase;
        this.converter = converter;
    }

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            codeStatus: 400,
            message: "Erro no servidor",
            code: ServerCodes.serverFailure,
            result: {}
        });
        await new Promise((resolve) => {
            const converterResult = this.converter.handle(new GetRoomByIdConverterParams({roomId: request["roomId"]}));
            converterResult.map(async (convertedRequest) => {
                const usecaseResult = await this.usecase.handle(new GetRoomByIdUsecaseParams({id: convertedRequest.roomId}));
                usecaseResult.map((room) => {
                    serverResponse = new CustomResponse({
                        code: ServerCodes.success,
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
                        result: room
                    });
                    resolve(true);
                });
                usecaseResult.leftMap((failure) => {
                    serverResponse = new CustomResponse({
                        code: CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {},
                        message: FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(true);
                });
            });
            converterResult.leftMap((failure) => {
                serverResponse = new CustomResponse({
                    code: CodeHelper.failureToCode(failure),
                    codeStatus: 400,
                    result: {},
                    message: FailureHelper.mapFailureToMessage(failure)
                });
                resolve(true);
            });
        });
        return serverResponse;
    }

}