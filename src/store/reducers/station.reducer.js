export const ADD_TRACK_TO_STATION = 'ADD_TRACK_TO_STATION'
export const REMOVE_TRACK_FROM_STATION = 'REMOVE_TRACK_FROM_STATION'
export const PLAY_TRACK = 'PLAY_TRACK'
export const UPDATE_STATION = 'UPDATE_STATION'

const initialState = {
    station: {
        _id: '',
        name: '',
        description: '',
        imgUrl: '',
        ownerId: '',
        tracks: [],
        lastUpdate: NaN,
    },
    playingTrack: {}
}

export function stationReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TRACK_TO_STATION:
            return {
                ...state,
                station: { ...state.station, tracks: [...state.tracks, action.track], lastUpdate: Date.now() }
            }

        case REMOVE_TRACK_FROM_STATION:
            const { tracks } = state
            const filteredTracks = tracks.filter(track => track._id !== action.trackId)

            return {
                ...state,
                station: { ...state.station, tracks: filteredTracks, lastUpdate: Date.now() }
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