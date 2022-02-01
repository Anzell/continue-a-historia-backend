import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class PlayerEnterInRoomConverter implements Converter<{
    userId: string,
    roomId: string
}, PlayerEnterInRoomConverterParams>{

    handle (params: PlayerEnterInRoomConverterParams): Either<Failure, { userId: string; roomId: string }> {
        if(params.roomId === undefined || params.roomId === ""){
            return left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingRoomId}));
        }
        if(params.userId === undefined || params.userId === ""){
            return left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingUserId}));
        }
        return right({
            userId: params.userId,
            roomId: params.roomId,
        });
    }
}

export class PlayerEnterInRoomConverterParams {
    readonly userId?: string;
    readonly roomId?: string;

    constructor ({userId, roomId}: { userId?: string, roomId?: string }) {
        this.roomId = roomId;
        this.userId = userId;
    }
}

export class PlayerEnterInRoomConverterErrorMessages {
    static missingUserId: string = "É necessário informar um jogador";
    static missingRoomId: string = "É necessário informar uma sala";
}