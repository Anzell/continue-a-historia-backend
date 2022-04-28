import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class LockRoomConverter implements Converter<{userId: string, roomId: string, lock: boolean}, LockRoomConverterParams>{

    handle (params: LockRoomConverterParams): Either<Failure, { userId: string, roomId: string, lock: boolean }> {
        if(params.userId === undefined || params.userId === ""){
            return left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingUserId}));
        }
        if(params.roomId === undefined || params.roomId === ""){
            return left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingRoomId}));
        }
        if(params.lock === undefined){
            return left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingLockInfo}));
        }
        return right({userId: params.userId!, roomId: params.roomId, lock: params.lock});
    }

}

export class LockRoomConverterParams{
    readonly userId?: string;
    readonly roomId?: string;
    readonly lock?: boolean;

    constructor ({userId, roomId, lock}: {userId?: string, roomId?: string, lock?: boolean}) {
        this.userId = userId;
        this.roomId = roomId;
        this.lock = lock;
    }
}

export class LockRoomConverterErrorMessages{
    static missingUserId: string = "É necessário informar o usuário";
    static missingRoomId: string = "É necessário informar a sala";
    static missingLockInfo: string = "É necessário informar o novo status da sala";
}