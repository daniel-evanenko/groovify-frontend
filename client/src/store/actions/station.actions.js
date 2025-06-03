import { getStationsTracks } from "../../services/spotify/spotify-api.service.js"
import { stationService } from "../../services/station/station.service.js"
import { SET_STATION, SET_TRACKS } from "../reducers/station.reducer.js"
import { store } from "../store.js"

export async function addTrackToStation(track, stationId) {

    try {
        const updatedTracks = await stationService.addTrackToStation(track, stationId)
        store.dispatch({ type: SET_TRACKS, tracks: updatedTracks })

    } catch (err) {
        console.log('Station actions -> Cannot add track to station', err)
        throw err
    }
}

export async function removeTrackFromStation(trackId, stationId) {
    try {
        const updatedTracks = await stationService.removeTrackFromStation(trackId, stationId)
        store.dispatch({ type: SET_TRACKS, tracks: updatedTracks })

    } catch (err) {
        console.log('Station actions -> Cannot remove track from station', err)
        throw err
    }
}

export async function loadStation(stationId) {
    try {
        const station = await stationService.getById(stationId)
        const tracks = await getStationsTracks(station)
        store.dispatch({ type: SET_STATION, station })
        store.dispatch({ type: SET_TRACKS, tracks })

    } catch (err) {
        console.log('Station actions -> Cannot load station', err)
        throw err
    }
}

export function clearStation() {
    try {
        store.dispatch({ type: SET_STATION, station: null })
        // store.dispatch({ type: SET_INDEX_STATIONS, tracks: [] })
    } catch (err) {
        console.log('Station actions -> Cannot clear station', err)
        throw err
    }
}

export async function toggleLikeTrack(trackToToggle) {
    try {
        const state = store.getState()

        const user = { ...state.userModule.user }
        const likedStationId = user.likedTracksStationId
        const activeStation = state.stationModule.station
        const trackId = trackToToggle.track.id

        if (!user || !trackId) {
            console.error("❌ Missing user or track ID.")
            return
        }

        const likedTracks = await stationService.getLikedStationTracks()
        const isAlreadyLiked =
            Array.isArray(likedTracks) &&
            likedTracks.some(t => t.track?.id === trackToToggle.track?.id)

        console.log(`🔍 Track is ${isAlreadyLiked ? "already" : "not yet"} liked`)

        let updatedTracks = {}
        if (isAlreadyLiked) {
            updatedTracks = await stationService.removeTrackFromStation(trackToToggle.track.id, likedStationId)
            console.log("🧹 Track removed from Liked Songs.")
        } else {
            updatedTracks = await stationService.addTrackToStation(trackToToggle, likedStationId)
            console.log("❤️ Track added to Liked Songs.")
        }
        if (activeStation._id == likedStationId) {
            store.dispatch({ type: SET_TRACKS, tracks: updatedTracks })
        }

    } catch (error) {
        console.error("❌ Error in toggleLikeTrack:", error)
    }
}


