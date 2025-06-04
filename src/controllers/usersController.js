import { ObjectId } from "mongodb";
import { getById, getMockUser, getUserStations, toggleLikedTrack, updateSavedStations } from "../services/user.service.js";

export const getUserController = async (req, res) => {
    try {
        const user = await getMockUser();
        res.status(200).json(user)
    } catch (err) {
        const errMessage = 'Could not get track URL';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const getUserStationsController = async (req, res) => {
    try {
        const userStations = await getUserStations();
        res.status(200).json(userStations);
    } catch (err) {
        console.error('Failed to load user stations');
        throw err;
    }
}
export async function toggleSavedStation(req, res) {
    try {
        const { userId, stationId } = req.body
        const user = await getById(userId)

        const stationObjectId = ObjectId.createFromHexString(stationId)
        const isAlreadySaved = user.savedStations.some(savedId => savedId.equals(stationObjectId))

        const updatedUser = await updateSavedStations(userId, stationObjectId, isAlreadySaved)

        res.status(200).json(updatedUser)
    } catch (err) {
        console.error('Failed to toggle saved station', err)
        res.status(500).send('Internal server error')
    }
}

export async function toggleLikedTrackController(req, res) {
    const { userId, trackId } = req.params
    try {
        const result = await toggleLikedTrack(userId, trackId)
        res.status(200).json(result)
    } catch (err) {
        console.error("Failed to toggle liked track", err)
        res.status(500).send('Internal server error')
    }
}
