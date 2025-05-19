// user.actions.js
import { userService } from "../../services/user/user.service.js"
import { SET_IS_GUEST_USER, SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"
import { clearLikedContent, fetchLikedContent, updateLikedStation } from "./library.actions.js"
import { stationService } from "../../services/station/station.service.js"
import { makeId } from "../../services/util.service.js"
import { SET_STATIONS } from "../reducers/library.reducer.js"
import defaultUser from "../../services/user/defaultUser.js"
import { addTrackToStation, removeTrackFromStation, saveStation } from "./station.actions.js"
import { UPDATE_STATION } from "../reducers/station.reducer.js"

function createLikedTracksStation(user) {
    return {
        name: 'Liked Songs',
        description: '',
        imgUrl: 'https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png',
        owner: {
            _id: user._id,
            fullname: user.fullname,
        },
        tracks: []
    }
}

async function initUserSession(user, isGuest = false) {
    const updatedUser = await userService.updateUser(user)
    userService.saveLoggedinUser(updatedUser)
    store.dispatch({ type: SET_USER, user: updatedUser })
    store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: isGuest })
    await fetchLikedContent(updatedUser)
    return updatedUser
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        return await initUserSession(user, false)
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        let user = await userService.signup(credentials)
        let likedStation = createLikedTracksStation(user)

        likedStation = await stationService.save(likedStation)
        user.likedTracksStationId = likedStation._id
        user.likedTrackIds = []
        user.likedStationIds = [likedStation._id]

        return await initUserSession(user, false)
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}

export function logout() {
    try {
        userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: true })
        clearLikedContent()
    } catch (err) {
        console.log('user actions -> Cannot logout', err)
        throw err
    }
}

export async function toggleLikeTrack(track) {
    try {
        const state = store.getState()

        const user = { ...state.userModule.user }
        const activeStationId = state.libraryModule.activeStationId
        const trackId = track.id

        if (!user || !trackId) {
            console.error("❌ Missing user or track ID.")
            return
        }



        const likedStation = await stationService.getById(user.likedTracksStationId)
        const isLiked = likedStation.tracks.some(
            t => (t.id) === trackId
        )
        console.log(`🔍 Track is ${isLiked ? "already" : "not yet"} liked`)
        let updatedStation = {}
        if (isLiked) {
            updatedStation = await stationService.removeTrackFromStation(track.id, likedStation._id)
            console.log("🧹 Track removed from Liked Songs.")
        } else {
            updatedStation = await stationService.addTrackToStation(track, likedStation._id)
            console.log("❤️ Track added to Liked Songs.")
        }
        if (activeStationId == likedStation.spotifyId) {
            await saveStation(updatedStation)
        }
        await updateLikedStation(updatedStation)

    } catch (error) {
        console.error("❌ Error in toggleLikeTrack:", error)
    }
}



export async function tempLogin() {
    try {
        let user = userService.getLoggedinUser()

        if (!user) {
            user = await signup(defaultUser)
        } else {
            await initUserSession(user, user.fullname === 'Guest')
        }

        return user
    } catch (err) {
        console.error('tempLogin failed:', err)
    }
}
