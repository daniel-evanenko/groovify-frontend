import axios from "axios"
import { addYtUrlsToTrack, getTrackYtUrls } from "../station/station.service"

export async function getYtVideoUrls(stationId, trackId, query) {
    const API_URL = "https://www.googleapis.com/youtube/v3/search"

    try {
        const trackYtUrls = getTrackYtUrls(stationId, trackId)
        if (trackYtUrls) return trackYtUrls

        console.log(`requesting video URLs from youtube for track (${trackId}) in station (${stationId}))`)
        const response = await axios.get(API_URL, {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 1,
                key: import.meta.env.VITE_YOUTUBE_API_KEY
            }
        })

        const videoUrls = response.data.items.map(item => {
            const videoId = item.id.videoId
            return `https://www.youtube.com/watch?v=${videoId}`
        })

        addYtUrlsToTrack(stationId, trackId, videoUrls)
        return videoUrls

    } catch (err) {
        console.error("Error fetching YouTube videos:", err)
        return []
    }
}
