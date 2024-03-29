import {
    EmailAlreadyExistFailure,
    Failure,
    InvalidCredentialsFailure,
    NotFoundFailure, PlayerNotFoundFailure,
    ServerFailure, UsernameAlreadyExistFailure,
    ValidationFailure
} from "../failures/failures";
import {ErrorMessages} from "../constants/messages/error_messages";

export class FailureHelper{
    static mapFailureToMessage(failure: Failure): string {
        if(failure instanceof  ServerFailure){
            return ErrorMessages.serverFailure;
        }
        if(failure instanceof  ValidationFailure){
            return (failure as ValidationFailure).message;
        }
        if(failure instanceof InvalidCredentialsFailure){
            return ErrorMessages.invalidCredentials;
        }
        if(failure instanceof NotFoundFailure){
            return ErrorMessages.notFound;
        }
        if(failure instanceof UsernameAlreadyExistFailure){
            return ErrorMessages.usernameAlreadyexists;
        }
        if(failure instanceof EmailAlreadyExistFailure){
            return ErrorMessages.emailAlreadyexists;
        }
        if(failure instanceof  PlayerNotFoundFailure){
            return ErrorMessages.playerNotFound;
        }
        return ErrorMessages.unknownFailure;
    }
}

