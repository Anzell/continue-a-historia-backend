import {left, right} from "either-ts";
import {ServerFailure} from "../../../core/failures/failures";
import {AuthRepository} from "../../repositories/auth_repository";
import {SignUpUsecase, SignUpUsecaseImpl, SignUpUsecaseParams} from "./sign_up";

describe("sign up usecase", () => {

    it("deve retornar right null caso chamada ao repository der sucesso", async () => {
        const mockAuthRepository: AuthRepository = {
            signUp: jest.fn().mockReturnValue(right(null)),
            signIn: jest.fn()
        };
        let usecase: SignUpUsecase = new SignUpUsecaseImpl(mockAuthRepository);
        let result = await usecase.handle(new SignUpUsecaseParams({
            password: "123456",
            username: "anzell",
            email: "test@email.com"
        }));
        expect(result).toStrictEqual(right(null));
    });

    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockAuthRepository: AuthRepository = {
            signUp: jest.fn().mockReturnValue(left(new ServerFailure())),
            signIn: jest.fn()

        };
        let usecase: SignUpUsecase = new SignUpUsecaseImpl(mockAuthRepository);
        let result = await usecase.handle(new SignUpUsecaseParams({
            password: "123456",
            username: "anzell",
            email: "test@email.com"
        }));
        expect(result).toStrictEqual(left(new ServerFailure()));
    });
});