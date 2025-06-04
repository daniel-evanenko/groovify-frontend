import { ObjectId } from "mongodb";
import { INITIAL_STATION_PREFIX, INITIAL_STATION_PREFIX_REGEX } from "../utils/constants.js";
import { COLLECTION_NAMES, getCollection, getCollectionItem, queryCollection } from "./db.service.js"
import { getUserStations } from "./user.service.js";

export const getStations = async (query = "", limit = null) => {
    if (query) {
        const criteria = { $or: [ { name: { $regex: `${query}`, $options: "i" } }, { description: { $regex: `${query}`, $options: "i" } } ] }
        const _limit = limit ? +limit : null
        return await queryCollection(COLLECTION_NAMES.STATIONS, criteria, _limit)
    }

    return await getCollection(COLLECTION_NAMES.STATIONS)
}

export const createNewStation = async (stationData) => {
    const stationsCollectionInstance = await getCollection(COLLECTION_NAMES.STATIONS, false);
    const { insertedId = '' } = await stationsCollectionInstance.insertOne(stationData);

    const searchedId = typeof insertedId === 'string' ? ObjectId.createFromHexString(insertedId) : insertedId;
    const newStation = await stationsCollectionInstance.findOne({ _id: searchedId })

    return newStation;
}

export const getNewStationDefaultName = async () => {
    const allStations = await getUserStations();
    if (!allStations?.length) return `${INITIAL_STATION_PREFIX}1`;

    const allStationsNames = allStations.map(station => station.name)
    const nonRenamedNewStations = allStationsNames.filter(stationName => stationName.startsWith(INITIAL_STATION_PREFIX));
    if (!nonRenamedNewStations?.length) return `${INITIAL_STATION_PREFIX}1`;

    const newStationNumber = nonRenamedNewStations.map(stationName => parseInt(stationName.replace(INITIAL_STATION_PREFIX_REGEX, '')))
    if (newStationNumber.length) {
        const nextId = Math.max(...newStationNumber) + 1;
        return `${INITIAL_STATION_PREFIX}${nextId}`;
    }
}

export const getById = async (stationId) => {
    const criteria = { _id: ObjectId.createFromHexString(`${stationId}`) }
    const station = await getCollectionItem(COLLECTION_NAMES.STATIONS, criteria)
    return station
}

export const getPrevTrackId = async (curStationId, curTrackId) => {
    const curStation = await getById(curStationId)
    const curTrackIdx = curStation.tracks.findIndex(trackId => trackId === curTrackId)
    const prevTrackIdx = Math.max(0, curTrackIdx - 1)
    return curStation.tracks[prevTrackIdx]
}

export const getNextTrackId = async (curStationId, curTrackId) => {
    const curStation = await getById(curStationId)
    const curTrackIdx = curStation.tracks.findIndex(trackId => trackId === curTrackId)
    const nextTrackIdx = Math.min(curTrackIdx + 1, curStation.tracks.length - 1)
    return curStation.tracks[nextTrackIdx]
}

export async function remove(stationId, user) {
    try {
        const stationCollection = await getCollection(COLLECTION_NAMES.STATIONS, {}, false)
        const userCollection = await getCollection(COLLECTION_NAMES.USERS, {}, false)
        const stationObjectId = ObjectId.createFromHexString(stationId)

        const res = await stationCollection.deleteOne({ _id: stationObjectId })
        if (res.deletedCount === 0) {
            throw new Error(`Station ${stationId} not found.`)
        }

        await userCollection.updateOne(
            { _id: user._id },
            { $pull: { savedStations: stationObjectId } }
        )




        return stationId
    } catch (err) {
        console.error(`Cannot remove station ${stationId}`, err)
        throw err
    }
}

export async function update(station) {
    try {
        const stationId = ObjectId.createFromHexString(station._id)
        const stationToUpdate = { ...station } // create a shallow copy
        delete stationToUpdate._id // remove _id before updating Mongo

        const collection = await getCollection(COLLECTION_NAMES.STATIONS, {}, false)
        await collection.updateOne({ _id: stationId }, { $set: stationToUpdate })

        // Return the updated station with _id re-attached
        return { ...stationToUpdate, _id: stationId.toString() }
    } catch (err) {
        console.error(`cannot update station ${station._id}`, err)
        throw err
    }
}
