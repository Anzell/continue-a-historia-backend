"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lock_room_converter_1 = require("./converters/lock_room_converter");
const game_room_1 = require("../../domain/entities/game_room");
const either_ts_1 = require("either-ts");
const lock_room_controller_1 = require("./lock_room_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
describe('lock room controller', function () {
    it('should lock a room sucessfull', async function () {
        const userId = "validId";
        const roomId = "validId";
        const lock = true;
        const roomExample = new game_room_1.GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ userId, roomId, lock }))
        };
        const mockGetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomExample))
        };
        const mockUpdateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const controller = new lock_room_controller_1.LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({ userId, roomId, lock });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.success,
            codeStatus: 200,
            message: success_messages_1.SuccessMessages.operationSuccess,
            result: {}
        }));
    });
    it('should return a codeStatus 400 if call to converter is fail', async function () {
        const userId = "validId";
        const roomId = "validId";
        const lock = true;
        const roomExample = new game_room_1.GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: lock_room_converter_1.LockRoomConverterErrorMessages.missingRoomId })))
        };
        const mockGetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomExample))
        };
        const mockUpdateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const controller = new lock_room_controller_1.LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({ userId, roomId, lock });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.validationError,
            codeStatus: 400,
            message: lock_room_converter_1.LockRoomConverterErrorMessages.missingRoomId,
            result: {}
        }));
    });
    it('should return a codeStatus 400 if call to get room by id usecase is fail', async function () {
        const userId = "validId";
        const roomId = "validId";
        const lock = true;
        const roomExample = new game_room_1.GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ userId, roomId, lock }))
        };
        const mockGetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomExample))
        };
        const mockUpdateRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const controller = new lock_room_controller_1.LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({ userId, roomId, lock });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure,
            result: {}
        }));
    });
});
