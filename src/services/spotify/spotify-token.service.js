import axios from "axios"
import qs from "qs"
import { loadFromStorage, saveToStorage } from "../util.service"


const STORAGE_KEY = "access-token"
const creds = qs.stringify({
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
})

export async function getSpotifyToken() {
    try {
        const content = loadFromStorage(STORAGE_KEY)

        const { access_token, expires_at } = JSON.parse(content)

        if (Date.now() < expires_at) {
            return access_token
        }
    } catch {

    }

    const tokenData = await requestAccessToken()
    const access_token = tokenData.access_token
    const expires_at = Date.now() + tokenData.expires_in * 1000 - 60000

    saveToStorage(STORAGE_KEY, { access_token, expires_at })

    return access_token
}

async function requestAccessToken() {
    try {
        console.log("requesting new token")
        const response = await axios.post("https://accounts.spotify.com/api/token", creds, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        return response.data

    } catch (err) {
        console.error(err)
    }
}
