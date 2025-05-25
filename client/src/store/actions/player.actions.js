import { SET_PLAYING } from "../reducers/player.reducer"
import { store } from "../store"

export async function setPlaying(playing) {
    try {
        store.dispatch({ type: SET_PLAYING, playing })
    } catch (err) {
        console.log('player actions -> Cannot set playing', err)
        throw err
    }
}
