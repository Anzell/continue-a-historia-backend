import {StringHelper, StringHelperImpl} from "../core/helper/string_helper";
import {ExternalInjector} from "./external_injector";

export class CoreInjector {
    public static async stringHelperFactory(): Promise<StringHelper> {
        const stringHelper = ExternalInjector.uuidFactory();
        return new StringHelperImpl(stringHelper);
    }
}