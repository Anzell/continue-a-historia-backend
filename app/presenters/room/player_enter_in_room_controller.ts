import {Controller} from "../../main/protocols/controller";
import {
    PlayerEnterInRoomUsecase,
    PlayerEnterInRoomUsecaseParams
} from "../../domain/usecases/room/player_enter_in_room";
import {
    PlayerEnterInRoomConverter,
    PlayerEnterInRoomConverterParams
} from "./converters/player_enter_in_room_converter";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";

export class PlayerEnterInRoomController implements Controller {

    constructor (private readonly insertPlayerInRoomUsecase: PlayerEnterInRoomUsecase, private readonly insertPlayerConverter: PlayerEnterInRoomConverter) {}

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            codeStatus: 400
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