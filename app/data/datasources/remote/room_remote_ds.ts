import { GameRoom } from "../../../domain/entities/game_room";
import {Db} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {GameRoomMapper} from "../../mappers/game_room_mapper";
import {DateHelper} from "../../../core/helper/date_helper";
import {NotFoundException, PlayerDontExistsInRoomException} from "../../../core/failures/exceptions";
import {GameRoomModel} from "../../models/game_room";
import {PhraseModel} from "../../models/phrase_model";

export interface RoomRemoteDs {
    createRoom: (room: GameRoom) => Promise<void>;
    insertPlayer: ({roomId, userId}: {roomId: string, userId: string}) => Promise<void>;
    sendPhrase: ({userId, roomId, phrase}: {userId: string, roomId: string, phrase: string}) => Promise<GameRoom>;
    getRoomById: ({id}: {id: string}) => Promise<GameRoom>;
}

export class RoomRemoteDsImpl implements RoomRemoteDs {

    constructor (private readonly db: Db, private readonly stringHelper: StringHelper) {}

    async insertPlayer ({roomId, userId}: { roomId: string; userId: string }): Promise<void> {
        const roomDocument = await this.db.collection(DbCollections.rooms).findOne({id: roomId});
        if(roomDocument === null){
            throw new NotFoundException();
        }

        const roomModel = GameRoomModel.fromJson(roomDocument);
        if(roomModel.playersIds !== undefined && roomModel.playersIds?.length > 0){
            roomModel.playersIds.push(userId);
        }else {
            roomModel.playersIds = [userId];
        }
        await this.db.collection(DbCollections.rooms).updateOne({"id": roomId},{$set: {
            ...roomModel.toJson()
        }}, {upsert: true});
    }

    async createRoom (room: GameRoom): Promise<void> {
        const id = this.stringHelper.generateUuid();
        await this.db.collection(DbCollections.rooms).insertOne({
            ...GameRoomMapper.entityToModel(room).toJson(),
            "id": id,
            "createdAt": DateHelper.dateToNumber(new Date())
        });
    }

    async sendPhrase ({userId, roomId, phrase}: { userId: string; roomId: string; phrase: string }): Promise<GameRoom> {
        const roomDocument = await this.db.collection(DbCollections.rooms).findOne({id: roomId});
        if(roomDocument === null){
            throw new NotFoundException();
        }
        const roomModel = GameRoomModel.fromJson(roomDocument);
        if(!roomModel.playersIds?.some((player) => userId === player) && !roomModel.adminsIds?.some((admin) => admin === userId)){
            throw new PlayerDontExistsInRoomException();
        }
        const phraseModel = new PhraseModel({
            sendAt: new Date(),
            senderId: userId,
            phrase: phrase
        });
        roomModel.history?.push(phraseModel);
        await this.db.collection(DbCollections.rooms).findOneAndUpdate({id: roomId}, {$set: {...roomModel.toJson()}});
        return GameRoomMapper.modelToEntity(roomModel);
    }

    async getRoomById ({id}: { id: string }): Promise<GameRoom> {
        const document = await this.db.collection(DbCollections.rooms).findOne({id});
        if(document === null){
            throw new NotFoundException();
        }
        return GameRoomMapper.modelToEntity(GameRoomModel.fromJson(document));
    }

}