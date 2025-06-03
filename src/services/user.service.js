import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, getCollection, updateColectionItem } from "./db.service.js"

export const getMockUser = async () => {
    try {
        const [user] = await getCollection(COLLECTION_NAMES.USERS);
        return user;
    } catch (err) {
        console.error('Failed to load user from DB');
        throw err;
    }
}

export const getUserStations = async () => {
    try {
        const user = await getMockUser();
        const { savedStations } = user;

        const setIdsCriteria = savedStations.map(savedStationId => typeof savedStationId === 'string' ? ObjectId.createFromHexString(savedStationId) : savedStationId);
        const criteria = { "_id": { "$in": [...setIdsCriteria] } };
        const userStations = await getCollection(COLLECTION_NAMES.STATIONS, criteria);

        return userStations;    
    } catch (err) {
        console.error("Failed to get user stations list.")
        throw err;
    }
}

export const attachNewStationToUser = async (newStation, userToUpdate) => {
    try {
        const { _id: newStationId } = newStation;
        const { savedStations } = userToUpdate;
        
        savedStations.push(newStationId);

        await updateColectionItem(COLLECTION_NAMES.USERS, userToUpdate);
    } catch (err) {
        console.error("Failed to update new station to user.")
    }
}
