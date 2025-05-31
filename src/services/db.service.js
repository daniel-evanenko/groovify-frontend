import { MongoClient, ObjectId } from 'mongodb';

export const COLLECTION_NAMES = {
    STATIONS: 'stations',
    TRACKS: 'tracks',
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
        console.error('Failed to get DB collection', err);
        throw err;
    }
}

export const getCollectionItem = async (collectionName, criteria) => {
    try {
        const db = await _connect();
        const item = await db.collection(collectionName).findOne(criteria)
        return item
    } catch (err) {
        console.error("failed to get collection item")
        throw err
    }
}

export const updateColectionItem = async (collectionName, item) => {
    try {
        console.log(item._id)
        const criteria = { _id: item._id }
        console.log(criteria)
        const db = await _connect()
        await db.collection(collectionName).updateOne(criteria, { $set: item })

    } catch (err) {
        console.error("failed to update collection item")
        throw err
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
