import axios from "axios";
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 })

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export async function getUrl(query) {
    try {
        console.log("requesting URL for query: ", query)
        const response = await axios.get(BASE_URL, {
            params: {
                part: "snippet",
                q: query,
                type: "video",
                maxResults: 1,
                key: process.env.YOUTUBE_API_KEY
            }
        })

        const [videoUrl] = response.data.items.map(item => {
            const videoId = item.id.videoId
            return `https://www.youtube.com/watch?v=${videoId}`
        })

        return videoUrl
    } catch (err) {
        console.error("Error fetching YouTube videos:", err)
        return ""
    }
}