import {left, right} from "either-ts";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";
import {GameRoom} from "../../domain/entities/game_room";
import {Phrase} from "../../domain/entities/phrase";
import {GetRoomByIdController} from "./get_room_by_id_controller";
import { GameRoomMapper } from "../../data/mappers/game_room_mapper";

describe('get room by id controller', function () {
    it('should return a GameRoom if call to usecase is success', async function () {
        let expected = new GameRoom({
            id: "validId",
            name: "Era uma vez",
            adminsIds: ["admin1"],
            playersIds: [],
            history: [
                new Phrase({
                    sendAt: new Date(),
                    senderId: "test2",
                    phrase: "um cara que"
                })
            ]
        });
        const mockUseCase: any = {
            handle: jest.fn().mockReturnValue(right(expected))
        };
        const mockConverter: any = {
            handle: jest.fn().mockReturnValue(right({roomId: "validId"}))
        };
        const controller = new GetRoomByIdController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"roomid": "validId"});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.success,
            codeStatus: 200,
            result: GameRoomMapper.entityToModel(expected).toJson(),
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
        const controller = new GetRoomByIdController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"roomId": "validId"});
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
        const controller = new GetRoomByIdController({converter: mockConverter, usecase: mockUseCase});
        const result = await controller.handle({"roomId": "validId"});
        expect(result).toStrictEqual(new CustomResponse({
            code: ServerCodes.serverFailure,
            codeStatus: 400,
            result: {},
            message: ErrorMessages.serverFailure
        }));
    });
});