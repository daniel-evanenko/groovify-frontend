import { ObjectId } from "mongodb";
import { INITIAL_STATION_PREFIX, INITIAL_STATION_PREFIX_REGEX } from "../utils/constants.js";
import { COLLECTION_NAMES, getCollection, getCollectionItem } from "./db.service.js"
import { getUserStations } from "./user.service.js";

export const getStations = async () => {
    return await getCollection(COLLECTION_NAMES.STATIONS);
}

export const createNewStation = async (stationData) => {
    const stationsCollectionInstance = await getCollection(COLLECTION_NAMES.STATIONS, {}, false);
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

export const getStation = async (stationId) => {
    const criteria = { _id: ObjectId.createFromHexString(`${stationId}`) }
    const station = await getCollectionItem(COLLECTION_NAMES.STATIONS, criteria)
    return station
}

export const getPrevTrackId = async (curStationId, curTrackId) => {
    const curStation = await getStation(curStationId)
    const curTrackIdx = curStation.tracks.findIndex(trackId => trackId === curTrackId)
    const prevTrackIdx = Math.max(0, curTrackIdx - 1)
    return curStation.tracks[prevTrackIdx]
}

export const getNextTrackId = async (curStationId, curTrackId) => {
    const curStation = await getStation(curStationId)
    const curTrackIdx = curStation.tracks.findIndex(trackId => trackId === curTrackId)
    const nextTrackIdx = Math.min(curTrackIdx + 1, curStation.tracks.length - 1)
    return curStation.tracks[nextTrackIdx]
}
