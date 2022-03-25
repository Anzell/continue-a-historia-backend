import {PlayerEnterInRoomUsecase} from "../../domain/usecases/room/player_enter_in_room";
import {left, right} from "either-ts";
import {PlayerEnterInRoomConverter} from "./converters/player_enter_in_room_converter";
import {PlayerEnterInRoomController} from "./player_enter_in_room_controller";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";
import {TypeSocketMessages} from "../../core/constants/socket/type_messages";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";

describe('player enter in room controller', function () {
    const request = {userId: "validId", roomId: "validId"};

    it('should return a valid custom response with status code 200', async function () {
        const mockUseCase: PlayerEnterInRoomUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockConverter: PlayerEnterInRoomConverter = {
          handle: jest.fn().mockReturnValue(right({
              userId: "validId",
              roomId: "validId"
          }))
        };

        const controller = new PlayerEnterInRoomController(mockUseCase, mockConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 200,
            code: ServerCodes.success,
            message: SuccessMessages.operationSuccess,
            result: {}
        }))
    });


    it('deve retornar status erro caso converter falhe', async function () {
        const mockCreateRoomUsecase: PlayerEnterInRoomUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockRoomConverter: PlayerEnterInRoomConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "erro"})))
        };
        const controller = new PlayerEnterInRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new CustomResponse({
            message: "erro",
            codeStatus: 400,
            code: ServerCodes.validationError,
            result: {}
        }));
    });

    it('deve retornar status erro caso usecase falhe', async function () {
        const mockCreateRoomUsecase: PlayerEnterInRoomUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockRoomConverter: PlayerEnterInRoomConverter = {
            handle: jest.fn().mockReturnValue(right({
                userId: "validId",
                roomId: "validId"
            }))
        };
        const controller = new PlayerEnterInRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.serverFailure,
            message: ErrorMessages.serverFailure,
            codeStatus: 400,
            result: {}
        }));
    });

});