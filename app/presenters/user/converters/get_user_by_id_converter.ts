import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class GetUserByIdConverter implements Converter<{ id: string }, GetUserByIdConverterParams> {

    handle (params: GetUserByIdConverterParams): Either<Failure, { id: string }> {
        if(params.id === undefined || params.id === ""){
            return left(new ValidationFailure({message: GetUserByIdConverterErrorMessages.missingId}));
        }
        return right({id: params.id});
    }

}

export class GetUserByIdConverterParams {
    public id?: string;

    constructor ({id}: {id?: string}) {
        this.id = id;
    }
}

export class GetUserByIdConverterErrorMessages {
    static missingId: string = "É necessário informar o usuário";
}