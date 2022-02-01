"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const user_entity_1 = require("../../../domain/entities/user_entity");
const db_collections_1 = require("../../../core/constants/db/db_collections");
const user_remote_ds_1 = require("./user_remote_ds");
const exceptions_1 = require("../../../core/failures/exceptions");
describe('user remote ds', function () {
    let db;
    beforeEach(async () => {
        let connection = await mongodb_1.MongoClient.connect(process.env["MONGO_URL"]);
        db = await connection.db();
    });
    describe('get user by id', function () {
        it('should return a valid user', async function () {
            const userExample = new user_entity_1.UserEntity({
                username: "anzell",
                id: "exampleId",
                email: "test@email.com"
            });
            await db.collection(db_collections_1.DbCollections.users).insertOne({
                "username": "anzell",
                "id": "exampleId",
                "email": "test@email.com"
            });
            const datasource = new user_remote_ds_1.UserRemoteDsImpl(db);
            const result = await datasource.getUserById({ id: "exampleId" });
            expect(result).toStrictEqual(userExample);
        });
        it('should throw a NotFoundException if provided id not exists in database', async function () {
            const datasource = new user_remote_ds_1.UserRemoteDsImpl(db);
            const result = datasource.getUserById({ id: "invalidId" });
            await expect(result).rejects.toStrictEqual(new exceptions_1.NotFoundException());
        });
    });
});
