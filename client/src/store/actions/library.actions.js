import { getStations } from "../../services/spotify/spotify-api.service.js"
import { stationService } from "../../services/station/station.service.js"
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_LIBRARY_STATION } from "../reducers/library.reducer.js"
import { SET_INDEX_STATIONS, UPDATE_STATION } from "../reducers/station.reducer.js"
import { store } from "../store.js"
import { updateUser } from "./user.actions.js"

export async function loadStations() {
    const queries = ["Top Lists", "Featured Playlists", "Summer", "Workout", "Mood", "Trending",
        "Travel", "Tastemakers", "Decades", "Pop", "Classical", "Gaming"]

    try {
        const stations = await getStations(queries)
        store.dispatch({ type: SET_INDEX_STATIONS, stations })

    } catch (err) {
        console.error('library actions -> Cannot load stations', err)
        throw err;
    }
}

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION, savedStation })

        return savedStation._id
    } catch (err) {
        console.log('library actions -> Cannot add station', err)
        throw err
    }
}

export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
        store.dispatch({ type: REMOVE_STATION, stationId })

    } catch (err) {
        console.log('library actions -> Cannot remove station', err)
        throw err
    }
}

export async function fetchLikedContent(user) {
    try {
        const likedStations = await stationService.getStationsById(user.likedStationIds)
        store.dispatch({ type: SET_STATIONS, stations: likedStations })
    } catch (err) {
        console.error('Failed to fetch liked content', err)
    }
}

export async function clearLikedContent() {
    try {
        store.dispatch({ type: SET_STATIONS, stations: [] })
    } catch (err) {
        console.error('Failed to clear liked content', err)
    }
}

export async function toggleLikeStation(stationToToggle) {
    try {
        const state = store.getState()

        const user = { ...state.userModule.user }
        const stationId = stationToToggle._id

        if (!user || !stationId) {
            console.error("❌ Missing user or station ID.")
            return
        }

        const isAlreadyLiked =
            Array.isArray(user.likedStationIds) &&
            user.likedStationIds.some(id => id === stationId)

        console.log(`🔍 Station is ${isAlreadyLiked ? "already" : "not yet"} liked`)

        let updatedStations = []
        if (isAlreadyLiked) {
            updatedStations = user.likedStationIds.filter(id => id != stationId)
            console.log("🧹 Station removed from Liked Stations.")
        } else {
            updatedStations = [stationToToggle._id, ...user.likedStationIds]
            console.log("❤️ Station added to Liked Stations.")
        }
        user.likedStationIds = updatedStations
        updateUser(user)

    } catch (error) {
        console.error("❌ Error in toggleLikeTrack:", error)
    }
}

export async function saveLibraryStation(station) {
    try {
        const updatedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_LIBRARY_STATION, updatedStation })
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })

    } catch (error) {
        console.log('Station actions -> Cannot save station', error)
        throw err
    }
}