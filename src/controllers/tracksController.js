import { getTrack, getTracks, getTrackUrl } from "../services/tracksService.js";


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

export const getTrackUrlController = async (req, res) => {
    try {
        const { id: trackId } = req.params

        const trackObj = await getTrack(trackId)
        console.log(trackObj)
        const url = await getTrackUrl(trackObj)
        console.log(url)
        
        res.status(200).json(url)
    } catch (err) {
        const errMessage = 'Could not get track URL';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}
