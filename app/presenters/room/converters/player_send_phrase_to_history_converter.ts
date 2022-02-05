import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class PlayerSendPhraseToHistoryConverter implements Converter<{
    phrase: string,
    roomId: string,
    userId: string
}, PlayerSendPhraseToHistoryConverterParams>{

    handle (params: PlayerSendPhraseToHistoryConverterParams): Either<Failure, { phrase: string; roomId: string; userId: string }> {
        if(params.phrase === undefined || params.phrase === ""){
            return left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingPhrase}));
        }
        if(params.roomId === undefined || params.roomId === ""){
            return left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingRoom}));
        }
        if(params.userId === undefined || params.userId === ""){
            return left(new ValidationFailure({message: PlayerSendPhraseToHistoryConverterErrorMessages.missingUser}));
        }
        return right({
            phrase: params.phrase!,
            roomId: params.roomId!,
            userId: params.userId!
        })
    }

}

export class PlayerSendPhraseToHistoryConverterParams {
    readonly phrase?: string;
    readonly roomId?: string;
    readonly userId?: string;

    constructor ({phrase, roomId, userId}: {phrase?: string, roomId?: string, userId?: string}) {
        this.phrase = phrase;
        this.userId = userId;
        this.roomId = roomId;
    }
}

export class PlayerSendPhraseToHistoryConverterErrorMessages {
    static missingPhrase: string = "É necessário informar a frase";
    static missingRoom: string = "É necessário informar a sala";
    static missingUser: string = "É necessário informar o jogador";

}