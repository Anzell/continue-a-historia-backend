import {Phrase} from "../../../domain/entities/phrase";
import {GameRoom} from "../../../domain/entities/game_room";
import {Converter} from "../../../core/converters/converter";
import {Failure, ValidationFailure} from "../../../core/failures/failures";
import {left, right} from "either-ts";

export class GameRoomConverter implements Converter<GameRoom, GameRoomConverterParams>{
    handle (params: GameRoomConverterParams): Either<Failure, GameRoom> {
        if(params.name == undefined || params.name == ""){
            return left(new ValidationFailure({message: GameRoomConverterErrorMessages.missingName}));
        }
        if(params.adminsIds == undefined || params.adminsIds.length==0){
            return left(new ValidationFailure({message: GameRoomConverterErrorMessages.missingAdmins}));
        }
        return right(new GameRoom({
            id: params.id,
            name: params.name!,
            adminsIds: params.adminsIds!,
            history: params.history,
             createdAt: params.createdAt,
            playersIds: params.playersIds
        }));
    }

}

export class GameRoomConverterParams {
    public id?: string;
    public name?: string;
    public adminsIds?: Array<string>;
    public playersIds?: Array<string>;
    public history?: Array<Phrase>;
    public createdAt?: Date;

    constructor({ id, name, adminsIds, playersIds, history, createdAt }: {
        id?: string,
        name?: string,
        adminsIds?: Array<string>,
        playersIds?: Array<string>,
        history?: Array<Phrase>,
        createdAt?: Date,
    }) {
        this.id = id;
        this.name = name;
        this.adminsIds = adminsIds;
        this.playersIds = playersIds;
        this.history = history;
        this.createdAt = createdAt;
    }
}

export class GameRoomConverterErrorMessages{
    static missingName: string = "É necessário informar o nome da sala";
    static missingAdmins: string = "É necessário informar o(s) administrador(es) da sala";
}