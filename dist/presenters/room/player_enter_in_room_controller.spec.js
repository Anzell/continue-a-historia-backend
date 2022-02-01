"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const player_enter_in_room_controller_1 = require("./player_enter_in_room_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const create_room_controller_1 = require("./create_room_controller");
const error_messages_1 = require("../../core/constants/messages/error_messages");
describe('player enter in room controller', function () {
    const request = { userId: "validId", roomId: "validId" };
    it('should return a valid custom response with status code 200', async function () {
        const mockUseCase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                userId: "validId",
                roomId: "validId"
            }))
        };
        const controller = new player_enter_in_room_controller_1.PlayerEnterInRoomController(mockUseCase, mockConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            result: {},
            message: success_messages_1.SuccessMessages.operationSuccess
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
        const result = await controller.handle(request);
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
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                userId: "validId",
                roomId: "validId"
            }))
        };
        const controller = new create_room_controller_1.CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure,
            result: {}
        }));
    });
});
