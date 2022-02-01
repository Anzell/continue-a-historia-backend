import { GameRoom } from "../../../domain/entities/game_room";
import {Db} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {GameRoomMapper} from "../../mappers/game_room_mapper";
import {DateHelper} from "../../../core/helper/date_helper";
import {NotFoundException} from "../../../core/failures/exceptions";
import {GameRoomModel} from "../../models/game_room";

export interface RoomRemoteDs {
    createRoom: (room: GameRoom) => Promise<void>;
    insertPlayer: ({roomId, userId}: {roomId: string, userId: string}) => Promise<void>;
}

export class RoomRemoteDsImpl implements RoomRemoteDs {

    constructor (private readonly db: Db, private readonly stringHelper: StringHelper) {}

    async insertPlayer ({roomId, userId}: { roomId: string; userId: string }): Promise<void> {
        const roomDocument = await this.db.collection(DbCollections.rooms).findOne({id: roomId});
        console.log(roomDocument)
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

}