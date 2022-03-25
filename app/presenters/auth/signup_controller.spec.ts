import {SignUpUsecase} from "../../domain/usecases/auth/sign_up";
import {left, right} from "either-ts";
import {SignupConverter} from "./converters/signup_converters";
import {SignUpController} from "./signup_controller";
import {CustomResponse} from "../../main/protocols/custom_response";
import {SuccessMessages} from "../../core/constants/messages/success_messages";
import {ServerFailure, ValidationFailure} from "../../core/failures/failures";
import {ErrorMessages} from "../../core/constants/messages/error_messages";
import {ServerCodes} from "../../core/constants/messages/server_codes";

describe('sign up controller', function () {
    const requestExample = {
         email: "test@email.com",
         username: "anzell",
         password: "123456",
    }

    it('deve completar o registro de usuario normalmente e retornar status 200', async function () {
        const spyUsecase = jest.fn().mockReturnValue(right(null));
        const spyConverter = jest.fn().mockReturnValue(right(requestExample));
        const mockUsecase: SignUpUsecase = {handle: spyUsecase};
        const mockConverter: SignupConverter = {handle: spyConverter};
        const result = await new SignUpController(mockUsecase, mockConverter).handle(requestExample);
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 200,
            message: SuccessMessages.operationSuccess,
            code: ServerCodes.success,
            result: {}
        }));
        expect(spyConverter).toBeCalled();
        expect(spyUsecase).toBeCalled();
    });


    it('deve retornar status 400 caso converter falhe', async function () {
        const mockUsecase: SignUpUsecase = {
            handle: jest.fn().mockReturnValue(right(null))
        };
        const mockConverter: SignupConverter = {
            handle: jest.fn().mockReturnValue(left(new ValidationFailure({message: "erro"})))
        };
        const controller = new SignUpController(mockUsecase, mockConverter);
        const result = await controller.handle({
        });
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: "erro",
            code: ServerCodes.validationError+":"+"erro",
            result: {}
        }));
    });

    it('deve retornar status 400 caso usecase falhe', async function () {
        const mockUsecase: SignUpUsecase = {
            handle: jest.fn().mockReturnValue(left(new ServerFailure()))
        };
        const mockConverter: SignupConverter = {
            handle: jest.fn().mockReturnValue(right({
                username: requestExample.username,
                email: requestExample.email,
                password: requestExample.password,
            }))
        };
        const controller = new SignUpController(mockUsecase, mockConverter);
        const result = await controller.handle({
        });
        expect(result).toStrictEqual(new CustomResponse({
            codeStatus: 400,
            message: ErrorMessages.serverFailure,
            code: ServerCodes.serverFailure,
            result: {}
        }));
    });
});