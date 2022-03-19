"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sign_in_1 = require("./sign_in");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const auth_token_1 = require("../../entities/auth_token");
describe('sign in use case', function () {
    const username = "anzell";
    const password = "123456";
    it('should return a right string if call to repository is success', async function () {
        const expected = new auth_token_1.AuthToken({
            id: "validId",
            token: "validToken"
        });
        const mockRepository = {
            signUp: jest.fn(),
            signIn: jest.fn().mockReturnValue(either_ts_1.right(expected))
        };
        const usecase = new sign_in_1.SignInUseCaseImpl(mockRepository);
        const result = await usecase.handle(new sign_in_1.SignInUseCaseParams({ username, password }));
        expect(result).toStrictEqual(either_ts_1.right(expected));
    });
    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockRepository = {
            signUp: jest.fn(),
            signIn: jest.fn().mockReturnValue(either_ts_1.left(new failures_1.InvalidCredentialsFailure()))
        };
        const usecase = new sign_in_1.SignInUseCaseImpl(mockRepository);
        const result = await usecase.handle(new sign_in_1.SignInUseCaseParams({ username, password }));
        expect(result).toStrictEqual(either_ts_1.left(new failures_1.InvalidCredentialsFailure()));
    });
});
