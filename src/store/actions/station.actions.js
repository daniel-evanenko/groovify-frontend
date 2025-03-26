import { stationService } from "../../services/station/station.service.js"
import { ADD_TRACK_TO_STATION, REMOVE_TRACK_FROM_STATION } from "../reducers/station.reducer.js"
import { store } from "../store.js"


export async function addTrackToStation(track, stationId) {
    try {
        const savedTrack = await stationService.addTrackToStation(track, stationId)
        store.dispatch({ type: ADD_TRACK_TO_STATION, savedTrack })

    } catch (err) {
        console.log('Station actions -> Cannot add track to station', err)
        throw err
    }
}



export async function removeTrackToStation(trackId, stationId) {
    try {
        const removedTrack = await stationService.removeTrackToStation(trackId, stationId)
        store.dispatch({ type: REMOVE_TRACK_FROM_STATION, removedTrack })

    } catch (err) {
        console.log('Station actions -> Cannot remove track from station', err)
        throw err
    }
}


// export async function updateStation(updatedStationInfo) {
//     try {
//         const removedTrack = await stationService.save(stationId)
//         store.dispatch({ type: REMOVE_TRACK_FROM_STATION, removedTrack })

//     } catch (err) {
//         console.log('Station actions -> Cannot remove track from station', err)
//         throw err
//     }
// }

