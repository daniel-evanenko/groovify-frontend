import axios from "axios";

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
const headers = { Authorization: `Bearer ${process.env.VITE_YOUTUBE_API_KEY}` };

export const getTrack = async (trackId) => {
    return {};
}
