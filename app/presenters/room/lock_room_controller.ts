import {Controller} from "../../main/protocols/controller";
import {LockRoomConverter} from "./converters/lock_room_converter";
import {GetRoomByIdUsecase, GetRoomByIdUsecaseParams} from "../../domain/usecases/room/get_room_by_id";
import {UpdateRoomUseCase, UpdateRoomUseCaseParams} from "../../domain/usecases/room/update_room";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {GameRoom} from "../../domain/entities/game_room";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CodeHelper} from "../../core/helper/code_helper";
import {FailureHelper} from "../../core/helper/failure_mapper";

export class LockRoomController implements Controller {

    readonly converter: LockRoomConverter;
    readonly getRoombyIdUsecase: GetRoomByIdUsecase;
    readonly updateRoomUsecase: UpdateRoomUseCase;

    constructor ({converter, getRoombyIdUsecase, updateRoomUsecase}: {converter: LockRoomConverter, getRoombyIdUsecase: GetRoomByIdUsecase, updateRoomUsecase: UpdateRoomUseCase}) {
        this.converter = converter;
        this.updateRoomUsecase = updateRoomUsecase;
        this.getRoombyIdUsecase = getRoombyIdUsecase;
    }

    async handle (request: any): Promise<CustomResponse> {
        return await new Promise<CustomResponse>(async (resolve) => {
            const converterResult = await this.converter.handle(request);
            converterResult.map(async (convertedRequest) => {
                const getRoomByIdResult = await this.getRoombyIdUsecase.handle(new GetRoomByIdUsecaseParams({id: convertedRequest.roomId}));
                getRoomByIdResult.map(async (roomData: GameRoom) => {
                    const updateData = new GameRoom({
                        id: roomData.id,
                        name: roomData.name!,
                        adminsIds: roomData.adminsIds!,
                        playersIds: roomData.playersIds,
                        history: roomData.history,
                        createdAt: roomData.createdAt,
                        someoneIsTapping: convertedRequest.lock,
                        lastTappedId: convertedRequest.userId,
                    });
                    const resultUpdateRoomUsecase = await this.updateRoomUsecase.handle(new UpdateRoomUseCaseParams({room: updateData}));
                    resultUpdateRoomUsecase.map((_) => {
                       resolve(new CustomResponse({
                           code: ServerCodes.success,
                           codeStatus: 200,
                           message: SuccessMessages.operationSuccess,
                           result: {}
                       }));
                    });
                    resultUpdateRoomUsecase.leftMap((failure) => {
                        resolve(new CustomResponse({
                            code: CodeHelper.failureToCode(failure),
                            codeStatus: 400,
                            result: {},
                            message: FailureHelper.mapFailureToMessage(failure)
                        }));
                    });
                });
                getRoomByIdResult.leftMap((failure) => {
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