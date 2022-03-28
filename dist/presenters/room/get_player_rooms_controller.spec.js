"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resume_game_room_1 = require("../../domain/entities/resume_game_room");
const either_ts_1 = require("either-ts");
const get_player_rooms_controller_1 = require("./get_player_rooms_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
describe('get player rooms controller', function () {
    it('should return a array of ResumeGameRoom if call to usecase is success', async function () {
        let expected = [
            new resume_game_room_1.ResumeGameRoom({ id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102 }),
            new resume_game_room_1.ResumeGameRoom({ id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40 }),
            new resume_game_room_1.ResumeGameRoom({ id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0 }),
        ];
        const mockUseCase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ userId: "validId" }))
        };
        const controller = new get_player_rooms_controller_1.GetPlayerRoomsController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "userId": "validId" });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.success,
            codeStatus: 200,
            result: expected,
            message: success_messages_1.SuccessMessages.operationSuccess
        }));
    });
    it('should return a custom response with fail message if call to converter is fail', async function () {
        const mockUseCase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: "erro" })))
        };
        const controller = new get_player_rooms_controller_1.GetPlayerRoomsController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "userId": "validId" });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.validationError,
            codeStatus: 400,
            result: {},
            message: "erro"
        }));
    });
    it('should return a custom response with fail message if call to usecase is fail', async function () {
        const mockUseCase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ userId: "validId" }))
        };
        const controller = new get_player_rooms_controller_1.GetPlayerRoomsController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "userId": "validId" });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400,
            result: {},
            message: error_messages_1.ErrorMessages.serverFailure
        }));
    });
});
