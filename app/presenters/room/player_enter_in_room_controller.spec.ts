import {PlayerEnterInRoomUsecase} from "../../domain/usecases/room/player_enter_in_room";
import {left, right} from "either-ts";
import {PlayerEnterInRoomConverter} from "./converters/player_enter_in_room_converter";
import {PlayerEnterInRoomController} from "./player_enter_in_room_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {CreateRoomUsecase} from "../../domain/usecases/room/create_room";
import {GameRoomConverter} from "./converters/game_room_converter";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {CreateRoomController} from "./create_room_controller";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

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
            result: {},
            message: SuccessMessages.operationSuccess
        }))
    });


    it('deve retornar status 400 caso converter falhe', async function () {
        const mockCreateRoomUsecase: CreateRoomUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockRoomConverter: GameRoomConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "erro"})))
        };
        const controller = new CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: "erro",
            result: {}
        }));
    });

    it('deve retornar status 400 caso usecase falhe', async function () {
        const mockCreateRoomUsecase: CreateRoomUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockRoomConverter: GameRoomConverter = {
            handle: jest.fn().mockReturnValue(right({
                userId: "validId",
                roomId: "validId"
            }))
        };
        const controller = new CreateRoomController(mockCreateRoomUsecase, mockRoomConverter);
        const result = await controller.handle(request);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: ErrorMessages.serverFailure,
            result: {}
        }));
    });

});