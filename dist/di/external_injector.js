"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalInjector = void 0;
const mongodb_1 = require("mongodb");
const uuid_1 = require("uuid");
const bcrypt = require("bcrypt");
class ExternalInjector {
    static async mongoInjector() {
        this.mongoClient = new mongodb_1.MongoClient(`mongodb+srv://${process.env['MONGO_USER']}:${process.env['MONGO_PASS']}@cluster0.1pnw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        await this.mongoClient.connect();
    }
    static async dbFactory() {
        return this.mongoClient.db(`${process.env['MONGO_DB']}`);
    }
    static uuidFactory() {
        return uuid_1.v4;
    }
    static bcryptFactory() {
        return bcrypt;
    }
}
exports.ExternalInjector = ExternalInjector;
