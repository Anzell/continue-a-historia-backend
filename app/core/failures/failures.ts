export interface Failure{}

export class ServerFailure implements Failure{}
export class UsernameAlreadyExistFailure implements Failure{}
export class InvalidCredentialsFailure implements Failure{}
export class NotFoundFailure implements Failure{}
export class PlayerDontExistsInRoomFailure implements Failure{}

export class ValidationFailure implements Failure{
    public message: string;
    constructor ({message}:{message:string}) {
        this.message=message;
    }
}