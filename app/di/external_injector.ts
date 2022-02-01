import {Db, MongoClient} from "mongodb";
import {v4 as Uuid} from "uuid";
import * as bcrypt from "bcrypt";

export class ExternalInjector {
    static mongoClient: MongoClient;

    public static async mongoInjector(): Promise<void> {
        this.mongoClient = new MongoClient(`mongodb+srv://${process.env['MONGO_USER']}:${process.env['MONGO_PASS']}@cluster0.1pnw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        await this.mongoClient.connect();
    }


    public static async dbFactory(): Promise<Db> {
        return this.mongoClient.db(`${process.env['MONGO_DB']}`);
    }

    public static uuidFactory(): typeof Uuid{
        return Uuid;
    }

    public static bcryptFactory(): typeof bcrypt{
        return bcrypt;
    }
}