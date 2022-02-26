"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const game_room_1 = require("../../domain/entities/game_room");
const create_room_controller_1 = require("./create_room_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
describe("create room controller", () => {
    const requestExample = {
        "name": "Sala de testes",
        "adminsIds": ["admin1"]
    };
    const roomExample = new game_room_1.GameRoom({
        name: "Era uma vez",
        adminsIds: ["admin1"]
    });
    it("deve registrar uma sala corretamente e retornar um custom response status 200", async () => {
        const mockCreateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const mockRoomConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomExample))
        };
        const controller = new create_room_controller_1.CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(requestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            message: success_messages_1.SuccessMessages.operationSuccess,
            result: {}
        }));
    });
    it('deve retornar status 400 caso converter falhe', async function () {
        const mockCreateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const mockRoomConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: "erro" })))
        };
        const controller = new create_room_controller_1.CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(requestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: "erro",
            result: {}
        }));
    });
    it('deve retornar status 400 caso usecase falhe', async function () {
        const mockCreateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const mockRoomConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomExample))
        };
        const controller = new create_room_controller_1.CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(requestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure,
            result: {}
        }));
    });
});
