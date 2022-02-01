"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("../../domain/entities/user_entity");
const user_repository_impl_1 = require("./user_repository_impl");
const exceptions_1 = require("../../core/failures/exceptions");
const either_ts_1 = require("either-ts");
const failures_1 = require("../../core/failures/failures");
describe('user repository impl', function () {
    describe('get user by id', function () {
        const userExample = new user_entity_1.UserEntity({
            username: "anzell",
            id: "exampleId",
            email: "test@email.com"
        });
        it('should return a valid user from datasource', async function () {
            const mockDatasource = {
                getUserById: jest.fn().mockReturnValue(userExample)
            };
            const repository = new user_repository_impl_1.UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({ id: "validId" });
            expect(result).toStrictEqual((0, either_ts_1.right)(userExample));
        });
        it('should return a NotFoundFailure when datasource fails', async function () {
            const mockDatasource = {
                getUserById: jest.fn().mockRejectedValue(new exceptions_1.NotFoundException())
            };
            const repository = new user_repository_impl_1.UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({ id: "validId" });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.NotFoundFailure()));
        });
        it('should return a ServerFailure when datasource fails', async function () {
            const mockDatasource = {
                getUserById: jest.fn().mockRejectedValue(new exceptions_1.ServerException())
            };
            const repository = new user_repository_impl_1.UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({ id: "validId" });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
});
