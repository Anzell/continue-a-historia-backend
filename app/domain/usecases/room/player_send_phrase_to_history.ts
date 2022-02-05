import {PromiseUsecase} from "../../../core/usecases/promise_usecase";
import {Failure} from "../../../core/failures/failures";
import {RoomRepository} from "../../repositories/room_repository";
import {GameRoom} from "../../entities/game_room";

export abstract class PlayerSendPhraseToHistoryUsecase implements PromiseUsecase<GameRoom, PlayerSendPhraseToHistoryUsecaseParams>{
    abstract handle (params: PlayerSendPhraseToHistoryUsecaseParams): Promise<Either<Failure, GameRoom>>;
}

export class PlayerSendPhraseToHistoryUsecaseImpl implements PlayerSendPhraseToHistoryUsecase {
    constructor (private readonly repository: RoomRepository) {}

    async handle (params: PlayerSendPhraseToHistoryUsecaseParams): Promise<Either<Failure, GameRoom>> {
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
