"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_remote_ds_1 = require("./auth_remote_ds");
const mongodb_1 = require("mongodb");
const db_collections_1 = require("../../../core/constants/db/db_collections");
const auth_token_1 = require("../../../domain/entities/auth_token");
const exceptions_1 = require("../../../core/failures/exceptions");
describe('auth remote ds', function () {
    let db;
    beforeEach(async () => {
        const mongoClient = await mongodb_1.MongoClient.connect(process.env['MONGO_URL']);
        db = mongoClient.db();
    });
    describe('sign up', function () {
        const username = "newUser";
        const password = "123456";
        const email = "test@email.com";
        it('should register a new user', async function () {
            const spyGenerateUuid = jest.fn().mockReturnValue("validId");
            const spyHashPassword = jest.fn().mockReturnValue("PASSWORDENCRIPTED");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: jest.fn(),
                hashString: spyHashPassword
            };
            const mockTokenHelper = {
                generateToken: jest.fn(),
                decodeToken: jest.fn()
            };
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            await datasource.signUp({ username, password, email });
            expect(spyGenerateUuid).toBeCalled();
            expect(spyHashPassword).toBeCalled();
            const newUserDocument = await db.collection(db_collections_1.DbCollections.users).findOne({ id: "validId" });
            expect(newUserDocument['email']).toStrictEqual("test@email.com");
            expect(newUserDocument['username']).toStrictEqual("newUser");
        });
        it('should throw a UsernameAlreadyExists if username provided already registered in db', async function () {
            await db.collection(db_collections_1.DbCollections.users).insertOne({ "username": "registeredUsername" });
            const spyGenerateUuid = jest.fn().mockReturnValue("validId");
            const spyHashPassword = jest.fn().mockReturnValue("PASSWORDENCRIPTED");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: jest.fn(),
                hashString: spyHashPassword
            };
            const mockTokenHelper = {
                generateToken: jest.fn(),
                decodeToken: jest.fn()
            };
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            let result = datasource.signUp({ username: "registeredUsername", password, email });
            await expect(result).rejects.toThrow(new exceptions_1.UsernameAlreadyExistException());
            expect(spyGenerateUuid).not.toBeCalled();
            expect(spyHashPassword).not.toBeCalled();
        });
        it('should throw a EmailAlreadyExists if email provided already registered in db', async function () {
            await db.collection(db_collections_1.DbCollections.users).insertOne({ "email": "email@email.com" });
            const spyGenerateUuid = jest.fn().mockReturnValue("validId");
            const spyHashPassword = jest.fn().mockReturnValue("PASSWORDENCRIPTED");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: jest.fn(),
                hashString: spyHashPassword
            };
            const mockTokenHelper = {
                generateToken: jest.fn(),
                decodeToken: jest.fn()
            };
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            let result = datasource.signUp({ username, password, email: "email@email.com" });
            await expect(result).rejects.toThrowError(new exceptions_1.EmailAlreadyExistException());
            expect(spyGenerateUuid).not.toBeCalled();
            expect(spyHashPassword).not.toBeCalled();
        });
    });
    describe('sign in', function () {
        it('should sign in a user and return a valid token', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(true);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            await db.collection(db_collections_1.DbCollections.users).insertOne({
                "id": "testId",
                "username": "signInTestUsername",
                "password": "123456",
                "email": "test@email.com",
                "permission": "user"
            });
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = await datasource.signIn({
                username: "signInTestUsername",
                password: "123456"
            });
            expect(result).toStrictEqual(new auth_token_1.AuthToken({
                id: "testId",
                token: "validToken"
            }));
        });
        it('should throw a invalidcredentials if user not exists', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(true);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = datasource.signIn({
                username: "invalidUsername",
                password: "123456"
            });
            await expect(result).rejects.toStrictEqual(new exceptions_1.InvalidCredentialsException());
        });
        it('should throw a invalidcredentials if password is not valid', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(false);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            await db.collection(db_collections_1.DbCollections.users).insertOne({
                "id": "testId",
                "username": "signInTestUsername",
                "password": "123456",
                "email": "test@email.com",
                "permission": "user"
            });
            const datasource = new auth_remote_ds_1.AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = datasource.signIn({
                username: "signInTestUsername",
                password: "invalidPassword"
            });
            await expect(result).rejects.toStrictEqual(new exceptions_1.InvalidCredentialsException());
        });
    });
});
