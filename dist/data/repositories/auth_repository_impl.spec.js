"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_repository_impl_1 = require("./auth_repository_impl");
const either_ts_1 = require("either-ts");
const exceptions_1 = require("../../core/failures/exceptions");
const failures_1 = require("../../core/failures/failures");
const auth_token_1 = require("../../domain/entities/auth_token");
describe('auth repository impl', function () {
    describe('sign up', function () {
        const email = "test@email.com";
        const username = "anzell";
        const password = "123456";
        it('should register a new user', async function () {
            const mockDatasource = {
                signUp: jest.fn().mockReturnValue(null),
                signIn: jest.fn()
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({ email, password, username });
            expect(result).toStrictEqual((0, either_ts_1.right)(null));
        });
        it('should return left alreadyusernameexists if username provided is already registered in server', async function () {
            const mockDatasource = {
                signUp: jest.fn().mockRejectedValue(new exceptions_1.UsernameAlreadyExistException()),
                signIn: jest.fn()
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({ email, password, username });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.UsernameAlreadyExistFailure()));
        });
        it('should register a new user', async function () {
            const mockDatasource = {
                signUp: jest.fn().mockRejectedValue((0, either_ts_1.left)(new exceptions_1.ServerException())),
                signIn: jest.fn()
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({ email, password, username });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
    });
    describe('sign in', function () {
        const username = "anzell";
        const password = "123456";
        it('should sign in sucessfull', async function () {
            const expected = new auth_token_1.AuthToken({
                id: "validId",
                token: "validToken"
            });
            const mockDatasource = {
                signUp: jest.fn(),
                signIn: jest.fn().mockReturnValue(expected)
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({ password, username });
            expect(result).toStrictEqual((0, either_ts_1.right)(expected));
        });
        it('should return left server failure if call to datasource fail', async function () {
            const mockDatasource = {
                signUp: jest.fn(),
                signIn: jest.fn().mockRejectedValue(new exceptions_1.ServerException())
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({ password, username });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.ServerFailure()));
        });
        it('should return left invalid credentials if datasource returns invalid', async function () {
            const mockDatasource = {
                signUp: jest.fn(),
                signIn: jest.fn().mockRejectedValue(new exceptions_1.InvalidCredentialsException())
            };
            const repository = new auth_repository_impl_1.AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({ password, username });
            expect(result).toStrictEqual((0, either_ts_1.left)(new failures_1.InvalidCredentialsFailure()));
        });
    });
});
