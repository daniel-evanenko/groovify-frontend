import axios from "axios"
import qs from "qs"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { readLocalFile, writeLocalFile } from "../util.service.js"

dotenv.config()

const creds = qs.stringify({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const tokenPath = path.join(__dirname, "access-token.json")


export async function getSpotifyToken() {
    try {
        const content = await readLocalFile(tokenPath)
        const { access_token, expires_at } = JSON.parse(content)

        if (Date.now() < expires_at) {
            return access_token
        }
    } catch {

    }

    const tokenData = await requestAccessToken()
    const access_token = tokenData.access_token
    const expires_at = Date.now() + tokenData.expires_in * 1000 - 60000

    await writeLocalFile(tokenPath, { access_token, expires_at })
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
