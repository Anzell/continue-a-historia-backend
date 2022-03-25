
import {
    PlayerSendPhraseToHistoryUsecase,
    PlayerSendPhraseToHistoryUsecaseParams
} from "../../domain/usecases/room/player_send_phrase_to_history";
import {
    PlayerSendPhraseToHistoryConverter,
    PlayerSendPhraseToHistoryConverterParams
} from "./converters/player_send_phrase_to_history_converter";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {GetRoomByIdUsecase, GetRoomByIdUsecaseParams} from "../../domain/usecases/room/get_room_by_id";
import {Failure} from "../../core/failures/failures";
import {FailureHelper} from "../../core/helper/failure_mapper";
import {GameRoom} from "../../domain/entities/game_room";
import {GameRoomMapper} from "../../data/mappers/game_room_mapper";
import {Controller} from "../../main/protocols/controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {ErrorMessages} from "../../core/constants/messages/error_messages";
import {CodeHelper} from "../../core/helper/code_helper";
import {SuccessMessages} from "../../core/constants/messages/success_messages";

export class PlayerSendPhraseToHistoryController implements Controller {
    constructor (
        private readonly playerSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase,
        private readonly playerSendPhraseConverter: PlayerSendPhraseToHistoryConverter,
        private readonly getRoomByIdUsecase: GetRoomByIdUsecase
    ) {}

    async handle (request: any): Promise<CustomResponse> {
        let serverResponse = new CustomResponse({
            codeStatus: 400,
            code: ServerCodes.serverFailure,
            message: ErrorMessages.serverFailure,
            result: {}
        });
        await new Promise((resolve) => {
            const converterResult = this.playerSendPhraseConverter.handle(new PlayerSendPhraseToHistoryConverterParams({
                phrase: request['phrase'],
                roomId: request['roomId'],
                userId: request['userId']
            }));
            converterResult.leftMap((failure: Failure) => {
               serverResponse = new CustomResponse({
                  codeStatus: 400,
                   code: CodeHelper.failureToCode(failure),
                  message: FailureHelper.mapFailureToMessage(failure),
                   result: {}
               });
               resolve(true);
            });
            converterResult.map(async (convertedRequest) => {
                const roomResult = await this.getRoomByIdUsecase.handle(new GetRoomByIdUsecaseParams({id: convertedRequest.roomId}));
                roomResult.leftMap((failure: Failure) => {
                    serverResponse = new CustomResponse({
                       code: CodeHelper.failureToCode(failure),
                        result: {},
                        codeStatus: 400,
                       message: FailureHelper.mapFailureToMessage(failure)
                    });
                    resolve(true);
                });
                roomResult.map(async (room: GameRoom) => {
                    const sendPhraseResult = await this.playerSendPhraseUsecase.handle(new PlayerSendPhraseToHistoryUsecaseParams({
                        roomId: convertedRequest.roomId,
                        phrase: convertedRequest.phrase,
                        userId: convertedRequest.userId
                    }));
                    sendPhraseResult.leftMap((failure: Failure) => {
                        serverResponse = new CustomResponse({
                          result: {},
                            code: CodeHelper.failureToCode(failure),
                            codeStatus: 400,
                           message: FailureHelper.mapFailureToMessage(failure)
                        });
                        resolve(true);
                    });
                    sendPhraseResult.map((updatedRoom: GameRoom) => {
                       serverResponse = new CustomResponse({
                               message: SuccessMessages.operationSuccess,
                           code: ServerCodes.success,
                           codeStatus: 200,
                               result: GameRoomMapper.entityToModel(updatedRoom).toJson()
                           }
                       ) ;
                       resolve(true);
                    });
                });
            });
        });
        return serverResponse;
    }

}