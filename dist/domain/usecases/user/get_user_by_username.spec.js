"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entities/user_entity");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../../core/failures/failures");
const get_user_by_username_1 = require("./get_user_by_username");
describe('get user by username usecase', function () {
    const userExample = new user_entity_1.UserEntity({
        username: "anzell",
        id: "exampleId",
        email: "test@email.com"
    });
    it('should return a valid user if call to repository is success', async function () {
        const mockRepository = {
            getUserByUsername: jest.fn().mockReturnValue((0, either_ts_1.right)(userExample)),
            getUserPermissions: jest.fn()
        };
        const usecase = new get_user_by_username_1.GetUserByUsernameUsecase(mockRepository);
        const result = await usecase.handle(new get_user_by_username_1.GetUserByUsernameUsecaseParams({ username: "anzell" }));
        expect(result).toStrictEqual((0, either_ts_1.right)(userExample));
    });
    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository = {
            getUserByUsername: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure())),
            getUserPermissions: jest.fn()
        };
        const usecase = new get_user_by_username_1.GetUserByUsernameUsecase(mockRepository);
        const result = await usecase.handle(new get_user_by_username_1.GetUserByUsernameUsecaseParams({ username: "anzell" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
