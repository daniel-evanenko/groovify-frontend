export const ADD_STATION_ACTIVATE = 'ADD_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'


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
                stations: [...state.stations, action.savedStation],
                activeStationId: action.savedStation._id
            }

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