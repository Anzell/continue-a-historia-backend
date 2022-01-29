import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class SignupConverter implements Converter<{
    username: string,
    password: string,
    email: string,
}, SignupConvertersParams>{
    handle (params: SignupConvertersParams): Either<Failure, { username: string; password: string; email: string }> {
        if(params.username == undefined || params.username == ""){
            return left(new ValidationFailure({message: SignupConverterErrorMessages.missingUsername}));
        }
        if(params.email == undefined || params.email == ""){
            return left(new ValidationFailure({message: SignupConverterErrorMessages.missingEmail}));
        }
        if(params.password == undefined || params.password == ""){
            return left(new ValidationFailure({message: SignupConverterErrorMessages.missingPassword}));
        }
        return right({
            username: params.username.toString(),
            email: params.email.toString(),
            password: params.password.toString(),
        });
    }
}

export class SignupConvertersParams {
    username?: any;
    email?: any;
    password?: any;

    constructor ({username, email, password}: {
        username?: any,
        email?: any,
        password?: any,
    }) {
        this.password = password;
        this.email = email;
        this.username = username;
    }
}

export class SignupConverterErrorMessages {
    static missingEmail: string = "Um email é necessario para criar a conta";
    static missingPassword: string = "É necessário prover uma senha para a conta";
    static missingUsername: string = "É necessário prover um nome de usuário para jogar";
}