import { getTrack } from '../services/youtubeService.js'

export const getTrackToPlay = async (req, res) => {

    const { body = {} } = req || {};
    const { trackId } = body;
    
    const track = await getTrack(trackId);

    // res.status(200).json(stations)
    res.send('youtube route exists');
}
