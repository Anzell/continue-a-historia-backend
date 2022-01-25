import { left, right } from "either-ts";
import { ServerException } from "../../core/failures/exceptions";
import { ServerFailure } from "../../core/failures/failures";
import { GameRoom } from "../../domain/entities/game_room";
import { Phrase } from "../../domain/entities/phrase";
import { RoomRepository } from "../../domain/repositories/room_repository";
import { RoomRemoteDs } from "../datasources/remote/room_remote_ds";
import { RoomRepositoryImpl } from "./room_repository_impl";

describe("teste de room repository impl", () => {
    

    describe("create room", () => {
        const exampleRoom = new GameRoom({
            adminsIds:["admin1"],
            name: "roomName",
            history: [
                new Phrase({
                    phrase: "Era uma vez",
                    senderId: "admin1",
                    sendAt: Date.now()
                })
            ],
            id: "validId",
            playersIds:[],
            createdAt: Date.now()
        });

        it("deve retornar right null caso chamada ao datasource der sucesso", async () => {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn().mockReturnValue(null)
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
          let result = await repository.createRoom(exampleRoom);
          expect(result).toStrictEqual(right(null));
        });
    
        it("deve retornar left failure caso chamada ao repository der erro", async () => {
            const mockRoomDatasource: RoomRemoteDs = {
                createRoom: jest.fn().mockRejectedValue(new ServerException())
            } as RoomRemoteDs;
            let repository: RoomRepository = new RoomRepositoryImpl(mockRoomDatasource);
          let result = await repository.createRoom(exampleRoom);
          expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });
    
   
});