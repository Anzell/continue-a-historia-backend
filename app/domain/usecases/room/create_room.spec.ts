import { left, right } from "either-ts";
import { ServerFailure } from "../../../core/failures/failures";
import { GameRoom } from "../../entities/game_room";
import { Phrase } from "../../entities/phrase";
import {CreateRoomUsecase, CreateRoomUsecaseImpl, CreateRoomUsecaseParams} from "./create_room";


jest.mock("../../repositories/room_repository");

describe("teste de usecase", () => {

    const exampleRoom = new GameRoom({
        adminsIds:["admin1"],
        name: "roomName",
        history: [
            new Phrase({
                phrase: "Era uma vez",
                senderId: "admin1",
                sendAt: new Date()
            })
        ],
        id: "validId",
        playersIds:[],
        createdAt: new Date()
    });
    
    it("deve retornar right void caso chamada ao repository der sucesso", async () => {
        const mockRoomRepository: any = {
            createRoom: jest.fn().mockReturnValue(right(null)),
        };
        let usecase: CreateRoomUsecase = new CreateRoomUsecaseImpl(mockRoomRepository);
      let result = await usecase.handle(new CreateRoomUsecaseParams({room: exampleRoom}));
      expect(result).toStrictEqual(right(null));
    });

    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockRoomRepository: any = {
            createRoom: jest.fn().mockReturnValue(left(new ServerFailure())),
        };
        let usecase: CreateRoomUsecase = new CreateRoomUsecaseImpl(mockRoomRepository);
      let result = await usecase.handle(new CreateRoomUsecaseParams({room: exampleRoom}));
      expect(result).toStrictEqual(left(new ServerFailure()));
    });
});