"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRemoteDsImpl = void 0;
const db_collections_1 = require("../../../core/constants/db/db_collections");
const exceptions_1 = require("../../../core/failures/exceptions");
const user_mapper_1 = require("../../mappers/user_mapper");
const user_model_1 = require("../../models/user_model");
class UserRemoteDsImpl {
    constructor(db) {
        this.db = db;
    }
    async getUserPermissions({ id }) {
        const document = await this.db.collection(db_collections_1.DbCollections.users).findOne({ id });
        if (document == undefined) {
            throw new exceptions_1.NotFoundException();
        }
        return document['permission'];
    }
    async getUserById({ id }) {
        const document = await this.db.collection(db_collections_1.DbCollections.users).findOne({ id });
        if (document == undefined) {
            throw new exceptions_1.NotFoundException();
        }
        return user_mapper_1.UserMapper.modelToEntity(user_model_1.UserModel.fromJson(document));
    }
}
exports.UserRemoteDsImpl = UserRemoteDsImpl;
