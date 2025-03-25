import { stationService } from "../../services/station/station.service.js"
import { store } from "../store.js"


// export async function addTrack(track) {
//     try {
//         const savedStation = await stationService.save(station)
//         store.dispatch({ type: ADD_STATION, savedStation })

//     } catch (err) {
//         console.log('library actions -> Cannot add station', err)
//         throw err
//     }
// }

// export async function removeStation(stationId) {
//     try {
//         await stationService.remove(stationId)
//         store.dispatch({ type: REMOVE_STATION, stationId })

//     } catch (err) {
//         console.log('library actions -> Cannot remove station', err)
//         throw err
//     }
// }
// // setting station as active causes the main section to render it.
// export async function setActiveStation(stationId) {
//     try {
//         store.dispatch({ type: SET_ACTIVE_STATION_ID, stationId})

//     } catch (err) {
//         console.log('library actions -> Cannot set active station', err)
//         throw err
//     }
// }