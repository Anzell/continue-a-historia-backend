import {ResumeGameRoom} from "../../domain/entities/resume_game_room";
import {left, right} from "either-ts";
import {GetPlayerRoomsController} from "./get_player_rooms_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

describe('get player rooms controller', function () {
    it('should return a array of ResumeGameRoom if call to usecase is success', async function () {
        let expected = [
            new ResumeGameRoom({id: "room1", title: "a long time", playersNumber: 2, phrasesNumber: 102}),
            new ResumeGameRoom({id: "room3", title: "a long time 3", playersNumber: 22, phrasesNumber: 40}),
            new ResumeGameRoom({id: "room2", title: "a long time 2", playersNumber: 2, phrasesNumber: 0}),
        ];
        const mockUseCase: any = {
            handle: jest.fn().mockReturnValue(right(expected))
        };
        const mockConverter: any = {
            handle: jest.fn().mockReturnValue(right({userId: "validId"}))
        };
        const controller = new GetPlayerRoomsController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"userId": "validId"});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.success,
            codeStatus: 200,
            result: expected,
            message: SuccessMessages.operationSuccess
        }));
    });

    it('should return a custom response with fail message if call to converter is fail', async function () {
        const mockUseCase: any = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockConverter: any = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "erro"})))
        };
        const controller = new GetPlayerRoomsController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"userId": "validId"});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.validationError,
            codeStatus: 400,
            result: {},
            message: "erro"
        }));
    });

    it('should return a custom response with fail message if call to usecase is fail', async function () {
        const mockUseCase: any = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockConverter: any = {
            handle: jest.fn().mockReturnValue(right({userId : "validId"}))
        };
        const controller = new GetPlayerRoomsController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"userId": "validId"});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.serverFailure,
            codeStatus: 400,
            result: {},
            message: ErrorMessages.serverFailure
        }));
    });
});