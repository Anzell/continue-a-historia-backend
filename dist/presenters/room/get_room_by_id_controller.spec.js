"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
const game_room_1 = require("../../domain/entities/game_room");
const phrase_1 = require("../../domain/entities/phrase");
const get_room_by_id_controller_1 = require("./get_room_by_id_controller");
const game_room_mapper_1 = require("../../data/mappers/game_room_mapper");
describe('get room by id controller', function () {
    it('should return a GameRoom if call to usecase is success', async function () {
        let expected = new game_room_1.GameRoom({
            id: "validId",
            name: "Era uma vez",
            adminsIds: ["admin1"],
            playersIds: [],
            history: [
                new phrase_1.Phrase({
                    sendAt: new Date(),
                    senderId: "test2",
                    phrase: "um cara que"
                })
            ]
        });
        const mockUseCase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ roomId: "validId" }))
        };
        const controller = new get_room_by_id_controller_1.GetRoomByIdController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "roomid": "validId" });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.success,
            codeStatus: 200,
            result: game_room_mapper_1.GameRoomMapper.entityToModel(expected).toJson(),
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
        const controller = new get_room_by_id_controller_1.GetRoomByIdController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "roomId": "validId" });
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
        const controller = new get_room_by_id_controller_1.GetRoomByIdController({ converter: mockConverter, usecase: mockUseCase });
        const result = await controller.handle({ "roomId": "validId" });
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400,
            result: {},
            message: error_messages_1.ErrorMessages.serverFailure
        }));
    });
});
