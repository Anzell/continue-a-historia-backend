import {RoomRepository} from "../domain/repositories/room_repository";
import {DatasourcesInjector} from "./datasource_injector";
import {RoomRepositoryImpl} from "../data/repositories/room_repository_impl";
import {AuthRepository} from "../domain/repositories/auth_repository";
import {AuthRepositoryImpl} from "../data/repositories/auth_repository_impl";

export class RepositoriesInjector{
    public static async roomRepositoryFactory(): Promise<RoomRepository>{
        const datasource = await DatasourcesInjector.roomRemoteDsFactory();
        return new RoomRepositoryImpl(datasource);
    }

    public static async authRepositoryFactory(): Promise<AuthRepository> {
        const datasource = await DatasourcesInjector.AuthRemoteDsFactory();
        return new AuthRepositoryImpl(datasource);
    }
}