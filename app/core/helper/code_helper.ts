import {
    EmailAlreadyExistFailure,
    Failure,
    InvalidCredentialsFailure,
    NotFoundFailure,
    ServerFailure, UsernameAlreadyExistFailure,
    ValidationFailure
} from "../failures/failures";
import {ErrorMessages} from "../constants/messages/error_messages";
import {ServerCodes} from "../constants/messages/server_codes";

export class CodeHelper{
    static failureToCode(failure: Failure): string {
        if(failure instanceof  ServerFailure){
            return ServerCodes.serverFailure;
        }
        if(failure instanceof  ValidationFailure){
            return ServerCodes.validationError+":"+(failure as ValidationFailure).message;
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