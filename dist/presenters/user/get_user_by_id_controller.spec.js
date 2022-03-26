"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const user_entity_1 = require("../../domain/entities/user_entity");
const get_user_by_id_controller_1 = require("./get_user_by_id_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const server_codes_1 = require("../../core/constants/messages/server_codes");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
describe("get user by id controller", () => {
    const testId = "validId";
    it("deve retornar um usuario valido em caso de sucesso", async function () {
        const expected = new user_entity_1.UserEntity({
            id: testId,
            username: "validUsername",
            email: "email@email.com",
            permission: "user"
        });
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ id: testId }))
        };
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const controller = new get_user_by_id_controller_1.GetUserByIdController(mockUsecase, mockConverter);
        const response = await controller.handle({ "id": testId });
        expect(response).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            code: server_codes_1.ServerCodes.success,
            message: success_messages_1.SuccessMessages.operationSuccess,
            result: expected
        }));
    });
    test("deve retornar custom response com erro caso converter falhe", async function () {
        const expected = new user_entity_1.UserEntity({
            id: testId,
            username: "validUsername",
            email: "email@email.com",
            permission: "user"
        });
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: "error" })))
        };
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(expected))
        };
        const controller = new get_user_by_id_controller_1.GetUserByIdController(mockUsecase, mockConverter);
        const response = await controller.handle({ "id": testId });
        expect(response).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            code: server_codes_1.ServerCodes.validationError,
            message: "error",
            result: {}
        }));
    });
    it("deve retornar custom response com erro caso usecase falhe", async function () {
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({ id: testId }))
        };
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const controller = new get_user_by_id_controller_1.GetUserByIdController(mockUsecase, mockConverter);
        const response = await controller.handle({ "id": testId });
        expect(response).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            code: server_codes_1.ServerCodes.serverFailure,
            message: error_messages_1.ErrorMessages.serverFailure,
            result: {}
        }));
    });
});
