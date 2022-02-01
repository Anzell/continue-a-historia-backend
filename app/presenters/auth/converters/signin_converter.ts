import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class SignInConverter implements Converter<{ username: string, password: string }, SignInConverterParams>{

    handle (params: SignInConverterParams): Either<Failure, { username: string; password: string }> {
        if(params.username == undefined || params.username == ""){
            return left(new ValidationFailure({message: SignInConverterErrorMessages.missingUsername}));
        }
        if(params.password == undefined || params.password == ""){
            return left(new ValidationFailure({message: SignInConverterErrorMessages.missingPassword}));
        }
        return right({
            password: params.password,
            username: params.username
        });
    }

}

export class SignInConverterParams {
    readonly username?: string;
    readonly password?: string;

    constructor ({username, password}: {username?: string, password?: string}) {
        this.username = username;
        this.password = password;
    }
}

export class SignInConverterErrorMessages {
    static missingUsername: string = "Username é necessário";
    static missingPassword: string = "Senha é necessário";

}