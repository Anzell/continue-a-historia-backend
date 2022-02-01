import * as bcrypt from "bcrypt";

export interface CryptographyHelper {
    hashString: (value: string) => Promise<string>;
    compareValues: (normalValue: string, encriptedValue: string) => Promise<boolean>;
}

export class CryptographyHelperImpl implements CryptographyHelper {
    constructor (private readonly cryptography: typeof bcrypt) {
    }

    async compareValues (normalValue: string, encriptedValue: string): Promise<boolean> {
        return await this.cryptography.compare(normalValue, encriptedValue);
    }

    async hashString (value: string): Promise<string> {
        return await this.cryptography.hash(value, Number.parseInt(process.env['CRYPTOGRAPHY_SALT_ROUNDS']!));
    }

}