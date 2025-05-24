import { getStations } from "../services/spotifyService.js";

export const getSpotifyPlaylist = async (req, res) => {

    const { body = {} } = req || {};
    const { query } = body;
    
    const stations = await getStations(query);

    // res.status(200).json(stations)
    res.send('spotify route exists');
}
