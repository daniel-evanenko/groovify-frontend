import { SET_CUR_TRACK_DURATION, SET_PLAYBACK_READY, SET_PLAYING } from "../reducers/player.reducer"
import { store } from "../store"

export async function setPlaying(playing) {
    try {
        store.dispatch({ type: SET_PLAYING, playing })
    } catch (err) {
        console.log('player actions -> Cannot set playing', err)
        throw err
    }
}

export async function setPlaybackReady(playbackReady) {
    try {
        store.dispatch({ type: SET_PLAYBACK_READY, playbackReady })
    } catch (err) {
        console.log('player actions -> Cannot set playback state', err)
        throw err
    }
}

export async function setCurTrackDuration(duration) {
        try {
        store.dispatch({ type: SET_CUR_TRACK_DURATION, curTrackDuration: duration })
    } catch (err) {
        console.log('player actions -> Cannot set current track duration', err)
        throw err
    }
}