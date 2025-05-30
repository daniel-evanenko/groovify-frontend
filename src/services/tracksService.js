import { COLLECTION_NAMES, getCollection } from "./db.service.js"

export const getTracks = async (trackIds) => {
    try {
        const trackIdsArr = Object.values(trackIds || {});
        
        const tracks = await getCollection(COLLECTION_NAMES.TRACKS);
        if (!trackIdsArr.length) return tracks;

        const filteredTracks = tracks.filter(track => trackIdsArr.includes(track.spotifyId))
        return filteredTracks
    } catch (err) {
        console.error('Failed to get tracks from DB');
        throw err;
    }
}
