import {AuthRemoteDs} from "../datasources/remote/auth_remote_ds";
import {AuthRepositoryImpl} from "./auth_repository_impl";
import {left, right} from "either-ts";
import {ServerException, UsernameAlreadyExistException} from "../../core/failures/exceptions";
import {ServerFailure, UsernameAlreadyExistFailure} from "../../core/failures/failures";

describe('auth repository impl', function () {
    describe('sign up', function () {
        const email: string = "test@email.com";
        const username: string = "anzell";
        const password: string = "123456";

        it('should register a new user', async function () {
            const mockDatasource: AuthRemoteDs = {
              signUp: jest.fn().mockReturnValue(null)
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(right(null));
        });

        it('should return left alreadyusernameexists if username provided is already registered in server', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn().mockRejectedValue(new UsernameAlreadyExistException())
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(left(new UsernameAlreadyExistFailure()));
        });

        it('should register a new user', async function () {
            const mockDatasource: AuthRemoteDs = {
                signUp: jest.fn().mockRejectedValue(left(new ServerException()))
            };
            const repository = new AuthRepositoryImpl(mockDatasource);
            const result = await repository.signUp({email,password,username});
            expect(result).toStrictEqual(left(new ServerFailure()));
        });
    });
});