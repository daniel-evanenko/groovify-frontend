import { SET_IS_LOADING } from "../reducers/system.reducer.js";
import { store } from "../store.js"
export async function setIsLoading(isLoading) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading })

    } catch (err) {
        console.log('system actions -> Cannot set isLoading', err)
        throw err
    }
}