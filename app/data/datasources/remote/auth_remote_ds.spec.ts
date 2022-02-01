import {AuthRemoteDsImpl} from "./auth_remote_ds";
import {Db, MongoClient} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {CryptographyHelper} from "../../../core/helper/cryptography_helper";
import {TokenHelper} from "../../../core/helper/token_helper";
import {AuthToken} from "../../../domain/entities/auth_token";
import {InvalidCredentialsException} from "../../../core/failures/exceptions";

describe('auth remote ds', function () {
    let db: Db;

    beforeEach(async () => {
       const mongoClient = await MongoClient.connect(process.env['MONGO_URL']!);
       db = mongoClient.db();
    });

    describe('sign up', function () {
        const username: string = "anzell";
        const password: string = "123456";
        const email: string = "test@email.com";

        it('should register a new user', async function () {
            const spyGenerateUuid = jest.fn().mockReturnValue("validId");
            const spyHashPassword = jest.fn().mockReturnValue("PASSWORDENCRIPTED");
            const mockStringHelper: StringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper: CryptographyHelper = {
              compareValues: jest.fn(),
              hashString: spyHashPassword
            };
            const mockTokenHelper: TokenHelper = {
              generateToken: jest.fn(),
                decodeToken: jest.fn()
            };
            const datasource = new AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            await datasource.signUp({username,password,email});
            expect(spyGenerateUuid).toBeCalled();
            expect(spyHashPassword).toBeCalled();
            const newUserDocument = await db.collection(DbCollections.users).findOne({id: "validId"});
            expect(newUserDocument!['email']).toStrictEqual("test@email.com");
        });
    });

    describe('sign in',  function () {
        it('should sign in a user and return a valid token', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(true);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper: StringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper: CryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper: TokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            await db.collection(DbCollections.users).insertOne({
                "id": "testId",
                "username": "signInTestUsername",
                "password": "123456",
                "email": "test@email.com",
                "permission": "user"
            });
            const datasource = new AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = await datasource.signIn({
                username: "signInTestUsername",
                password: "123456"
            });
            expect(result).toStrictEqual(new AuthToken({
                id: "testId",
                token: "validToken"
            }))
        });

        it('should throw a invalidcredentials if user not exists', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(true);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper: StringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper: CryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper: TokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            const datasource = new AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = datasource.signIn({
                username: "invalidUsername",
                password: "123456"
            });
            await expect(result).rejects.toStrictEqual(new InvalidCredentialsException());
        });

        it('should throw a invalidcredentials if password is not valid', async function () {
            const spyGenerateUuid = jest.fn();
            const spyComparePassword = jest.fn().mockReturnValue(false);
            const spyTokenGenerated = jest.fn().mockReturnValue("validToken");
            const mockStringHelper: StringHelper = {
                generateUuid: spyGenerateUuid
            };
            const mockCryptographyHelper: CryptographyHelper = {
                compareValues: spyComparePassword,
                hashString: jest.fn()
            };
            const mockTokenHelper: TokenHelper = {
                generateToken: spyTokenGenerated,
                decodeToken: jest.fn()
            };
            await db.collection(DbCollections.users).insertOne({
                "id": "testId",
                "username": "signInTestUsername",
                "password": "123456",
                "email": "test@email.com",
                "permission": "user"
            });
            const datasource = new AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper, mockTokenHelper);
            const result = datasource.signIn({
                username: "signInTestUsername",
                password: "invalidPassword"
            });
            await expect(result).rejects.toStrictEqual(new InvalidCredentialsException());
        });
    });
});