"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatasourcesInjector = void 0;
const room_remote_ds_1 = require("../data/datasources/remote/room_remote_ds");
const external_injector_1 = require("./external_injector");
const core_injector_1 = require("./core_injector");
const auth_remote_ds_1 = require("../data/datasources/remote/auth_remote_ds");
const user_remote_ds_1 = require("../data/datasources/remote/user_remote_ds");
class DatasourcesInjector {
    static async roomRemoteDsFactory() {
        const db = await external_injector_1.ExternalInjector.dbFactory();
        const stringHelper = await core_injector_1.CoreInjector.stringHelperFactory();
        return new room_remote_ds_1.RoomRemoteDsImpl(db, stringHelper);
    }
    static async authRemoteDsFactory() {
        const db = await external_injector_1.ExternalInjector.dbFactory();
        const stringHelper = await core_injector_1.CoreInjector.stringHelperFactory();
        const cryptographyHelper = await core_injector_1.CoreInjector.cryptographyHelperFactory();
        const tokenHelper = await core_injector_1.CoreInjector.tokenHelperFactory();
        return new auth_remote_ds_1.AuthRemoteDsImpl(db, stringHelper, cryptographyHelper, tokenHelper);
    }
    static async userRemoteDsFactory() {
        const db = await external_injector_1.ExternalInjector.dbFactory();
        return new user_remote_ds_1.UserRemoteDsImpl(db);
    }
}
exports.DatasourcesInjector = DatasourcesInjector;
