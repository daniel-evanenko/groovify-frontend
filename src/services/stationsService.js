import { COLLECTION_NAMES, getCollection } from "./db.service.js"

export const getStations = async () => {
    return await getCollection(COLLECTION_NAMES.STATIONS);
}
