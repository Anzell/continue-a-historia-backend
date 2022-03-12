"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const sign_up_1 = require("./sign_up");
describe("sign up usecase", () => {
    it("deve retornar right null caso chamada ao repository der sucesso", async () => {
        const mockAuthRepository = {
            signUp: jest.fn().mockReturnValue(either_ts_1.right(null)),
            signIn: jest.fn()
        };
        let usecase = new sign_up_1.SignUpUsecaseImpl(mockAuthRepository);
        let result = await usecase.handle(new sign_up_1.SignUpUsecaseParams({
            password: "123456",
            username: "anzell",
            email: "test@email.com"
        }));
        expect(result).toStrictEqual(either_ts_1.right(null));
    });
    it("deve retornar left failure caso chamada ao repository der erro", async () => {
        const mockAuthRepository = {
            signUp: jest.fn().mockReturnValue(either_ts_1.left(new failures_1.ServerFailure())),
            signIn: jest.fn()
        };
        let usecase = new sign_up_1.SignUpUsecaseImpl(mockAuthRepository);
        let result = await usecase.handle(new sign_up_1.SignUpUsecaseParams({
            password: "123456",
            username: "anzell",
            email: "test@email.com"
        }));
        expect(result).toStrictEqual(either_ts_1.left(new failures_1.ServerFailure()));
    });
});
