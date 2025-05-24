export const ADD_LIBRARY_STATION = 'ADD_STATION'
export const SET_LIBRARY_STATIONS = 'SET_LIBRARY_STATIONS'
export const ADD_LIBRARY_STATIONS = 'ADD_LIBRARY_STATIONS'
export const REMOVE_LIBRARY_STATION = 'REMOVE_LIBRARY_STATION'


const initialState = {
    libraryStations: [],
}

export function libraryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LIBRARY_STATIONS:
            return {
                ...state,
                libraryStations: action.stations
            }
        case ADD_LIBRARY_STATIONS:
            return {
                ...state,
                libraryStations: [...action.stations, ...state.libraryStations]
            }
        case ADD_LIBRARY_STATION:
            return {
                ...state,
                libraryStations: [action.savedStation, ...state.libraryStations],
            }

        case REMOVE_LIBRARY_STATION:
            const { libraryStations } = state
            const filteredStations = libraryStations.filter(station => station._id !== action.stationId)
            return {
                ...state,
                libraryStations: filteredStations

            }
        default:
            return state
    }


}