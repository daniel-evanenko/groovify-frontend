import { getStationsTracks } from "../../services/spotify/spotify-api.service.js"
import { stationService } from "../../services/station/station.service.js"
import { makeId } from "../../services/util.service.js"
import { ADD_TRACK_TO_STATION, REMOVE_TRACK_FROM_STATION, SET_STATION, SET_TRACKS, UPDATE_STATION } from "../reducers/station.reducer.js"
import { store } from "../store.js"


export async function addTrackToStation(track, stationId) {

    try {
        const trackToAdd = await stationService.addTrackToStation(track, stationId)
        store.dispatch({ type: ADD_TRACK_TO_STATION, track: trackToAdd })

    } catch (err) {
        console.log('Station actions -> Cannot add track to station', err)
        throw err
    }
}

export async function removeTrackFromStation(trackId, stationId) {
    try {
        await stationService.removeTrackFromStation(trackId, stationId)
        store.dispatch({ type: REMOVE_TRACK_FROM_STATION, trackId })

    } catch (err) {
        console.log('Station actions -> Cannot remove track from station', err)
        throw err
    }
}
export async function removeStation(stationId) {
    try {
        await stationService.remove(stationId)
    } catch (err) {
        console.log('Station actions -> Cannot remove station', err)
        throw err
    }
}



export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        const tracks = await getStationsTracks(stationId)
        store.dispatch({ type: SET_STATION, station })
        store.dispatch({ type: SET_TRACKS, tracks })

    } catch (error) {
        console.log('Station actions -> Cannot load station', error)
        throw err
    }
}
export async function saveStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: savedStation })

    } catch (error) {
        console.log('Station actions -> Cannot save station', error)
        throw err
    }
}
export function clearStation() {
    try {
        store.dispatch({ type: SET_STATION, station: null })
    } catch (error) {
        console.log('Station actions -> Cannot clear station', error)
        throw err
    }
}


