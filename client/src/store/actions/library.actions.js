import { getStations } from "../../services/spotify/spotify-api.service.js"
import { stationService } from "../../services/station/station.service.js"
import { userService } from "../../services/user/user.service.js"
import { ADD_STATION, REMOVE_STATION, SET_STATIONS, UPDATE_LIBRARY_STATION } from "../reducers/library.reducer.js"
import { SET_INDEX_STATIONS, UPDATE_STATION } from "../reducers/station.reducer.js"
import { store } from "../store.js"

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
        store.dispatch({ type: ADD_STATION, station })
        return station._id
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

export async function loadUserSavedContent() {
    try {
        const likedStations = await userService.getUserLibrary()
        store.dispatch({ type: SET_STATIONS, stations: likedStations })
    } catch (err) {
        console.error('Failed to load user saved content', err)
    }
}

export async function clearLikedContent() {
    try {
        store.dispatch({ type: SET_STATIONS, stations: [] })
    } catch (err) {
        console.error('Failed to clear liked content', err)
    }
}


export async function updateStation(station) {
    try {
        const updatedStation = await stationService.update(station)
        store.dispatch({ type: UPDATE_STATION, updatedStation })
        store.dispatch({ type: UPDATE_LIBRARY_STATION, updatedStation })
    } catch (err) {
        console.log('Station actions -> Cannot save station', err)
        throw err
    }
}