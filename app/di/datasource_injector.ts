import {RoomRemoteDs, RoomRemoteDsImpl} from "../data/datasources/remote/room_remote_ds";
import {ExternalInjector} from "./external_injector";
import {CoreInjector} from "./core_injector";

export class DatasourcesInjector {
    public static async roomRemoteDsFactory (): Promise<RoomRemoteDs> {
        const db = await ExternalInjector.mongoFactory();
        const stringHelper = await CoreInjector.stringHelperFactory();
        return new RoomRemoteDsImpl(db, stringHelper);
    }

}