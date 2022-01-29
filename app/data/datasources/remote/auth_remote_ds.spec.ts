import {AuthRemoteDsImpl} from "./auth_remote_ds";
import {Db, MongoClient} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {CryptographyHelper} from "../../../core/helper/cryptography_helper";

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
            const datasource = new AuthRemoteDsImpl(db, mockStringHelper, mockCryptographyHelper);
            await datasource.signUp({username,password,email});
            expect(spyGenerateUuid).toBeCalled();
            expect(spyHashPassword).toBeCalled();
            const newUserDocument = await db.collection(DbCollections.users).findOne({id: "validId"});
            expect(newUserDocument!['email']).toStrictEqual("test@email.com");
        });
    });
});