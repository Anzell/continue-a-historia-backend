import {
    EmailAlreadyExistFailure,
    Failure,
    InvalidCredentialsFailure,
    NotFoundFailure,
    ServerFailure, UsernameAlreadyExistFailure,
    ValidationFailure
} from "../failures/failures";
import {ServerCodes} from "../constants/messages/server_codes";

export class CodeHelper{
    static failureToCode(failure: Failure): string {
        if(failure instanceof  ServerFailure){
            return ServerCodes.serverFailure;
        }
        if(failure instanceof  ValidationFailure){
            return ServerCodes.validationError;
        }
        if(failure instanceof InvalidCredentialsFailure){
            return ServerCodes.invalidCredentials;
        }
        if(failure instanceof NotFoundFailure){
            return ServerCodes.serverFailure;
        }
        if(failure instanceof UsernameAlreadyExistFailure){
            return ServerCodes.usernameAlreadyRegistered;
        }
        if(failure instanceof EmailAlreadyExistFailure){
            return ServerCodes.emailAlreadyRegistered;
        }
        return ServerCodes.unknownError;
    }
}