export const SET_ACTIVE_STATION = 'SET_ACTIVE_STATION'
export const SET_TRACKS = 'SET_TRACKS'
export const SET_INDEX_STATIONS = 'SET_INDEX_STATIONS'
export const ADD_TRACK_TO_STATION = 'ADD_TRACK_TO_STATION'
export const REMOVE_TRACK_FROM_STATION = 'REMOVE_TRACK_FROM_STATION'
export const PLAY_TRACK = 'PLAY_TRACK'
export const UPDATE_STATION = 'UPDATE_STATION'

const initialState = {
    indexStations: [],
    currentActiveStation: {},
    activeStationTracks: [],
    playingTrack: {}
}

export function stationReducer(state = initialState, action) {
    switch (action.type) {
        case SET_INDEX_STATIONS:
            return {
                ...state,
                indexStations: action.stations
            }
        case SET_ACTIVE_STATION:
            return {
                ...state,
                currentActiveStation: action.station
            }
        case SET_TRACKS:
            return {
                ...state,
                activeStationTracks: action.tracks
            }
        case ADD_TRACK_TO_STATION:
            return {
                ...state,
                activeStationTracks: [...(state.activeStationTracks || []), action.track],
            }

        case REMOVE_TRACK_FROM_STATION:
            const currentTracks = Array.isArray(state.activeStationTracks) ? state.activeStationTracks : []
            const filteredTracks = currentTracks.filter(
                trackObj => trackObj.track?.id !== action.trackId
            )
            return {
                ...state,
                activeStationTracks: filteredTracks
            }

        case PLAY_TRACK:
            return { ...state, playingTrack: action.playingTrack }

        case UPDATE_STATION:
            return {
                ...state,
                currentActiveStation: { ...state.currentActiveStation, ...action.station, lastUpdate: Date.now() }
            }

        default:
            return state
    }


}