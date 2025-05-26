export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'
export const SET_TRACK_ID = 'SET_TRACK_ID'
export const SET_MINI_TRACK = 'SET_MINI_TRACK'

const initialState = {
    isLoading: true,
    activeStationId: "", //active station is the station which the currently active track belongs to
    activeTrackId: "",
    miniActiveTrack: null
}

export function systemReducer(state = initialState, action) {
    switch (action.type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case SET_ACTIVE_STATION_ID:
            return { ...state, activeStationId: action.stationId }

        case SET_TRACK_ID:
            return { ...state, activeTrackId: action.activeTrackId }

        case SET_MINI_TRACK:
            return { ...state, miniActiveTrack: action.miniActiveTrack}

        default:
            return state
    }


}