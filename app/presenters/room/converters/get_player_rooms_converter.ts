import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class GetPlayerRoomsConverter implements Converter<{userId: string}, GetPlayerRoomsConverterParams>{

    handle (params: GetPlayerRoomsConverterParams): Either<Failure, { userId: string }> {
        if(params.userId === undefined || params.userId === ""){
            return left(new ValidationFailure({message: GetPlayerRoomsConverterErrorMessages.missingId}));
        }
        return right({userId: params.userId!});
    }

}

export class GetPlayerRoomsConverterParams{
    readonly userId?: string;

    constructor ({userId}: {userId?: string}) {
        this.userId = userId;
    }
}

export class GetPlayerRoomsConverterErrorMessages{
    static missingId: string = "É necessário informar o usuário";
}