import { stationService } from "../../services/station/station.service.js"
import { ADD_STATION_ACTIVATE, REMOVE_STATION, SET_ACTIVE_STATION_ID, SET_STATIONS, UPDATE_LIKED_STATION } from "../reducers/library.reducer.js"
import { store } from "../store.js"

export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION_ACTIVATE, savedStation })
        return savedStation.spotifyId || savedStation._id
    } catch (err) {
        console.log('library actions -> Cannot add station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION_ACTIVATE, savedStation })
        return savedStation.spotifyId || savedStation._id
    } catch (err) {
        console.log('library actions -> Cannot add station', err)
        throw err
    }
}

export async function updateLikedStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_LIKED_STATION, station: savedStation })
        return savedStation.spotifyId || savedStation._id
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

export async function setActiveStation(stationId) {
    try {
        store.dispatch({ type: SET_ACTIVE_STATION_ID, activeStationId: stationId })
    } catch (err) {
        console.log('library actions -> Cannot set active station', err)
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
