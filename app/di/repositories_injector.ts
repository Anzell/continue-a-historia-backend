import {RoomRepository} from "../domain/repositories/room_repository";
import {DatasourcesInjector} from "./datasource_injector";
import {RoomRepositoryImpl} from "../data/repositories/room_repository_impl";

export class RepositoriesInjector{
    public static async roomRepositoryFactory(): Promise<RoomRepository>{
        const datasource = await DatasourcesInjector.roomRemoteDsFactory();
        return new RoomRepositoryImpl(datasource);
    }
}