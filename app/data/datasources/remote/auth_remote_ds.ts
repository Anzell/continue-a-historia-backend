import {Db} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {UsernameAlreadyExistException} from "../../../core/failures/exceptions";
import {UserModel} from "../../models/user_model";
import {DateHelper} from "../../../core/helper/date_helper";
import {CryptographyHelper} from "../../../core/helper/cryptography_helper";

export interface AuthRemoteDs {
    signUp({username, password, email}: {username: string, password: string, email: string}): Promise<void>;
}

export class AuthRemoteDsImpl implements  AuthRemoteDs {
    constructor (private readonly db: Db, private readonly stringHelper: StringHelper, private readonly cryptographyHelper: CryptographyHelper) {
    }

    async signUp ({username, password, email}: { username: string; password: string; email: string }): Promise<void> {
        const foundDocument = await this.db.collection(DbCollections.users).findOne({username});
        if(foundDocument != null){
            throw new UsernameAlreadyExistException();
        }
        const id = this.stringHelper.generateUuid();
        const newUserData = new UserModel({id, username, email}).toJson();
        await this.db.collection(DbCollections.users).insertOne({
            ...newUserData,
            "password": await this.cryptographyHelper.hashString(password),
            "registeredAt": DateHelper.dateToNumber(new Date())
        });
    }

}