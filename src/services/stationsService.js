import { INITIAL_STATION_PREFIX, INITIAL_STATION_PREFIX_REGEX } from "../utils/constants.js";
import { COLLECTION_NAMES, getCollection } from "./db.service.js"
import { getUserStations } from "./user.service.js";

export const getStations = async () => {
    return await getCollection(COLLECTION_NAMES.STATIONS);
}

export const createNewStation = async (stationData) => {
    const stationsCollectionInstance = await getCollection(COLLECTION_NAMES.STATIONS, false);
    const newStation = await stationsCollectionInstance.insertOne(stationData);
    return newStation;
}

export const getNewStationDefaultName = async () => {
    const allStations = await getUserStations();
    if (!allStations?.length) return `${INITIAL_STATION_PREFIX}1`;

    const allStationsNames = allStations.map(station => station.name)
    const nonRenamedNewStations = allStationsNames.filter(stationName => stationName.startsWith(INITIAL_STATION_PREFIX));
    const newStationNumber = nonRenamedNewStations.map(stationName => parseInt(stationName.replace(INITIAL_STATION_PREFIX_REGEX, '')))
    if (newStationNumber.length) {
        const nextId = Math.max(...newStationNumber) + 1;
        return `${INITIAL_STATION_PREFIX}${nextId}`;
    }
}
