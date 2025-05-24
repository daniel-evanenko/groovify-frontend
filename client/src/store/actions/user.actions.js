import { createNewLikedStation, stationService } from "../../services/station/station.service.js"
import defaultUser from "../../services/user/defaultUser.js"
import { userService } from "../../services/user/user.service.js"
import { SET_IS_GUEST_USER, SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"
import { fetchLikedContent } from "./library.actions.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: false })
    } catch (err) {
        console.log('user actions -> Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        let user = await userService.signup(credentials)
        let likedStation = await createNewLikedStation(user)

        user.likedTracksStationId = likedStation._id
        user.likedStationIds.push(likedStation._id)
        return await updateUser(user, false)
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}
export async function updateUser(user, isGuest = false) {
    const updatedUser = await userService.updateUser(user)
    userService.saveLoggedinUser(updatedUser)
    store.dispatch({ type: SET_USER, user: updatedUser })
    store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: isGuest })
    await fetchLikedContent(updatedUser)
    return updatedUser
}
export function logout() {
    try {
        userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: true })
    } catch (err) {
        console.log('user actions -> Cannot logout', err)
        throw err
    }
}
export async function tempLogin() {
    try {
        let user = userService.getLoggedinUser()

        if (!user) {
            try {
                user = await userService.login(defaultUser)
            } catch (loginErr) {
                console.warn('Login failed, trying signup...')
                user = await signup(defaultUser)
            }
        }

        await updateUser(user, user.fullname === 'Guest')

        return user
    } catch (err) {
        console.error('tempLogin failed:', err)
        throw err
    }
}
