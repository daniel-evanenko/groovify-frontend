export const ADD_STATION_ACTIVATE = 'ADD_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'
export const UPDATE_LIKED_STATION = 'UPDATE_LIKED_STATION'

const initialState = {
    stations: [],
    activeStationId: ''
}
export function libraryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATIONS:
            return {
                ...state,
                stations: action.stations
            }

        case ADD_STATION_ACTIVATE:
            return {
                ...state,
                stations: [action.savedStation, ...state.stations],
                activeStationId: action.savedStation.spotifyId || action.savedStation._id
            }
        case UPDATE_LIKED_STATION:
            return {
                ...state,
                stations: state.stations.map(station =>
                    station._id === action.station._id ? action.station : station
                )
            }

        case REMOVE_STATION:
            return {
                ...state,
                stations: state.stations.filter(station => station._id !== action.stationId)
            }

        case SET_ACTIVE_STATION_ID:
            return { ...state, activeStationId: action.activeStationId }

        default:
            return state
    }
}