export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_STATIONS = 'SET_STATIONS'

const initialState = {
    stations: []
}

export function libraryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_STATIONS:
            return {
                ...state,
                stations: action.stations
            }

        case ADD_STATION:
            return {
                ...state,
                stations: [action.savedStation, ...state.stations],
            }

        case REMOVE_STATION:
            const { stations } = state
            const filteredStations = stations.filter(station => station._id !== action.stationId)
            return {
                ...state,
                stations: filteredStations
            }

        default:
            return state
    }


}