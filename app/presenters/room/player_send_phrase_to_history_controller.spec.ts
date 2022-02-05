import {GetRoomByIdUsecase} from "../../domain/usecases/room/get_room_by_id";
import {GameRoom} from "../../domain/entities/game_room";
import {left, right} from "either-ts";
import {PlayerSendPhraseToHistoryConverter} from "./converters/player_send_phrase_to_history_converter";
import {PlayerSendPhraseToHistoryController} from "./player_send_phrase_to_history_controller";
import {Phrase} from "../../domain/entities/phrase";
import {
    PlayerSendPhraseToHistoryUsecase,
    PlayerSendPhraseToHistoryUsecaseImpl
} from "../../domain/usecases/room/player_send_phrase_to_history";
import {CustomMessage} from "../../main/protocols/custom_message";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {GameRoomMapper} from "../../data/mappers/game_room_mapper";
import {PlayerEnterInRoomConverterErrorMessages} from "./converters/player_enter_in_room_converter";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

describe('player send phrase to history controller', function () {

    it('should send valid data to usecase and return a updated room', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const roomBeforeUpdate = new GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [],
            createdAt: new Date(2021, 10, 10)
        });
        const roomAfterUpdate = new GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [
                new Phrase({
                    sendAt: new Date(2021, 10, 11),
                    senderId: validRequestExample['userId'],
                    phrase: validRequestExample['phrase']
                })
            ],
            createdAt: new Date(2021, 10, 10)
        });
        const mockGetRoomUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(right(roomBeforeUpdate))
        };
        const mockConverter: PlayerSendPhraseToHistoryConverter = {
            handle: jest.fn().mockReturnValue(right({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase = {
            handle: jest.fn().mockReturnValue(right(roomAfterUpdate))
        };
        const controller = new PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new CustomMessage({
            type: TypeSocketMessages.sendPhraseToHistory,
            content: GameRoomMapper.entityToModel(roomAfterUpdate).toJson()
        }));
    });

    it('should return fail message if request has no valid', async function () {
        const invalidRequestExample = {
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const mockGetRoomUsecase: GetRoomByIdUsecase = {
            handle: jest.fn()
        };
        const mockConverter: PlayerSendPhraseToHistoryConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: PlayerEnterInRoomConverterErrorMessages.missingRoomId})))
        };
        const mockSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase = {
            handle: jest.fn()
        };
        const controller = new PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(invalidRequestExample);
        expect(result).toStrictEqual(new CustomMessage({
            type: TypeSocketMessages.error,
            content: PlayerEnterInRoomConverterErrorMessages.missingRoomId
        }));
    });

    it('should return fail message if getRoomById is fail', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const mockGetRoomUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockConverter: PlayerSendPhraseToHistoryConverter = {
            handle: jest.fn().mockReturnValue(right({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase = {
            handle: jest.fn()
        };
        const controller = new PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new CustomMessage({
            type: TypeSocketMessages.error,
            content: ErrorMessages.serverFailure
        }));
    });

    it('should return error message if send phrase usecase is fail', async function () {
        const validRequestExample = {
            "roomId": "validRoomId",
            "userId": "validUserId",
            "phrase": "era uma vez"
        };
        const roomBeforeUpdate = new GameRoom({
            id: validRequestExample['roomId'],
            name: "testRoom",
            adminsIds: ["admin1"],
            playersIds: [validRequestExample['userId']],
            history: [],
            createdAt: new Date(2021, 10, 10)
        });
        const mockGetRoomUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(right(roomBeforeUpdate))
        };
        const mockConverter: PlayerSendPhraseToHistoryConverter = {
            handle: jest.fn().mockReturnValue(right({
                roomId: validRequestExample['roomId'],
                userId: validRequestExample['userId'],
                phrase: validRequestExample['phrase']
            }))
        };
        const mockSendPhraseUsecase: PlayerSendPhraseToHistoryUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const controller = new PlayerSendPhraseToHistoryController(mockSendPhraseUsecase, mockConverter, mockGetRoomUsecase);
        const result = await controller.handle(validRequestExample);
        expect(result).toStrictEqual(new CustomMessage({
            type: TypeSocketMessages.error,
            content: ErrorMessages.serverFailure
        }));
    });
});