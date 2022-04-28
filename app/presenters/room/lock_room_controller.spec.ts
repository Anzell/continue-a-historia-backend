import {LockRoomConverter, LockRoomConverterErrorMessages} from "./converters/lock_room_converter";
import {GetRoomByIdUsecase} from "../../domain/usecases/room/get_room_by_id";
import {GameRoom} from "../../domain/entities/game_room";
import {left, right} from "either-ts";
import {UpdateRoomUseCase} from "../../domain/usecases/room/update_room";
import {LockRoomController} from "./lock_room_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

describe('lock room controller', function () {
    it('should lock a room sucessfull', async function () {
        const userId: string = "validId";
        const roomId: string = "validId";
        const lock: boolean = true;
        const roomExample = new GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter: LockRoomConverter = {
            handle: jest.fn().mockReturnValue(right({userId, roomId, lock}))
        };
        const mockGetRoomByIdUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(right(roomExample))
        };
        const mockUpdateRoomUsecase: UpdateRoomUseCase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const controller = new LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({userId, roomId, lock});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.success,
            codeStatus: 200,
            message: SuccessMessages.operationSuccess,
            result: {}
        }));
    });

    it('should return a codeStatus 400 if call to converter is fail', async function () {
        const userId: string = "validId";
        const roomId: string = "validId";
        const lock: boolean = true;
        const roomExample = new GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter: LockRoomConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: LockRoomConverterErrorMessages.missingRoomId})))
        };
        const mockGetRoomByIdUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(right(roomExample))
        };
        const mockUpdateRoomUsecase: UpdateRoomUseCase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const controller = new LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({userId, roomId, lock});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.validationError,
            codeStatus: 400,
            message: LockRoomConverterErrorMessages.missingRoomId,
            result: {}
        }));
    });

    it('should return a codeStatus 400 if call to get room by id usecase is fail', async function () {
        const userId: string = "validId";
        const roomId: string = "validId";
        const lock: boolean = true;
        const roomExample = new GameRoom({
            id: roomId,
            adminsIds: [userId],
            playersIds: [],
            name: "Era uma vez",
            someoneIsTapping: lock
        });
        const mockConverter: LockRoomConverter = {
            handle: jest.fn().mockReturnValue(right({userId, roomId, lock}))
        };
        const mockGetRoomByIdUsecase: GetRoomByIdUsecase = {
            handle: jest.fn().mockReturnValue(right(roomExample))
        };
        const mockUpdateRoomUsecase: UpdateRoomUseCase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const controller = new LockRoomController({
            converter: mockConverter,
            getRoombyIdUsecase: mockGetRoomByIdUsecase,
            updateRoomUsecase: mockUpdateRoomUsecase
        });
        const result = await controller.handle({userId, roomId, lock});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.serverFailure,
            codeStatus: 400,
            message: ErrorMessages.serverFailure,
            result: {}
        }));
    });
});