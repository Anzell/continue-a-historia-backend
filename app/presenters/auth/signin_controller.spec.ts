import {left, right} from "either-ts";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {InvalidCredentialsFailure, ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";
import {SignInUsecase} from "../../domain/usecases/auth/sign_in";
import {SignInConverter} from "./converters/signin_converter";
import {SignInController} from "./signin_controller";
import {AuthToken} from "../../domain/entities/auth_token";
import {ServerCodes} from "../../core/constants/messages/server_codes";

describe('sign up controller', function () {
    const requestExample = {
        username: "anzell",
        password: "123456",
    }

    const authTokenExample = new AuthToken({
       id: "validId",
       token: "validToken"
    });

    it('should return a status code 200 with auth token', async function () {
        const spyUsecase = jest.fn().mockReturnValue(right(authTokenExample));
        const spyConverter = jest.fn().mockReturnValue(right(requestExample));
        const mockUsecase: SignInUsecase = {handle: spyUsecase};
        const mockConverter: SignInConverter = {handle: spyConverter};
        const result = await new SignInController(mockUsecase, mockConverter).handle(requestExample);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 200,
            message: SuccessMessages.operationSuccess,
            code: ServerCodes.success,
            result: {
                id: authTokenExample.id,
                token: authTokenExample.token
            }
        }));
        expect(spyConverter).toBeCalled();
        expect(spyUsecase).toBeCalled();
    });

    it('deve retornar status 400 caso converter falhe', async function () {
        const mockUsecase: SignInUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockConverter: SignInConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "erro"})))
        };
        const controller = new SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({
        });
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: "erro",
            code: ServerCodes.validationError,
            result: {}
        }));
    });

    it('deve retornar status 400 caso usecase falhe', async function () {
        const mockUsecase: SignInUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockConverter: SignInConverter = {
            handle: jest.fn().mockReturnValue(right({
                username: requestExample.username,
                password: requestExample.password,
            }))
        };
        const controller = new SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({
        });
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: ErrorMessages.serverFailure,
            code: ServerCodes.serverFailure,
            result: {}
        }));
    });


    it('should return status code 400 and a invalid credencials message', async function () {
        const mockUsecase: SignInUsecase = {
            handle: jest.fn().mockReturnValue(left(new InvalidCredentialsFailure()))
        };
        const mockConverter: SignInConverter = {
            handle: jest.fn().mockReturnValue(right({
                username: requestExample.username,
                password: requestExample.password,
            }))
        };
        const controller = new SignInController(mockUsecase, mockConverter);
        const result = await controller.handle({
        });
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: ErrorMessages.invalidCredentials,
            code: ServerCodes.invalidCredentials,
            result: {}
        }));
    });

});