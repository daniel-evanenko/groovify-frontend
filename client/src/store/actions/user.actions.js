import { getUserStations } from "../../services/spotify/spotify-api.service.js"
import { createNewLikedStation } from "../../services/station/station.service.js"
import defaultUser from "../../services/user/defaultUser.js"
import { userService } from "../../services/user/user.service.js"
import { getUser } from "../../services/user/users-api.service.js"
import { SET_STATIONS } from "../reducers/library.reducer.js"
import { SET_IS_GUEST_USER, SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function signup(credentials) {
    try {
        let user = await userService.signup(credentials)
        let likedStation = await createNewLikedStation(user)

        user.likedTracksStationId = likedStation._id
        user.savedStations.push(likedStation._id)
        return await updateUser(user, false)
    } catch (err) {
        console.log('user actions -> Cannot signup', err)
        throw err
    }
}
export async function updateUser(user, isGuest = false) {
    userService.saveLoggedinUser(user)

    const userStations = await getUserStations();

    store.dispatch({ type: SET_USER, user: user })
    store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: isGuest })
    store.dispatch({ type: SET_STATIONS, stations: userStations })

    return user
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

async function hanleFailedUserGet() {
    try {
        const user = await userService.login(defaultUser)
        return user;
    } catch (loginErr) {
        console.warn('Login failed, trying signup...')
        const user = await signup(defaultUser);
        return user;
    }
}

export async function tempLogin() {
    try {
        const user = await getUser();
        if (!user) hanleFailedUserGet();

        userService.saveLoggedinUser(user)
        await userService.login('', user)
        await updateUser(user, user.fullname === 'John Doe');
        return user;
    } catch (err) {
        console.error('tempLogin failed:', err)
        throw err
    }
}


export const handleToggleStation = async (stationId) => {
    const loggedinUser = userService.getLoggedinUser()
    try {
        const updatedUser = await userService.toggleSavedStation(loggedinUser._id, stationId)
        await updateUser(updatedUser)
    } catch (err) {
        console.error('Error toggling saved station:', err)
    }
}