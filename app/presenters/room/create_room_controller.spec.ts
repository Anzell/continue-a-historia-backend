
import {right} from "either-ts";
import {CreateRoomUsecase} from "../../domain/usecases/room/create_room";
import {GameRoomConverter} from "./converters/game_room_converter";
import {GameRoom} from "../../domain/entities/game_room";
import {CreateRoomController} from "./create_room_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SuccessMessages} from "../../core/constants/messages/success_messages";

describe("create room controller", () => {
    const requestExample = {
      "name": "Sala de testes",
      "adminsIds": ["admin1"]
    };
    const roomExample = new GameRoom({
       name: "Era uma vez",
       adminsIds: ["admin1"]
    });

    it("deve registrar uma sala corretamente e retornar um custom response status 200", async () => {
        const mockCreateRoomUsecase: CreateRoomUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockRoomConverter: GameRoomConverter = {
            handle: jest.fn().mockReturnValue(right(roomExample))
        };
        const controller = new CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(requestExample);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 200,
            message: SuccessMessages.operationSuccess,
            result: {}
        }));
    });
});