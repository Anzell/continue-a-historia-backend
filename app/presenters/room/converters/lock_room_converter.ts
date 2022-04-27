import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class LockRoomConverter implements Converter<{userId: string, roomId: string}, LockRoomConverterParams>{

    handle (params: LockRoomConverterParams): Either<Failure, { userId: string, roomId: string }> {
        if(params.userId === undefined || params.userId === ""){
            return left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingUserId}));
        }
        if(params.roomId === undefined || params.roomId === ""){
            return left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingRoomId}));
        }
        return right({userId: params.userId!, roomId: params.roomId});
    }

}

export class LockRoomConverterParams{
    readonly userId?: string;
    readonly roomId?: string;

    constructor ({userId, roomId}: {userId?: string, roomId?: string}) {
        this.userId = userId;
        this.roomId = roomId;
    }
}

export class LockRoomConverterErrorMessages{
    static missingUserId: string = "É necessário informar o usuário";
    static missingRoomId: string = "É necessário informar a sala";
}