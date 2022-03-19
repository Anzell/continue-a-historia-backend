"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const custom_response_1 = require("../../main/protocols/custom_response");
const success_messages_1 = require("../../core/constants/messages/success_messages");
const failures_1 = require("../../core/failures/failures");
const error_messages_1 = require("../../core/constants/messages/error_messages");
const signin_controller_1 = require("./signin_controller");
const auth_token_1 = require("../../domain/entities/auth_token");
describe('sign up controller', function () {
    const requestExample = {
        username: "anzell",
        password: "123456",
    };
    const authTokenExample = new auth_token_1.AuthToken({
        id: "validId",
        token: "validToken"
    });
    it('should return a status code 200 with auth token', async function () {
        const spyUsecase = jest.fn().mockReturnValue((0, either_ts_1.right)(authTokenExample));
        const spyConverter = jest.fn().mockReturnValue((0, either_ts_1.right)(requestExample));
        const mockUsecase = { handle: spyUsecase };
        const mockConverter = { handle: spyConverter };
        const result = await new signin_controller_1.SignInController(mockUsecase, mockConverter).handle(requestExample);
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 200,
            message: success_messages_1.SuccessMessages.operationSuccess,
            result: {
                id: authTokenExample.id,
                token: authTokenExample.token
            }
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
        const controller = new signin_controller_1.SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({});
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: "erro",
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
                password: requestExample.password,
            }))
        };
        const controller = new signin_controller_1.SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({});
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.serverFailure,
            result: {}
        }));
    });
    it('should return status code 400 and a invalid credencials message', async function () {
        const mockUsecase = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.InvalidCredentialsFailure()))
        };
        const mockConverter = {
            handle: jest.fn().mockReturnValue((0, either_ts_1.right)({
                username: requestExample.username,
                password: requestExample.password,
            }))
        };
        const controller = new signin_controller_1.SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({});
        expect(result).toStrictEqual(new custom_response_1.CustomResponse({
            codeStatus: 400,
            message: error_messages_1.ErrorMessages.invalidCredentials,
            result: {}
        }));
    });
});
