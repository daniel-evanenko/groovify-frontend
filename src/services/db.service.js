import { MongoClient } from 'mongodb';

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
export const getCollection = async (collectionName, parsed = true) => {
    try {
        const db = await _connect();
        const collection = db.collection(collectionName);
        const collectionParsed = collection.find().toArray();
        return parsed ? collectionParsed : collection;

    } catch (err) {
        console.error('Failed to get DB collection', err);
        throw err;
    }
}

export const queryCollection = async (collectionName, criteria = {}, limit = null, isAggregation = false) => {
    try {
        const collection = await getCollection(collectionName, false)

        let results
        if (isAggregation) {
            results = collection.aggregate(criteria)
        } else {
            results = collection.find(criteria)
            if (limit) results = results.limit(limit)
        }

        return results.toArray()

    } catch (err) {
        console.error(err)
        throw err
    }
}

export const getCollectionItem = async (collectionName, criteria) => {
    try {
        const db = await _connect();
        const item = await db.collection(collectionName).findOne(criteria);
        return item
    } catch (err) {
        console.error("failed to get collection item")
        throw err
    }
}

export const updateColectionItem = async (collectionName, item) => {
    try {
        const criteria = { _id: item._id }
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
        return dbConnection = client.db(config.dbName);
    } catch (err) {
        console.error('Cannot connect to DB', err)
        throw err;
    }
}
