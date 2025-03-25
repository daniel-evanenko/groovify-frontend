export const REMOVE_TRACK = 'REMOVE_TRACK'
export const ADD_TRACK = 'ADD_TRACK'
export const PLAY_TRACK = 'PLAY_TRACK'
export const UPDATE_STATION = 'UPDATE_STATION'
export const SET_ACTIVE_STATION_ID = 'SET_ACTIVE_STATION_ID'

const initialState = {
    station: {
        _id: '',
        name: '',
        description: '',
        imgUrl: '',
        ownerId: '',
        trackIds: [],
        lastUpdate: NaN,
    },
    // minimal track data
    playingTrack: {}
}

export function stationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TRACK:
            return {
                ...state,
                station: { ...state.station, trackIds: [...trackIds, action.trackId], lastUpdate: Date.now() }
            }

        case REMOVE_TRACK:
            const { trackIds } = state
            const filteredTracks = trackIds.filter(trackId => trackId !== action.trackId)

            return {
                ...state,
                station: { ...state.station, trackIds: filteredTracks, lastUpdate: Date.now() }
            }

        case PLAY_TRACK:
            return { ...state, playingTrack: action.playingTrack }

        case UPDATE_STATION:
            return {
                ...state,
                station: { ...state.station, ...action.station, lastUpdate: Date.now() }
            }

        default:
            return state
    }


}