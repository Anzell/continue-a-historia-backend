import { Controller } from "../../main/protocols/controller";
import {
    PlayerEnterInRoomUsecase,
    PlayerEnterInRoomUsecaseParams
} from "../../domain/usecases/room/player_enter_in_room";
import {
    PlayerEnterInRoomConverter,
    PlayerEnterInRoomConverterParams
} from "./converters/player_enter_in_room_converter";
import { Failure } from "../../core/failures/failures";
import { FailureHelper } from "../../core/helper/failure_mapper";
import { CustomResponse } from "../../main/protocols/custom_response";
import { ServerCodes } from "../../core/constants/messages/server_codes";
import { SuccessMessages } from "../../core/constants/messages/success_messages";
import { CodeHelper } from "../../core/helper/code_helper";
import { GetUserByUsernameConverter } from "../user/converters/get_user_by_username_converter";
import { GetUserByUsernameUsecase } from "../../domain/usecases/user/get_user_by_username";

export class PlayerEnterInRoomController implements Controller {

    constructor(private readonly insertPlayerInRoomUsecase: PlayerEnterInRoomUsecase, private readonly insertPlayerConverter: PlayerEnterInRoomConverter, private readonly getUserByUsernameConverter: GetUserByUsernameConverter, getUserByUsernameUsecase: GetUserByUsernameUsecase,) { }

    async handle(request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            codeStatus: 400,
            message: "Erro no servidor",
            code: ServerCodes.serverFailure,
            result: {}
        });
        await new Promise((resolve) => {
            const converter = this.insertPlayerConverter.handle(new PlayerEnterInRoomConverterParams({
                userId: request['userId'],
                roomId: request['roomId'],
            }));
            converter.map(async (data) => {
                const result = await this.insertPlayerInRoomUsecase.handle(new PlayerEnterInRoomUsecaseParams({
                    roomId: data.roomId,
                    userId: data.userId,
                }));
                result.map((_: any) => {
                    serverResponse = new CustomResponse({
                        codeStatus: 200,
                        code: ServerCodes.success,
                        message: SuccessMessages.operationSuccess,
                        result: {}
                    });
                    resolve(true);
                });
                result.leftMap((failure: Failure) => {
                    serverResponse = new CustomResponse({
                        message: FailureHelper.mapFailureToMessage(failure),
                        code: CodeHelper.failureToCode(failure),
                        codeStatus: 400,
                        result: {}
                    });
                    resolve(false);
                });
            });
            converter.leftMap((failure) => {
                serverResponse = new CustomResponse({
                    codeStatus: 400,
                    code: CodeHelper.failureToCode(failure),
                    message: FailureHelper.mapFailureToMessage(failure),
                    result: {},
                });
                resolve(false);
            });
        });

        return serverResponse;
    }
}