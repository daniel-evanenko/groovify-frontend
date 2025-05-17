import axios from "axios";
import { getSpotifyToken } from "./spotify-token.service.js";
import { loadFromStorage, saveToStorage } from "../util.service.js";

const STORAGE_KEY = "categories"

export async function getCategories() {
    console.log("trying to get categories")
    let categories = loadFromStorage(STORAGE_KEY)
    try {
        if (categories && categories.length > 0) return categories

        const accessToken = await getSpotifyToken()

        const response = await axios.get("https://api.spotify.com/v1/browse/categories", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const items = response.data.categories.items

        saveToStorage(STORAGE_KEY, items)
        return items

    } catch (err) {
        console.error(err)
        throw err
    }
}