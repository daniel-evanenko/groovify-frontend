import axios from "axios";
import { getSpotifyToken } from "./spotify-token.service.js";
import { loadFromStorage, saveToStorage } from "../util.service.js";

const STORAGE_KEY = "categories"
const accessToken = await getSpotifyToken()

export async function getCategories() {
    let categories = loadFromStorage(STORAGE_KEY)
    try {
        if (categories && categories.length > 0) return categories

        categories = await axios.get("https://api.spotify.com/v1/browse/categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        saveToStorage(STORAGE_KEY, categories)
        return categories.data.categories.items

    } catch (err) {
        console.error(err)
        throw err
    }
}