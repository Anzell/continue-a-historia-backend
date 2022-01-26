// import { Db } from "mongodb";
// import { DbCollections } from "../../../core/constants/db/db_collections";
// import { DateHelper } from "../../../core/helper/date_helper";
// import { GameRoom } from "../../../domain/entities/game_room";
// import { Phrase } from "../../../domain/entities/phrase";
// import { RoomRemoteDs } from "./room_remote_ds";

// export class RoomRemoteDsImpl implements RoomRemoteDs {
//     constructor(private readonly db: Db){}

//     async createRoom (room: GameRoom): Promise<void>{
        
//     }

// }

// describe("room remote ds", () => {

//     describe("create room", () => {
// const exampleRoom = new GameRoom({
//             adminsIds:["admin1"],
//             name: "roomName",
//             history: [
//                 new Phrase({
//                     phrase: "Era uma vez",
//                     senderId: "admin1",
//                     sendAt: DateHelper.numberToDate(Date.now())
//                 })
//             ],
//             id: "validId",
//             playersIds:[],
//             createdAt: DateHelper.numberToDate(Date.now())
//         });

//         it("deve retornar right null caso chamada ao datasource der sucesso", async () => {
//             const mockRoomDatasource: RoomRemoteDs = {
//                 createRoom: jest.fn().mockReturnValue(null)
//             } as RoomRemoteDs;
//             let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
//           let result = await repository.createRoom(exampleRoom);
//           expect(result).toStrictEqual(right(null));
//         });
//     });
// });