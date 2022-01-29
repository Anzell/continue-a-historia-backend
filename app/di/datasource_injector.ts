import {RoomRemoteDs, RoomRemoteDsImpl} from "../data/datasources/remote/room_remote_ds";
import {ExternalInjector} from "./external_injector";
import {CoreInjector} from "./core_injector";
import {AuthRemoteDs, AuthRemoteDsImpl} from "../data/datasources/remote/auth_remote_ds";

export class DatasourcesInjector {
    public static async roomRemoteDsFactory (): Promise<RoomRemoteDs> {
        const db = await ExternalInjector.mongoFactory();
        const stringHelper = await CoreInjector.stringHelperFactory();
        return new RoomRemoteDsImpl(db, stringHelper);
    }

    public static async AuthRemoteDsFactory(): Promise<AuthRemoteDs> {
        const db = await ExternalInjector.mongoFactory();
        const stringHelper = await CoreInjector.stringHelperFactory();
        const cryptographyHelper = await CoreInjector.cryptographyHelperFactory();
        return new AuthRemoteDsImpl(db, stringHelper, cryptographyHelper);
    }

}