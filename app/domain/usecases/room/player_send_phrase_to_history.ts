import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {Failure} from "../../../core/failures/failures";
import {RoomRepository} from "../../repositories/room_repository";

export abstract class PlayerSendPhraseToHistoryUsecase implements PromiseUsecase<null, PlayerSendPhraseToHistoryUsecaseParams>{
    abstract handle (params: PlayerSendPhraseToHistoryUsecaseParams): Promise<Either<Failure, null>>;
}

export class PlayerSendPhraseToHistoryUsecaseImpl implements PlayerSendPhraseToHistoryUsecase {
    constructor (private readonly repository: RoomRepository) {}

    async handle (params: PlayerSendPhraseToHistoryUsecaseParams): Promise<Either<Failure, null>> {
        return await this.repository.sendPhrase({userId: params.userId, phrase: params.phrase, roomId: params.roomId});
    }
}

export class PlayerSendPhraseToHistoryUsecaseParams {
    readonly roomId: string;
    readonly userId: string;
    readonly phrase: string;

    constructor ({roomId, userId, phrase}: {roomId: string, userId: string, phrase: string}) {
        this.phrase = phrase;
        this.userId = userId;
        this.roomId = roomId;
    }
}
