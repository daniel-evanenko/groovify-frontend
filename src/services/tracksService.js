import { COLLECTION_NAMES, getCollectionItem, queryCollection, updateColectionItem } from "./db.service.js"
import { getUrl } from "./youtubeService.js"


export const getStationTracks = async (trackIds) => {
    try {
        if (!Array.isArray(trackIds) || !trackIds.length) return [];

        const criteria = { spotifyId: { $in: trackIds } };
        const tracks = await queryCollection(COLLECTION_NAMES.TRACKS, criteria, 10);

        return tracks;
    } catch (err) {
        console.error('Failed to get tracks from DB:', err);
        throw err;
    }
};

export const queryTracks = async (query = "", limit = null) => {
    if (query) {
        const pipeline = [
            {
                $match: {
                    $or: [
                        { "track.name": { $regex: `${query}`, $options: "i" } },
                        { "track.artists": { 
                            $elemMatch: { 
                                "name": { $regex: `${query}`, $options: "i" } 
                            }
                        }}
                    ]
                }
            },
            {
                $group: {
                    _id: {
                        name: "$track.name",
                    },
                    track: { $first: "$$ROOT" }
                }
            },
            {
                $replaceRoot: { newRoot: "$track" }
            }
        ]

        if (limit) {
            pipeline.push({ $limit: +limit })
        }

        return await queryCollection(COLLECTION_NAMES.TRACKS, pipeline, null, true)
    }

    return []
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