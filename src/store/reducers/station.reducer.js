export const SET_STATION = 'SET_STATION'
export const SET_TRACKS = 'SET_TRACKS'
export const ADD_TRACK_TO_STATION = 'ADD_TRACK_TO_STATION'
export const REMOVE_TRACK_FROM_STATION = 'REMOVE_TRACK_FROM_STATION'
export const UPDATE_STATION = 'UPDATE_STATION'

const initialState = {
    station: {},
    tracks: []
}

export function stationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATION:
            return {
                ...state,
                station: action.station
            }
        case SET_TRACKS:
            return {
                ...state,
                tracks: action.tracks
            }
        case ADD_TRACK_TO_STATION:
            return {
                ...state,
                tracks: [...(state.tracks || []), action.track],
            }

        case REMOVE_TRACK_FROM_STATION:
            const currentTracks = Array.isArray(state.tracks) ? state.tracks : []
            const filteredTracks = currentTracks.filter(
                trackObj => trackObj.track?.id !== action.trackId
            )
            return {
                ...state,
                tracks: filteredTracks
            }

        case UPDATE_STATION:
            return {
                ...state,
                station: { ...state.station, ...action.station, lastUpdate: Date.now() }
            }

        default:
            return state
    }


}