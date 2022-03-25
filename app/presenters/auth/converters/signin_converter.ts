import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class SignInConverter implements Converter<{ email: string, password: string }, SignInConverterParams>{

    handle (params: SignInConverterParams): Either<Failure, { email: string; password: string }> {
        if(params.email == undefined || params.email == ""){
            return left(new ValidationFailure({message: SignInConverterErrorMessages.missingEmail}));
        }
        if(params.password == undefined || params.password == ""){
            return left(new ValidationFailure({message: SignInConverterErrorMessages.missingPassword}));
        }
        return right({
            password: params.password,
            email: params.email
        });
    }

}

export class SignInConverterParams {
    readonly email?: string;
    readonly password?: string;

    constructor ({email, password}: {email?: string, password?: string}) {
        this.email = email;
        this.password = password;
    }
}

export class SignInConverterErrorMessages {
    static missingEmail: string = "Email é necessário";
    static missingPassword: string = "Senha é necessário";

}