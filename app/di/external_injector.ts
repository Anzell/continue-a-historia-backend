import {Db, MongoClient} from "mongodb";
import {v4 as Uuid} from "uuid";

export class ExternalInjector {
    public static async mongoFactory(): Promise<Db> {
        const mongoClient: MongoClient = new MongoClient(`mongodb+srv://${process.env['MONGO_USER']}:${process.env['MONGO_PASS']}@cluster0.1pnw2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
        await mongoClient.connect();
        return mongoClient.db(`${process.env['MONGO_DB']}`);
    }

    public static uuidFactory(): typeof Uuid{
        return Uuid;
    }
}