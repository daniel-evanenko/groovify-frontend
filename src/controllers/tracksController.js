import { getTracks } from "../services/tracksService.js";


export const getTracksController = async (req, res) => {
    try {
        const { trackIds } = req.query;
        const tracks = await getTracks(trackIds);
        res.status(200).json(tracks);
    } catch (err) {
        const errMessage = 'Could not load tracks';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}
