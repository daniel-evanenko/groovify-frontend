import { createNewStation, getNewStationDefaultName, getStations as getDbStations, getById, remove, update } from "../services/stationsService.js";
import { attachNewStationToUser, getMockUser, getUserStations } from "../services/user.service.js";
import { DEFAULT_IMAGE_URL } from "../utils/constants.js";


export const queryStations = async (req, res) => {
    try {
        const { searchQuery, limit } = req.query
        if (searchQuery) {
            const searchResults = await getStations(searchQuery, limit)
            return res.status(200).json(searchResults)
        }

        const stations = await getStations();
        res.status(200).json(stations);
    } catch (err) {
        const errMessage = 'Could not search stations';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const getStation = async (req, res) => {
    const { id } = req.params
    try {
        const station = await getById(id)
        res.status(200).json(station);
    } catch (err) {
        const errMessage = 'Could not get station';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const createNewUserStation = async (req, res) => {
    try {
        const newStationName = await getNewStationDefaultName();

        const user = await getMockUser();
        const { _id: userId, fullname } = user;

        const newStation = {
            name: newStationName,
            description: '',
            public: false,
            tracks: [],
            type: "playlist",
            images: { 0: { url: DEFAULT_IMAGE_URL, height: null, width: null } },
            owner: {
                display_name: fullname,
                user_id: userId
            }
        }

        const newStationInDb = await createNewStation(newStation);

        await attachNewStationToUser(newStationInDb, user);

        const stationId = newStationInDb?._id?.toString();
        const stationSend = {
            _id: stationId,
            ...newStationInDb
        }

        res.status(200).send(stationSend);
    } catch (err) {
        console.error("Failed to create a new user station");
        res.status(500).send("Failed to create a new user station");
        throw err;
    }
}


export async function removeStation(req, res) {
    const { id } = req.params
    try {
        const user = await getMockUser();
        await remove(id, user)
        res.send('OK')
    } catch (err) {
        console.error(`Couldn't remove station ${id}`, err)
        res.status(500).send(`Couldn't remove station`)

    }
}

export async function updateStation(req, res) {
    const { station } = req.body
    try {
        const savedStation = await update(station)
        res.send(savedStation)
    } catch (err) {
        console.error(`Couldn't update station ${station._id}`, err)
        res.status(500).send(`Couldn't update station`)

    }
}