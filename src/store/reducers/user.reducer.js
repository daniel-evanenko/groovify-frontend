import { userService } from '../../services/user/user.service.js'

export const SET_USER = 'SET_USER'
export const SET_IS_GUEST_USER = 'SET_IS_GUEST_USER'

const initialState = {
    user: userService.getLoggedinUser(),
    isGuestUser: true
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.user }

        case SET_IS_GUEST_USER:
            return { ...state, isGuestUser: action.isGuestUser }

        default:
            return state
    }
}