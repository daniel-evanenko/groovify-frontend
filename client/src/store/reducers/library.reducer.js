export const ADD_STATION = 'ADD_STATION'
export const REMOVE_STATION = 'REMOVE_STATION'
export const SET_STATIONS = 'SET_STATIONS'
export const UPDATE_LIBRARY_STATION = 'UPDATE_LIBRARY_STATION'
export const UPDATE_LIKED_STATION = 'UPDATE_LIKED_STATION'

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
                stations: [action.station, ...state.stations],
            }
        case UPDATE_LIBRARY_STATION:
            return {
                ...state,
                stations: state.stations.map((station) =>
                    station._id === action.updatedStation._id ? action.updatedStation : station
                )
            }
        case UPDATE_LIKED_STATION: {
            const { trackId } = action;

            return {
                ...state,
                stations: state.stations.map(station => {
                    if (!station.isLikedTracks) return station;

                    const isTrackLiked = station.tracks.includes(trackId);
                    const updatedTracks = isTrackLiked
                        ? station.tracks.filter(id => id !== trackId)
                        : [...station.tracks, trackId];

                    return {
                        ...station,
                        tracks: updatedTracks
                    };
                })
            };
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