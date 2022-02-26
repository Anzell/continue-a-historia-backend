"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptographyHelperImpl = void 0;
class CryptographyHelperImpl {
    constructor(cryptography) {
        this.cryptography = cryptography;
    }
    async compareValues(normalValue, encriptedValue) {
        return await this.cryptography.compare(normalValue, encriptedValue);
    }
    async hashString(value) {
        return await this.cryptography.hash(value, Number.parseInt(process.env['CRYPTOGRAPHY_SALT_ROUNDS']));
    }
}
exports.CryptographyHelperImpl = CryptographyHelperImpl;
