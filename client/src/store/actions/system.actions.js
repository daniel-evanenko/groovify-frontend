import { SET_ACTIVE_STATION_ID, SET_IS_LOADING, SET_TRACK } from "../reducers/system.reducer.js";
import { store } from "../store.js"


export async function setIsLoading(isLoading) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading })

    } catch (err) {
        console.log('system actions -> Cannot set isLoading', err)
        throw err
    }
}

export async function setActiveStation(stationId) {
    try {
        store.dispatch({ type: SET_ACTIVE_STATION_ID, stationId })

    } catch (err) {
        console.log('system actions -> Cannot set active station', err)
        throw err
    }
}

export async function setTrack(trackId) {
    try {
        store.dispatch({ type: SET_TRACK, activeTrackId: trackId })
    } catch (err) {
        console.log('system actions -> Cannot set track', err)
        throw err
    }
}