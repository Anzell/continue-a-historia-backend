"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreInjector = void 0;
const string_helper_1 = require("../core/helper/string_helper");
const external_injector_1 = require("./external_injector");
const cryptography_helper_1 = require("../core/helper/cryptography_helper");
const token_helper_1 = require("../core/helper/token_helper");
class CoreInjector {
    static async stringHelperFactory() {
        const stringHelper = external_injector_1.ExternalInjector.uuidFactory();
        return new string_helper_1.StringHelperImpl(stringHelper);
    }
    static cryptographyHelperFactory() {
        const bcrypt = external_injector_1.ExternalInjector.bcryptFactory();
        return new cryptography_helper_1.CryptographyHelperImpl(bcrypt);
    }
    static tokenHelperFactory() {
        return new token_helper_1.TokenHelperImpl();
    }
}
exports.CoreInjector = CoreInjector;
