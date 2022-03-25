"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_room_1 = require("../../domain/entities/game_room");
const either_ts_1 = require("either-ts");
const player_send_phrase_to_history_controller_1 = require("./player_send_phrase_to_history_controller");
const phrase_1 = require("../../domain/entities/phrase");
const game_room_mapper_1 = require("../../data/mappers/game_room_mapper");
const player_enter_in_room_converter_1 = require("./converters/player_enter_in_room_converter");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const server_codes_1 = require("../../core/constants/messages/server_codes");
describe('player send phrase to history controller', function () {
    it('should send valid data to usecase and return a updated room', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const roomBeforeUpdate = new game_room_1.GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [],
            createdAt: new Date(2021, 10, 10)
        });
        const roomAfterUpdate = new game_room_1.GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [
                new phrase_1.Phrase({
                    sendAt: new Date(2021, 10, 11),
                    senderId: validRequestExample['userId'],
                    phrase: validRequestExample['phrase']
                })
            ],
            createdAt: new Date(2021, 10, 10)
        });
        const mockGetRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomBeforeUpdate))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomAfterUpdate))
        };
        const controller = new player_send_phrase_to_history_controller_1.PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            message: success_messages_1.SuccessMessages.operationSuccess,
            code: server_codes_1.ServerCodes.success,
            result: game_room_mapper_1.GameRoomMapper.entityToModel(roomAfterUpdate).toJson()
        }));
    });
    it('should return fail message if request has no valid', async function () {
        const invalidRequestExample = {
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const mockGetRoomUsecase = {
            handle: jest.fn()
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: player_enter_in_room_converter_1.PlayerEnterInRoomConverterErrorMessages.missingRoomId })))
        };
        const mockSendPhraseUsecase = {
            handle: jest.fn()
        };
        const controller = new player_send_phrase_to_history_controller_1.PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(invalidRequestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.validationError,
            message: player_enter_in_room_converter_1.PlayerEnterInRoomConverterErrorMessages.missingRoomId,
            result: {},
            codeStatus: 400
        }));
    });
    it('should return fail message if getRoomById is fail', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const mockGetRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase = {
            handle: jest.fn()
        };
        const controller = new player_send_phrase_to_history_controller_1.PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.serverFailure,
            codeStatus: 400,
            result: {},
            message: error_messages_1.ErrorMessages.serverFailure
        }));
    });
    it('should return error message if send phrase usecase is fail', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const roomBeforeUpdate = new game_room_1.GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [],
            createdAt: new Date(2021, 10, 10)
        });
        const mockGetRoomUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(roomBeforeUpdate))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const controller = new player_send_phrase_to_history_controller_1.PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            code: server_codes_1.ServerCodes.serverFailure,
            result: {},
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure
        }));
    });
});
