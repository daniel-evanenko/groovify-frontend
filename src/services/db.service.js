import { MongoClient } from 'mongodb';

export const COLLECTION_NAMES = {
    STATIONS: 'stations',
    USERS: 'users'
}

const config = {
    dbURL: process.env.NODE_ENV === 'production' ? process.env.MONGODB_CONNECTION_STRING : 'mongodb://localhost:27017',
    dbName: 'stations_db'
}

let dbConnection;

export const getCollection = async (collectionName) => {
    try {
        const db = await _connect();
        const collection = await db.collection(collectionName).find({}).toArray();
        return collection;
    } catch (err) {
        console.log('Failed tp get Mongo collection', err);
        throw err;
    }
}


const _connect = async () => {
    if (dbConnection) return dbConnection;

    try {
        const client = await MongoClient.connect(config.dbURL);
        return client.db(config.dbName);
    } catch (err) {
        console.error('Cannot connect to DB', err)
        throw err;
    }
}