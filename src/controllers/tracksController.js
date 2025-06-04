import { getNextTrackId, getPrevTrackId } from "../services/stationsService.js";
import { getStationTracks, getTrack, getTrackUrl, queryTracks } from "../services/tracksService.js";


export const getTracksController = async (req, res) => {
    try {
        const { trackIds } = req.query;
        const tracks = await getStationTracks(trackIds);
        res.status(200).json(tracks);
        
    } catch (err) {
        const errMessage = 'Could not load tracks';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const queryTracksController = async (req, res) => {
    try {
        const { searchQuery, limit } = req.query
        const searchResults = await queryTracks(searchQuery, limit)
        res.status(200).send(searchResults)

    } catch (err) {
        const errMessage = 'Could not search tracks';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const getTrackUrlController = async (req, res) => {
    try {
        const { id: trackId } = req.params
        const trackObj = await getTrack(trackId)
        const url = await getTrackUrl(trackObj)
        res.status(200).json(url)

    } catch (err) {
        const errMessage = 'Could not get track URL';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const getPreviousTrackContoller = async (req, res) => {
    try {
        const { stationId } = req.params
        const { trackId } = req.params
        const prevTrack = await getPrevTrackId(stationId, trackId)
        res.status(200).json(prevTrack)

    } catch (err) {
        const errMessage = 'Could not get previous track';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}

export const getNextTrackContoller = async (req, res) => {
    try {
        const { stationId } = req.params
        const { trackId } = req.params
        const nextTrack = await getNextTrackId(stationId, trackId)
        res.status(200).json(nextTrack)

    } catch (err) {
        const errMessage = 'Could not get next track';
        console.log(errMessage, err);
        res.status(500).send(errMessage);
    }
}