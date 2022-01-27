import { GameRoom } from "../../../domain/entities/game_room";
import {Db} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {GameRoomMapper} from "../../mappers/game_room_mapper";
import {DateHelper} from "../../../core/helper/date_helper";

export interface RoomRemoteDs {
    createRoom: (room: GameRoom) => Promise<void>;
}

export class RoomRemoteDsImpl implements RoomRemoteDs {
    constructor (private readonly db: Db, private readonly stringHelper: StringHelper) {
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