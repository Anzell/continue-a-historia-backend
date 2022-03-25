import {Db} from "mongodb";
import {StringHelper} from "../../../core/helper/string_helper";
import {DbCollections} from "../../../core/constants/db/db_collections";
import {
    EmailAlreadyExistException,
    InvalidCredentialsException,
    UsernameAlreadyExistException
} from "../../../core/failures/exceptions";
import {UserModel} from "../../models/user_model";
import {DateHelper} from "../../../core/helper/date_helper";
import {CryptographyHelper} from "../../../core/helper/cryptography_helper";
import {AuthToken} from "../../../domain/entities/auth_token";
import {TokenHelper} from "../../../core/helper/token_helper";

export interface AuthRemoteDs {
    signUp({username, password, email}: {username: string, password: string, email: string}): Promise<void>;
    signIn({username, password}: {username: string, password: string}): Promise<AuthToken>;
}

export class AuthRemoteDsImpl implements  AuthRemoteDs {

    constructor (
        private readonly db: Db,
        private readonly stringHelper: StringHelper,
        private readonly cryptographyHelper: CryptographyHelper,
        private readonly tokenHelper: TokenHelper,
        ) {}

    async signUp ({username, password, email}: { username: string; password: string; email: string }): Promise<void> {
        if(await this.db.collection(DbCollections.users).findOne({username}) != null){
            throw new UsernameAlreadyExistException();
        }
        if(await this.db.collection(DbCollections.users).findOne({email}) != null){
            throw new EmailAlreadyExistException();
        }
        const id = this.stringHelper.generateUuid();
        const newUserData = new UserModel({id, username, email}).toJson();
        await this.db.collection(DbCollections.users).insertOne({
            ...newUserData,
            "password": await this.cryptographyHelper.hashString(password),
            "registeredAt": DateHelper.dateToNumber(new Date()),
            "permission": "user"
        });
    }

    async signIn ({username, password}: { username: string; password: string }): Promise<AuthToken> {
        const document = await this.db.collection(DbCollections.users).findOne({username});
        if(document == undefined){
            throw new InvalidCredentialsException();
        }
        if(!await this.cryptographyHelper.compareValues(password, document['password'])){
            throw new InvalidCredentialsException();
        }
        const token = this.tokenHelper.generateToken({
            "id": document['id'],
            "permission": document['permission'],
        });
        return new AuthToken({
            id: document['id'],
            token: token
        });
    }

}