import {SocketController} from "../../main/protocols/controller";
import {CustomMessage} from "../../main/protocols/custom_message";
import {PlayerSendPhraseToHistoryUsecase} from "../../domain/usecases/room/player_send_phrase_to_history";
import {PlayerSendPhraseToHistoryConverter} from "./converters/player_send_phrase_to_history_converter";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";

export class PlayerSendPhraseToHistoryController implements SocketController {
    constructor (
        private readonly playerSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase,
        private readonly playerSendPhraseConverter: PlayerSendPhraseToHistoryConverter
    ) {}

    async handle (request: any): Promise<CustomMessage> {
        let serverResponse = new CustomMessage({
            type: TypeSocketMessages.error,
            content: {}
        });
        return serverResponse;
    }

}