"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoriesInjector = void 0;
const datasource_injector_1 = require("./datasource_injector");
const room_repository_impl_1 = require("../data/repositories/room_repository_impl");
const auth_repository_impl_1 = require("../data/repositories/auth_repository_impl");
const user_repository_impl_1 = require("../data/repositories/user_repository_impl");
class RepositoriesInjector {
    static async roomRepositoryFactory() {
        const datasource = await datasource_injector_1.DatasourcesInjector.roomRemoteDsFactory();
        return new room_repository_impl_1.RoomRepositoryImpl(datasource);
    }
    static async authRepositoryFactory() {
        const datasource = await datasource_injector_1.DatasourcesInjector.authRemoteDsFactory();
        return new auth_repository_impl_1.AuthRepositoryImpl(datasource);
    }
    static async userRepositoryFactory() {
        const datasource = await datasource_injector_1.DatasourcesInjector.userRemoteDsFactory();
        return new user_repository_impl_1.UserRepositoryImpl(datasource);
    }
}
exports.RepositoriesInjector = RepositoriesInjector;
