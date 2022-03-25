import {AuthRepository} from "../../repositories/auth_repository";
import {SignInUseCaseImpl, SignInUseCaseParams} from "./sign_in";
import {left, right} from "either-ts";
import {InvalidCredentialsFailure} from "../../../core/failures/failures";
import {AuthToken} from "../../entities/auth_token";

describe('sign in use case', function () {
    const email = "email@email.com";
    const password = "123456";

    it('should return a right string if call to repository is success', async function () {
        const expected = new AuthToken({
            id: "validId",
            token: "validToken"
        });
        const mockRepository: AuthRepository = {
           signUp: jest.fn(),
           signIn: jest.fn().mockReturnValue(right(expected))
        };
        const usecase = new SignInUseCaseImpl(mockRepository);
        const result = await usecase.handle(new SignInUseCaseParams({email, password}));
        expect(result).toStrictEqual(right(expected));
    });

    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockRepository: AuthRepository = {
            signUp: jest.fn(),
            signIn: jest.fn().mockReturnValue(left(new InvalidCredentialsFailure()))
        };
        const usecase = new SignInUseCaseImpl(mockRepository);
        const result = await usecase.handle(new SignInUseCaseParams({email, password}));
        expect(result).toStrictEqual(left(new InvalidCredentialsFailure()));
    });
});