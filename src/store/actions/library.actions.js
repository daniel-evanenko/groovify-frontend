import { stationService } from "../../services/station/station.service.js"
import { ADD_STATION_ACTIVATE, REMOVE_STATION, SET_ACTIVE_STATION_ID, SET_STATIONS, SET_TRACKS } from "../reducers/library.reducer.js"
import { store } from "../store.js"


export async function addStation(station) {
    try {
        const savedStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION_ACTIVATE, savedStation })
        return savedStation.spotifyId
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
// setting station as active causes the main section to render it.
export async function setActiveStation(stationId) {
    try {
        store.dispatch({ type: SET_ACTIVE_STATION_ID, stationId })

    } catch (err) {
        console.log('library actions -> Cannot set active station', err)
        throw err
    }
}



export async function fetchLikedContent(user) {
    try {
        const [likedTracks, likedStations] = await Promise.all([
            stationService.getTracksById(user.likedTrackIds),
            stationService.getStationsById(user.likedStationIds)
        ])
        store.dispatch({ type: SET_TRACKS, likedTracks })
        store.dispatch({ type: SET_STATIONS, stations: likedStations })
    } catch (error) {
        console.error('Failed to fetch liked content', err)

    }

}


export async function clearLikedContent() {
    try {
        store.dispatch({ type: SET_TRACKS, likedTracks: [] })
        store.dispatch({ type: SET_STATIONS, stations: [] })
    } catch (error) {
        console.error('Failed to clear liked content', err)

    }

}
