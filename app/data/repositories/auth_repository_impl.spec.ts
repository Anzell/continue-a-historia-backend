import {AuthRemoteDs} from "../datasources/remote/auth_remote_ds";
import {AuthRepositoryImpl} from "./auth_repository_impl";
import {left, right} from "either-ts";
import {
    EmailAlreadyExistException,
    InvalidCredentialsException,
    ServerException,
    UsernameAlreadyExistException
} from "../../core/failures/exceptions";
import {
    EmailAlreadyExistFailure,
    InvalidCredentialsFailure,
    ServerFailure,
    UsernameAlreadyExistFailure
} from "../../core/failures/failures";
import {AuthToken} from "../../domain/entities/auth_token";

describe('auth repository impl', function () {
    describe('sign up', function () {
        const email: string = "test@email.com";
        const username: string = "anzell";
        const password: string = "123456";

        it('should register a new user', async function () {
            const mockDatasource: AuthRemoteDs = {
              signUp: jest.fn().mockReturnValue(null),
                signIn: jest.fn()
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(right(null));
        });

        it('should return left alreadyusernameexists if username provided is already registered in server', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn().mockRejectedValue(new UsernameAlreadyExistException()),
                signIn: jest.fn()
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(left(new UsernameAlreadyExistFailure()));
        });

        it('should return left emailalreadyexists if email provided is already registered in server', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn().mockRejectedValue(new EmailAlreadyExistException()),
                signIn: jest.fn()
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(left(new EmailAlreadyExistFailure()));
        });

        it('should return a left serverFailure if call to datasource fail', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn().mockRejectedValue(left(new ServerException())),
                signIn: jest.fn()
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });

    describe('sign in', function () {
        const username = "anzell";
        const password = "123456";

        it('should sign in sucessfull', async function () {
            const expected = new AuthToken({
                id: "validId",
                token: "validToken"
            });
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn(),
                signIn: jest.fn().mockReturnValue(expected)
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({password,username});
            expect(result).toStrictEqual(right(expected));
        });

        it('should return left server failure if call to datasource fail', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn(),
                signIn: jest.fn().mockRejectedValue(new ServerException())
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({password,username});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });

        it('should return left invalid credentials if datasource returns invalid', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn(),
                signIn: jest.fn().mockRejectedValue(new InvalidCredentialsException())
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signIn({password,username});
            expect(result).toStrictEqual(left(new InvalidCredentialsFailure()));
        });
    });
});