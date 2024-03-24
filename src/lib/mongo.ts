import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGO_URI;
const DBName = process.env.DB_NAME;

if (!mongoUri) {
    throw new Error("MONGO_URI is not defined");
}

if (!DBName) {
    throw new Error("DB_NAME is not defined");
}

const client = new MongoClient(mongoUri);

export async function connect() {
    await client.connect();
    return client.db(DBName);
}
