import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class GetRoomByIdConverter implements Converter<{roomId: string}, GetRoomByIdConverterParams>{

    handle (params: GetRoomByIdConverterParams): Either<Failure, { roomId: string }> {
        if(params.roomId === undefined || params.roomId === ""){
            return left(new ValidationFailure({message: GetRoomByIdConverterErrorMessages.missingId}));
        }
        return right({roomId: params.roomId!});
    }

}

export class GetRoomByIdConverterParams{
    readonly roomId?: string;

    constructor ({roomId}: {roomId?: string}) {
        this.roomId = roomId;
    }
}

export class GetRoomByIdConverterErrorMessages{
    static missingId: string = "É necessário informar a sala";
}