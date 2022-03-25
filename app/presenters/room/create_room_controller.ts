import {HttpController} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {GameRoomConverter, GameRoomConverterParams} from "./converters/game_room_converter";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CreateRoomUsecase} from "../../domain/usecases/room/create_room";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {CodeHelper} from "../../core/helper/code_helper";

export class CreateRoomController implements HttpController{
    constructor (private readonly createRoomUsecase: CreateRoomUsecase, private readonly gameRoomConverter: GameRoomConverter) {}

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            result: {},
            message: "Erro no servidor",
            code: ServerCodes.serverFailure,
            codeStatus: 400
        });
        await new Promise((resolve) => {
            const converter = this.gameRoomConverter.handle(new GameRoomConverterParams({
                name: request['name'],
                adminsIds: request['adminsIds'],
                playersIds: request['playersIds']
            }));
            converter.map(async (room) => {
                const result = await this.createRoomUsecase.handle({room});
                result.map((_: any) => {
                    serverResponse = new CustomResponse({
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
                        code: ServerCodes.success,
                        result: {}
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
                    code: CodeHelper.failureToCode(failure),
                    result: {}
                });
                resolve(false);
            });
        });

        return serverResponse;
    }

}