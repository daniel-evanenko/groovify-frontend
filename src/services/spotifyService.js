import axios from "axios";

const BASE_URL = 'https://api.spotify.com/v1';
const headers = { Authorization: `Bearer ${process.env.VITE_SPOTIFY_CLIENT_ID}` };
const creds = { grant_type: "client_credentials", client_id: process.env.VITE_SPOTIFY_CLIENT_ID, client_secret: process.env.VITE_SPOTIFY_CLIENT_SECRET };

export const getStations = async () => {
    return {};
}
