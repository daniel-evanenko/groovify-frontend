import { COLLECTION_NAMES, getCollection } from "./db.service.js"

export const getTracks = async (trackIds) => {
    try {
        const allIds = Object.values(trackIds || {});
        
        const tracks = await getCollection(COLLECTION_NAMES.TRACKS);
        if (!allIds.length) return tracks;

        return tracks.filter(track => allIds.includes(track.spotifyId));
    } catch (err) {
        console.error('Failed to get tracks from DB');
        throw err;
    }
}
