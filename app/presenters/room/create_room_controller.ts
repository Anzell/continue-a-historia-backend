import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {GameRoomConverter, GameRoomConverterParams} from "./converters/game_room_converter";
import {Failure, ValidationFailure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CreateRoomUsecase} from "../../domain/usecases/room/create_room";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {CodeHelper} from "../../core/helper/code_helper";

export class CreateRoomController implements Controller {
    constructor (private readonly createRoomUsecase: CreateRoomUsecase, private readonly gameRoomConverter: GameRoomConverter) {}

    async handle (request: any): Promise<CustomResponse> {
        return await new Promise<CustomResponse>((resolve) => {
            const converter = this.gameRoomConverter.handle(new GameRoomConverterParams({
                name: request['name'],
                adminsIds: request['adminsIds'],
                playersIds: request['playersIds']
            }));
            converter.map(async (room) => {
                const result = await this.createRoomUsecase.handle({room});
                result.map((_: any) => {
                    resolve(new CustomResponse({
                        codeStatus: 200,
                        message: SuccessMessages.operationSuccess,
                        code: ServerCodes.success,
                        result: {}
                    }));
                });
                result.leftMap((failure: Failure)=>{
                    resolve(new CustomResponse({
                        codeStatus: 400,
                        message: FailureHelper.mapFailureToMessage(failure),
                        code: CodeHelper.failureToCode(failure),
                        result: {}
                    }));
                });
            });
            converter.leftMap((failure) => {
                resolve(new CustomResponse({
                    codeStatus: 400,
                    message: (failure as ValidationFailure).message!,
                    code: CodeHelper.failureToCode(failure),
                    result: {}
                }));
            });
        });
    }

}