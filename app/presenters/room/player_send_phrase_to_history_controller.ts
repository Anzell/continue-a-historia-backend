import {SocketController} from "../../main/protocols/controller";
import {CustomMessage} from "../../main/protocols/custom_message";
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

export class PlayerSendPhraseToHistoryController implements SocketController {
    constructor (
        private readonly playerSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase,
        private readonly playerSendPhraseConverter: PlayerSendPhraseToHistoryConverter,
        private readonly getRoomByIdUsecase: GetRoomByIdUsecase
    ) {}

    async handle (request: any): Promise<CustomMessage> {
        let serverResponse = new CustomMessage({
            type: TypeSocketMessages.error,
            content: {}
        });
        await new Promise((resolve) => {
            const converterResult = this.playerSendPhraseConverter.handle(new PlayerSendPhraseToHistoryConverterParams({
                phrase: request['phrase'],
                roomId: request['roomId'],
                userId: request['userId']
            }));
            converterResult.leftMap((failure: Failure) => {
               serverResponse = new CustomMessage({
                  type: TypeSocketMessages.error,
                  content: FailureHelper.mapFailureToMessage(failure)
               });
               resolve(true);
            });
            converterResult.map(async (convertedRequest) => {
                const roomResult = await this.getRoomByIdUsecase.handle(new GetRoomByIdUsecaseParams({id: convertedRequest.roomId}));
                roomResult.leftMap((failure: Failure) => {
                    serverResponse = new CustomMessage({
                       type: TypeSocketMessages.error,
                       content: FailureHelper.mapFailureToMessage(failure)
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
                        serverResponse = new CustomMessage({
                           type: TypeSocketMessages.error,
                           content: FailureHelper.mapFailureToMessage(failure)
                        });
                        resolve(true);
                    });
                    sendPhraseResult.map((_) => {
                       serverResponse = new CustomMessage({
                           type: TypeSocketMessages.sendPhraseToHistory,
                           content: {}
                       }) ;
                    });
                });
            });
        });
        return serverResponse;
    }

}