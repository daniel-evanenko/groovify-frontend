import { userService } from "../../services/user/user.service.js"
import { SET_IS_GUEST_USER, SET_USER } from "../reducers/user.reducer.js"
import { store } from "../store.js"

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
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        store.dispatch({ type: SET_IS_GUEST_USER, isGuestUser: false })

        return user
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
    } catch (err) {
        console.log('user actions -> Cannot logout', err)
        throw err
    }
}
