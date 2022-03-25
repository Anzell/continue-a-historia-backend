"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRemoteDsImpl = void 0;
const db_collections_1 = require("../../../core/constants/db/db_collections");
const exceptions_1 = require("../../../core/failures/exceptions");
const user_model_1 = require("../../models/user_model");
const date_helper_1 = require("../../../core/helper/date_helper");
const auth_token_1 = require("../../../domain/entities/auth_token");
class AuthRemoteDsImpl {
    constructor(db, stringHelper, cryptographyHelper, tokenHelper) {
        this.db = db;
        this.stringHelper = stringHelper;
        this.cryptographyHelper = cryptographyHelper;
        this.tokenHelper = tokenHelper;
    }
    async signUp({ username, password, email }) {
        if (await this.db.collection(db_collections_1.DbCollections.users).findOne({ username }) != null) {
            throw new exceptions_1.UsernameAlreadyExistException();
        }
        if (await this.db.collection(db_collections_1.DbCollections.users).findOne({ email }) != null) {
            throw new exceptions_1.EmailAlreadyExistException();
        }
        const id = this.stringHelper.generateUuid();
        const newUserData = new user_model_1.UserModel({ id, username, email }).toJson();
        await this.db.collection(db_collections_1.DbCollections.users).insertOne({
            ...newUserData,
            "password": await this.cryptographyHelper.hashString(password),
            "registeredAt": date_helper_1.DateHelper.dateToNumber(new Date()),
            "permission": "user"
        });
    }
    async signIn({ username, password }) {
        const document = await this.db.collection(db_collections_1.DbCollections.users).findOne({ username });
        if (document == undefined) {
            throw new exceptions_1.InvalidCredentialsException();
        }
        if (!await this.cryptographyHelper.compareValues(password, document['password'])) {
            throw new exceptions_1.InvalidCredentialsException();
        }
        const token = this.tokenHelper.generateToken({
            "id": document['id'],
            "permission": document['permission'],
        });
        return new auth_token_1.AuthToken({
            id: document['id'],
            token: token
        });
    }
}
exports.AuthRemoteDsImpl = AuthRemoteDsImpl;
