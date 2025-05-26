export const SET_PLAYING = "TOGGLE_PLAYING"
export const SET_PLAYBACK_READY = "SET_PLAYBACK_READY"
export const SET_CUR_TRACK_DURATION = "SET_CUR_TRACK_DURATION"

const initialState = {
    playing: false,
    playbackReady: false,
    curTrackDuration: 0
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case SET_PLAYING:
            return {...state, playing: action.playing}
        
        case SET_PLAYBACK_READY:
            return {...state, playbackReady: action.playbackReady}
        
        case SET_CUR_TRACK_DURATION:
            return {...state, curTrackDuration: action.curTrackDuration}

        default:
            return state
    }
}