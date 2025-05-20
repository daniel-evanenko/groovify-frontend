import axios from "axios";
import { getSpotifyToken } from "./spotify-token.service.js";
import { loadFromStorage, makeId, saveToStorage } from "../util.service.js";
import { processSpotifyStations } from "../station/station.service.js";

const CATEGORIES_STORAGE_KEY = "categories"
const STATIONS_STORAGE_KEY = "stations"
export const TRACKS_STORAGE_KEY_PREFIX = "tracks"

export async function getCategories() {
    const categories = loadFromStorage(CATEGORIES_STORAGE_KEY)
    try {
        if (categories && categories.length > 0) return categories

        const accessToken = await getSpotifyToken()

        const response = await axios.get("https://api.spotify.com/v1/browse/categories?limit=50&offset=0", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const items = response.data.categories.items

        saveToStorage(CATEGORIES_STORAGE_KEY, items)
        return items

    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function getStations(queries) {
    let stations = loadFromStorage(STATIONS_STORAGE_KEY)
    try {
        if (stations && stations.length > 0) return stations

        stations = []
        const accessToken = await getSpotifyToken()


        for (const query of queries) {
            console.log(`making request for stations with query: ${query}`)
            const response = await axios.get(`https://api.spotify.com/v1/search?q=${query}&type=playlist&limit=20&offset=0`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })

            const categoryId = makeId(6)
            let items = response.data.playlists.items

            items = items.filter(item => item !== null)
            items = items.map(item => ({ ...item, category: query, categoryId })) // add categories for sorting in index

            stations.push(items)
        }
        stations = stations.flat()
        stations = processSpotifyStations(stations)

        saveToStorage(STATIONS_STORAGE_KEY, stations)
        return stations

    } catch (err) {
        console.error(err)
        throw err
    }
}

export async function getStationsTracks(stationId) {
    const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `_${stationId}`
    let tracks = loadFromStorage(STATION_TRACKS_STORAGE_KEY)
    try {
        if (tracks) return tracks

        console.log("requesting tracks for station ", stationId)
        const accessToken = await getSpotifyToken()
        const response = await axios.get(`https://api.spotify.com/v1/playlists/${stationId}/tracks?limit=20`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        if (response.data.items) {
            tracks = response.data.items
        } else {
            tracks = []
        }
        console.log(tracks)

        saveToStorage(STATION_TRACKS_STORAGE_KEY, tracks)
        return tracks


    } catch (err) {
        console.error(err)
    }
}