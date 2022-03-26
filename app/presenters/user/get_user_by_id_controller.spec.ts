import {GetUserByIdConverter} from "./converters/get_user_by_id_converter";
import {left, right} from "either-ts";
import {UserEntity} from "../../domain/entities/user_entity";
import {GetUserByIdController} from "./get_user_by_id_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {ServerCodes} from "../../core/constants/messages/server_codes";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";

describe("get user by id controller", () => {
    const testId = "validId";

    it("deve retornar um usuario valido em caso de sucesso", async function() {
       const expected = new UserEntity({
           id: testId,
           username: "validUsername",
           email: "email@email.com",
           permission: "user"
       });
        const mockConverter: GetUserByIdConverter = {
           handle: jest.fn().mockReturnValue(right({id: testId}))
       };
       const mockUsecase: any = {
          handle: jest.fn().mockReturnValue(right(expected))
       };
       const controller = new GetUserByIdController(mockUsecase, mockConverter);
       const response = await controller.handle({"id": testId});
       expect(response).toStrictEqual(new CustomResponse({
           codeStatus: 200,
           code: ServerCodes.success,
           message: SuccessMessages.operationSuccess,
           result: expected
       }));
    });

    test("deve retornar custom response com erro caso converter falhe", async function () {
        const expected = new UserEntity({
            id: testId,
            username: "validUsername",
            email: "email@email.com",
            permission: "user"
        });
        const mockConverter: GetUserByIdConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "error"})))
        };
        const mockUsecase: any = {
            handle: jest.fn().mockReturnValue(right(expected))
        };
        const controller = new GetUserByIdController(mockUsecase, mockConverter);
        const response = await controller.handle({"id": testId});
        expect(response).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            code: ServerCodes.validationError,
            message: "error",
            result: {}
        }));
    });
    it("deve retornar custom response com erro caso usecase falhe", async function() {
        const mockConverter: GetUserByIdConverter = {
            handle: jest.fn().mockReturnValue(right({id: testId}))
        };
        const mockUsecase: any = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const controller = new GetUserByIdController(mockUsecase, mockConverter);
        const response = await controller.handle({"id": testId});
        expect(response).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            code: ServerCodes.serverFailure,
            message: ErrorMessages.serverFailure,
            result: {}
        }));
    });
});