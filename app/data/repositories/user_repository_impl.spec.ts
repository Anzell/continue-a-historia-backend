import {UserEntity} from "../../domain/entities/user_entity";
import {UserRepositoryImpl} from "./user_repository_impl";
import {NotFoundException, PlayerNotFoundException, ServerException} from "../../core/failures/exceptions";
import {left, right} from "either-ts";
import {NotFoundFailure, PlayerNotFoundFailure, ServerFailure} from "../../core/failures/failures";

describe('user repository impl', function () {
    describe('get user by id', function () {
        const userExample = new UserEntity({
            username: "anzell",
            id: "exampleId",
            email: "test@email.com"
        });

        it('should return a valid user from datasource', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn().mockReturnValue(userExample),
                getUserPermissions: jest.fn()
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({id: "validId"});
            expect(result).toStrictEqual(right(userExample));
        });

        it('should return a NotFoundFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn().mockRejectedValue(new PlayerNotFoundException()),
                getUserPermissions: jest.fn()
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({id: "validId"});
            expect(result).toStrictEqual(left(new PlayerNotFoundFailure()));
        });

        it('should return a ServerFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn().mockRejectedValue(new ServerException()),
                getUserPermissions: jest.fn()
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserById({id: "validId"});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe('get user permissions', function () {
        const permissionExample = "user";

        it('should return a valid user from datasource', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn(),
                getUserPermissions: jest.fn().mockReturnValue(permissionExample)
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserPermissions({id: "validId"});
            expect(result).toStrictEqual(right(permissionExample));
        });

        it('should return a NotFoundFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn(),
                getUserPermissions: jest.fn().mockRejectedValue(new PlayerNotFoundException())
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserPermissions({id: "validId"});
            expect(result).toStrictEqual(left(new PlayerNotFoundFailure()));
        });

        it('should return a ServerFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserById: jest.fn(),
                getUserPermissions: jest.fn().mockRejectedValue(new ServerException())
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserPermissions({id: "validId"});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe("get user by username", function() {
        const userExample = new UserEntity({
            username: "anzell",
            id: "exampleId",
            email: "test@email.com"
        });

        it('should return a valid user from datasource', async function () {
            const mockDatasource: any = {
                getUserByUsername: jest.fn().mockReturnValue(userExample)
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserByUsername({username: "anzell"});
            expect(result).toStrictEqual(right(userExample));
        });

        it('should return a NotFoundFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserByUsername: jest.fn().mockRejectedValue(new PlayerNotFoundException())
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserByUsername({username: "usernameNotRegistered"});
            expect(result).toStrictEqual(left(new PlayerNotFoundFailure()));
        });

        it('should return a ServerFailure when datasource fails', async function () {
            const mockDatasource: any = {
                getUserByUsername: jest.fn().mockRejectedValue(new ServerFailure())
            };
            const repository = new UserRepositoryImpl(mockDatasource);
            const result = await repository.getUserByUsername({username: "anzell"});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });
});