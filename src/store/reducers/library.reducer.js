export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'

const initialState = {
    stations: [],
    activeStationId: ''
}

export function libraryReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_STATION:
            return { ...state, stations: [...state.stations, action.station] }

        case REMOVE_STATION:
            const { stations } = state
            const filteredStations = stations.filter(station => station._id !== action.stationId)
            return {
                ...state,
                stations: filteredStations

            }

        case SET_ACTIVE_STATION_ID:
            return { ...state, activeStationId: action.activeStationId }


        default:
            return state
    }


}