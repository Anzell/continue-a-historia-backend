"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const signup_controller_1 = require("./signup_controller");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
const server_codes_1 = require("../../core/constants/messages/server_codes");
describe('sign up controller', function () {
    const requestExample = {
        email: "test@email.com",
        username: "anzell",
        password: "123456",
    };
    it('deve completar o registro de usuario normalmente e retornar status 200', async function () {
        const spyUsecase = jest.fn().mockReturnValue((0, either_ts_1.right)(null));
        const spyConverter = jest.fn().mockReturnValue((0, either_ts_1.right)(requestExample));
        const mockUsecase = { handle: spyUsecase };
        const mockConverter = { handle: spyConverter };
        const result = await new signup_controller_1.SignUpController(mockUsecase, mockConverter).handle(requestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            message: success_messages_1.SuccessMessages.operationSuccess,
            code: server_codes_1.ServerCodes.success,
            result: {}
        }));
        expect(spyConverter).toBeCalled();
        expect(spyUsecase).toBeCalled();
    });
    it('deve retornar status 400 caso converter falhe', async function () {
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)(null))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ValidationFailure({ message: "erro" })))
        };
        const controller = new signup_controller_1.SignUpController(mockUsecase, mockConverter);
        const result = await controller.handle({});
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: "erro",
            code: server_codes_1.ServerCodes.validationError,
            result: {}
        }));
    });
    it('deve retornar status 400 caso usecase falhe', async function () {
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                username: requestExample.username,
                email: requestExample.email,
                password: requestExample.password,
            }))
        };
        const controller = new signup_controller_1.SignUpController(mockUsecase, mockConverter);
        const result = await controller.handle({});
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure,
            code: server_codes_1.ServerCodes.serverFailure,
            result: {}
        }));
    });
});
