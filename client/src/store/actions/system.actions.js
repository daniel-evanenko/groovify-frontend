import { SET_ACTIVE_STATION_ID, SET_IS_LOADING, SET_MINI_TRACK, SET_TRACK_ID } from "../reducers/system.reducer.js";
import { store } from "../store.js"


export function setIsLoading(isLoading) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading })
    } catch (err) {
        console.log('system actions -> Cannot set isLoading', err)
        throw err
    }
}

export function setActiveStation(stationId) {
    try {
        store.dispatch({ type: SET_ACTIVE_STATION_ID, stationId })

    } catch (err) {
        console.log('system actions -> Cannot set active station', err)
        throw err
    }
}

export function setTrackId(trackId) {
    try {
        store.dispatch({ type: SET_TRACK_ID, activeTrackId: trackId })
    } catch (err) {
        console.log('system actions -> Cannot set track id', err)
        throw err
    }
}

export function setMiniActiveTrack(trackObj) {
    try {
        const track = trackObj.track
        const imgsCount = track.album.images.length
        const imgUrl = imgsCount ? track.album.images[imgsCount - 1].url : ""
        const minifiedTrack = { id: track.id, title: track.name, artist: track.artists[0].name, imgUrl }

        store.dispatch({ type: SET_MINI_TRACK, miniActiveTrack: minifiedTrack })
    } catch (err) {
        console.log('system actions -> Cannot set mini active track', err)
        throw err
    }
}