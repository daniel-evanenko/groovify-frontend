import { getStations as getDbStations } from "../services/stationsService.js";


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
