export const SET_PLAYING = "TOGGLE_PLAYING"

const initialState = {
    playing: false
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYING:
            return {...state, playing: action.playing}

        default:
            return state
    }
}