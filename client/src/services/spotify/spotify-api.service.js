import axios from "axios";
import { getSpotifyToken } from "./spotify-token.service.js";
import { loadFromStorage, makeId, saveToStorage } from "../util.service.js";
import { processSpotifyStations, stationService } from "../station/station.service.js";
import { store } from "../../store/store.js";

const CATEGORIES_STORAGE_KEY = "categories"
const STATIONS_STORAGE_KEY = "stations"
export const TRACKS_STORAGE_KEY_PREFIX = "tracks_"

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
    const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${stationId}`
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

        saveToStorage(STATION_TRACKS_STORAGE_KEY, tracks)
        return tracks


    } catch (err) {
        console.error(err)
    }
}

export async function searchTracks(query, limit = 10, offset = 0) {
    const name = query.trim()
    if (!name) return []
    try {

        const accessToken = await getSpotifyToken()
        const encodedQuery = encodeURIComponent(name)
        const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=${limit}&offset=${offset}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        let tracks = []
        if (response.data.tracks) {
            tracks = response.data.tracks.items.map(wrapSpotifyTrack)
            tracks = await _filterOutLikedTracks(tracks)

        } else {
            tracks = []
        }
        return tracks
    } catch (error) {
        console.error(`error searching a track with query ${name}`, error)
    }


    async function _filterOutLikedTracks(tracks) {
        try {
            const user = store.getState()?.userModule?.user
            const userLikedTracks = await stationService.getStationTracks(user.likedTracksStationId)
            if (userLikedTracks?.length <= 0) return tracks
            const likedTrackIds = new Set(
                userLikedTracks.map(liked => liked.track?.id)
            )
            return tracks.filter(t => !likedTrackIds.has(t.track?.id))
        } catch (error) {
            console.log('error filtering out liked tracks', error)
        }


    }

}
export function wrapSpotifyTrack(track) {
    return {
        added_at: new Date().toISOString(),
        added_by: {
            id: 'search-ui',
            type: 'user',
            uri: '',
            external_urls: {},
        },
        is_local: false,
        track,
        video_thumbnail: {
            url: null,
        },
    }
}