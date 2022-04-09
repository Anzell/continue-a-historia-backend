import {Db, MongoClient} from "mongodb";
import {UserEntity} from "../../../domain/entities/user_entity";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {UserRemoteDsImpl} from "./user_remote_ds";
import {NotFoundException} from "../../../core/failures/exceptions";

describe('user remote ds', function () {
    let db: Db;

    beforeEach(async ()=>{
        let connection = await MongoClient.connect(process.env["MONGO_URL"]!);
        db = await connection.db();
    });

    describe('get user by id',  function () {
        it('should return a valid user', async function () {
            const userExample = new UserEntity({
                username: "anzell",
                id: "exampleId",
                email: "test@email.com"
            });
            await db.collection(DbCollections.users).insertOne({
                "username": "anzell",
                "id": "exampleId",
                "email": "test@email.com"
            });
            const datasource = new UserRemoteDsImpl(db);
            const result = await datasource.getUserById({id: "exampleId"});
            expect(result).toStrictEqual(userExample);
        });

        it('should throw a NotFoundException if provided id not exists in database', async function () {
            const datasource = new UserRemoteDsImpl(db);
            const result = datasource.getUserById({id: "invalidId"});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });

    describe('get user permission',  function () {
        it('should return a valid permission', async function () {
            const expected = "user";
            await db.collection(DbCollections.users).insertOne({
                "username": "anzell",
                "id": "validPermissionId",
                "email": "test@email.com",
                "permission": expected
            });
            const datasource = new UserRemoteDsImpl(db);
            const result = await datasource.getUserPermissions({id: "validPermissionId"});
            expect(result).toStrictEqual(expected);
        });

        it('should throw a NotFoundException if provided id not exists in database', async function () {
            const datasource = new UserRemoteDsImpl(db);
            const result = datasource.getUserPermissions({id: "invalidId"});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });

    describe("get user by username", () => {
        it('should return a valid user', async function () {
            const userExample = new UserEntity({
                username: "anzell",
                id: "exampleId",
                email: "test@email.com"
            });
            await db.collection(DbCollections.users).insertOne({
                "username": "anzell",
                "id": "exampleId",
                "email": "test@email.com"
            });
            const datasource = new UserRemoteDsImpl(db);
            const result = await datasource.getUserByUsername({username: "anzell"});
            expect(result).toStrictEqual(userExample);
        });

        it('should throw a NotFoundException if provided username not exists in database', async function () {
            const datasource = new UserRemoteDsImpl(db);
            const result = datasource.getUserByUsername({username: "invalidId"});
            await expect(result).rejects.toStrictEqual(new NotFoundException());
        });
    });
});