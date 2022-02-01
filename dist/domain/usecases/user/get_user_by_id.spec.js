"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../entities/user_entity");
const either_ts_1 = require("either-ts");
const get_user_by_id_1 = require("./get_user_by_id");
const failures_1 = require("../../../core/failures/failures");
describe('get user by id usecase', function () {
    const userExample = new user_entity_1.UserEntity({
        username: "anzell",
        id: "exampleId",
        email: "test@email.com"
    });
    it('should return a valid user if call to repository is success', async function () {
        const mockRepository = {
            getUserById: jest.fn().mockReturnValue((0, either_ts_1.right)(userExample))
        };
        const usecase = new get_user_by_id_1.GetUserByIdUsecase(mockRepository);
        const result = await usecase.handle(new get_user_by_id_1.GetUserByIdUsecaseParams({ id: "exampleId" }));
        expect(result).toStrictEqual((0, either_ts_1.right)(userExample));
    });
    it('should return left ServerFailure if a error ocurred in repository', async function () {
        const mockRepository = {
            getUserById: jest.fn().mockReturnValue((0, either_ts_1.left)(new failures_1.ServerFailure()))
        };
        const usecase = new get_user_by_id_1.GetUserByIdUsecase(mockRepository);
        const result = await usecase.handle(new get_user_by_id_1.GetUserByIdUsecaseParams({ id: "exampleId" }));
        expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
    });
});
