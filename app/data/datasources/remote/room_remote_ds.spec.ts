import {Db, MongoClient} from "mongodb";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {GameRoom} from "../../../domain/entities/game_room";
import {Phrase} from "../../../domain/entities/phrase";
import {RoomRemoteDs, RoomRemoteDsImpl} from "./room_remote_ds";
import {StringHelper} from "../../../core/helper/string_helper";
import {GameRoomMapper} from "../../mappers/game_room_mapper";
import {GameRoomModel} from "../../models/game_room";

describe("room remote ds", () => {
    let db: Db;

    beforeEach(async ()=>{
        let connection = await MongoClient.connect(process.env["MONGO_URL"]!);
        db = await connection.db();
    });

    describe("create room", () => {
        const exampleRoom = new GameRoom({
            adminsIds: ["admin1"],
            name: "roomName",
            history: [
                new Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: new Date(2021,10,10)
                })
            ],
            id: "validId",
            playersIds: [],
            createdAt: new Date(2021,10,10)
        });

        it("deve registrar a sala normalmente", async () => {
            const mockStringHelper: StringHelper = {
                generateUuid: jest.fn().mockReturnValue("validId")
            } as StringHelper;
            let datasource: RoomRemoteDs = new RoomRemoteDsImpl(db, mockStringHelper);
            await datasource.createRoom(exampleRoom);
            const result = await db.collection(DbCollections.rooms).findOne({"id": "validId"});
            expect(result).not.toBe(null);
            expect(GameRoomMapper.modelToEntity(GameRoomModel.fromJson(result))).toBeInstanceOf(GameRoom);
        });
    });
});