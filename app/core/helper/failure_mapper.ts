import {
    Failure,
    InvalidCredentialsFailure,
    NotFoundFailure,
    ServerFailure,
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
        return ErrorMessages.unknownFailure;
    }
}

