import { ObjectId } from "mongodb";
import { COLLECTION_NAMES, getCollection, queryCollection, updateColectionItem } from "./db.service.js"

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
        const userStations = await queryCollection(COLLECTION_NAMES.STATIONS, criteria);


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
export async function getById(userId) {
    try {
        const criteria = { _id: ObjectId.createFromHexString(userId) }
        const collection = await getCollection(COLLECTION_NAMES.USERS, false)
        const user = await collection.findOne(criteria)
        return user
    } catch (err) {
        console.error(`while finding user by id: ${userId}`, err)
        throw err
    }
}



export async function updateSavedStations(userId, stationId, isRemoving) {
    const userCollection = await getCollection(COLLECTION_NAMES.USERS, false)
    const updateOp = isRemoving
        ? { $pull: { savedStations: stationId } }
        : { $addToSet: { savedStations: stationId } }

    await userCollection.updateOne({ _id: ObjectId.createFromHexString(userId) }, updateOp)

    return await getById(userId)
}

export async function toggleLikedTrack(userId, trackId) {
    try {
        const [userCollection, stationCollection] = await Promise.all([
            getCollection(COLLECTION_NAMES.USERS, false),
            getCollection(COLLECTION_NAMES.STATIONS, false)
        ]);

        const userObjectId = ObjectId.createFromHexString(userId);
        const user = await userCollection.findOne(
            { _id: userObjectId },
            { projection: { likedTracksStationId: 1 } }
        );

        if (!user?.likedTracksStationId) {
            throw new Error("User or likedTracksStationId not found");
        }

        const stationId = user.likedTracksStationId;
        const station = await stationCollection.findOne(
            { _id: stationId },
            { projection: { tracks: 1 } }
        );

        if (!station) {
            throw new Error("Liked station not found");
        }

        const updateOperation = station.tracks.includes(trackId)
            ? { $pull: { tracks: trackId } }
            : { $addToSet: { tracks: trackId } };

        const action = station.tracks.includes(trackId) ? 'unliked' : 'liked';

        await stationCollection.updateOne({ _id: stationId }, updateOperation);

        return { action, trackId };
    } catch (err) {
        console.error('Error toggling liked track:', err);
        throw err;
    }
}

