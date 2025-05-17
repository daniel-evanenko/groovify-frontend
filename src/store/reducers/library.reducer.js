export const ADD_STATION_ACTIVATE = 'ADD_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'
export const ADD_TRACK = 'ADD_TRACK'
export const SET_TRACKS = 'SET_TRACKS'
export const REMOVE_TRACK = 'REMOVE_TRACK'

const initialState = {
    stations: [],
    likedTracks: [],
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
                stations: [...state.stations, action.station],
                activeStationId: action.station._id
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

        case SET_TRACKS:
            return {
                ...state,
                likedTracks: action.likedTracks
            }

        case ADD_TRACK:
            return {
                ...state,
                likedTrackIds: [...state.likedTracks, action.likedTrack],
            }

        case REMOVE_TRACK:
            const { likedTracks } = state
            const filteredLikedTracks = likedTracks.filter(track => track._id !== action.likedTrackId)
            return {
                ...state,
                likedTracks: filteredLikedTracks
            }

        default:
            return state
    }


}