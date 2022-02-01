import {StringHelper, StringHelperImpl} from "../core/helper/string_helper";
import {ExternalInjector} from "./external_injector";
import {CryptographyHelper, CryptographyHelperImpl} from "../core/helper/cryptography_helper";
import {TokenHelper, TokenHelperImpl} from "../core/helper/token_helper";

export class CoreInjector {
    public static async stringHelperFactory(): Promise<StringHelper> {
        const stringHelper = ExternalInjector.uuidFactory();
        return new StringHelperImpl(stringHelper);
    }

    public static  cryptographyHelperFactory(): CryptographyHelper{
        const bcrypt = ExternalInjector.bcryptFactory();
        return  new CryptographyHelperImpl(bcrypt);
    }

    public static tokenHelperFactory():TokenHelper{
        return new TokenHelperImpl();
    }
}