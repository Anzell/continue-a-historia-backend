import {Converter} from "../../../core/converters/converter";
import {left, right} from "either-ts";
import { Failure, ValidationFailure } from "../../../core/failures/failures";

export class GetUserByUsernameConverter implements Converter<{ username: string }, GetUserByUsernameConverterParams> {

    handle (params: GetUserByUsernameConverterParams): Either<Failure, { username: string }> {
        if(params.username === undefined || params.username === ""){
            return left(new ValidationFailure({message: GetUserByUsernameConverterErrorMessages.missingUsername}));
        }
        return right({username: params.username});
    }

}

export class GetUserByUsernameConverterParams {
    public username?: string;

    constructor ({username}: {username?: string}) {
        this.username = username;
    }
}

export class GetUserByUsernameConverterErrorMessages {
    static missingUsername: string = "É necessário informar o usuário";
}