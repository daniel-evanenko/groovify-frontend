import { COLLECTION_NAMES, getCollection, getCollectionItem, updateColectionItem } from "./db.service.js"
import { getUrl } from "./youtubeService.js"


export const getTracks = async (trackIds) => {
    try {
        const trackIdsArr = Object.values(trackIds || {});

        const tracks = await getCollection(COLLECTION_NAMES.TRACKS);
        if (!trackIdsArr.length) return tracks;

        const filteredTracks = tracks.filter(trackObj => trackIdsArr.includes(trackObj.spotifyId))
        return filteredTracks
    } catch (err) {
        console.error('Failed to get tracks from DB');
        throw err;
    }
}

export const getTrack = async (trackId) => {
    try {
        const criteria = { spotifyId: trackId }
        const trackObj = getCollectionItem(COLLECTION_NAMES.TRACKS, criteria)
        return trackObj
        
    } catch (err) {
        console.error("Failed to find track with id: ", trackId)
        throw err
    }
}

export const getTrackUrl = async (trackObj) => {
    try {
        if (trackObj.playUrl) return trackObj.playUrl

        const query = `${trackObj.track.name} by ${trackObj.track.artists[0].name}`
        const playUrl = await getUrl(query)

        saveUrlToTrack(trackObj, playUrl)
        return playUrl
    } catch (err) {
        console.error("Failed to get url for track")
        throw err
    }
}

export const saveUrlToTrack = async (trackObj, playUrl) => {
    try {
        const trackToSave = { ...trackObj, playUrl }
        updateColectionItem(COLLECTION_NAMES.TRACKS, trackToSave)
    } catch (err) {
        console.error("failed to save url to track")
        throw err
    }
}