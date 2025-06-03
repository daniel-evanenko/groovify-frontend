import { createNewStation, getNewStationDefaultName, getStations as getDbStations, getById, remove } from "../services/stationsService.js";
import { attachNewStationToUser, getMockUser, getUserStations } from "../services/user.service.js";
import { DEFAULT_IMAGE_URL } from "../utils/constants.js";


export const getStations = async (req, res) => {
    try {
        const stations = await getDbStations();
        res.status(200).json(stations);
    } catch (err) {
        const errMessage = 'Could not load stations';
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

