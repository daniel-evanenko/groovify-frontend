import { storageService } from '../async-storage.service.js'
import { saveToStorage } from '../util.service.js';
import { addStation } from '../../store/actions/library.actions.js';
import { store } from '../../store/store.js';
import { createNewUserStation, getStationsTracks, TRACKS_STORAGE_KEY_PREFIX } from '../spotify/spotify-api.service.js';
import Api from "../api-service.js"

export const STORAGE_KEY = "stations";
export const INITIAL_STATION_PREFIX = "My Station #";
export const INITIAL_STATION_PREFIX_REGEX = /[a-zA-Z #]/g;
export const DEFAULT_IMAGE_URL = '/public/img/default-playlist-img.png';


export const stationService = {
    query,
    getById,
    save,
    remove,
    addTrackToStation,
    removeTrackFromStation,
    createNewStation,
    getStationsById,
    getLikedStationTracks,
    update
}

window.cs = stationService


async function query(filter = {}) {
    return await storageService.query(STORAGE_KEY)
}

async function getById(stationId) {
    try {
        const { data: station } = await Api.get(`/station/${stationId}`)
        return station
    } catch (error) {
        console.error(error)
    }

}

async function remove(stationId) {
    try {
        return await Api.delete(`/station/${stationId}`)
    } catch (error) {
        console.error(error)
    }
}

async function save(station) {
    const methodType = station._id ? 'put' : 'post';
    return await _saveRequest(station, methodType);
}

async function update(station) {
    try {
        const { data: savedStation } = await Api.put(`/station/${station._id}`, { station })
        return savedStation
    } catch (error) {
        console.log('error updation station', error)

    }
}

async function addTrackToStation(track, stationId) {
    try {
        const tracks = _getStationTracks(stationId) || []

        const trackToAdd = {
            ...structuredClone(track),
        }

        tracks.push(trackToAdd)
        saveToStorage(TRACKS_STORAGE_KEY_PREFIX + `${stationId}`, tracks)
        return tracks
    } catch (error) {
        console.log('error adding a track', error)
    }
}

function removeTrackFromStation(trackId, stationId) {
    try {
        const tracks = _getStationTracks(stationId) || []

        const updatedTracks = tracks.filter(
            trackObj => trackObj.track?.id !== trackId
        )

        saveToStorage(TRACKS_STORAGE_KEY_PREFIX + `${stationId}`, updatedTracks)
        return updatedTracks
    } catch (error) {
        console.log('error removing a track', error)
    }
}

function findNextStationId() {
    const allStations = store.getState()?.libraryModule?.stations
    const allStationsNames = allStations.map(station => station.name)
    const nonRenamedNewStations = allStationsNames.filter(stationName => stationName.startsWith(INITIAL_STATION_PREFIX));
    const newStationNumber = nonRenamedNewStations.map(stationName => parseInt(stationName.replace(INITIAL_STATION_PREFIX_REGEX, '')))
    if (newStationNumber.length) return Math.max(...newStationNumber) + 1
}

export async function createNewStation() {
    // const user = store.getState()?.userModule?.user
    // const nextStationId = findNextStationId() || '1'
    // const stationName = `${INITIAL_STATION_PREFIX}${nextStationId}`

    // let newStation = {
    //     name: stationName,
    //     images: { 0: { url: DEFAULT_IMAGE_URL, height: null, width: null } },
    //     description: "",
    //     category: "",
    //     categoryId: "",
    //     owner: {
    //         fullname: user?.fullname
    //     }
    // }

    const newStation = await createNewUserStation();
    const newStationId = await addStation(newStation)

    // Add the tracks array to localStorage, associated with the new station. 
    // const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${newStationId}`
    // saveToStorage(STATION_TRACKS_STORAGE_KEY, [])

    // user.savedStations.push(newStationId)
    // updateUser(user, false)

    return newStation
}

export async function createNewLikedStation(user) {
    try {
        let newStation = {
            name: 'Liked songs',
            images: { 0: { url: DEFAULT_IMAGE_URL, height: null, width: null } },
            description: "",
            category: "",
            categoryId: "",
            owner: {
                fullname: user.fullname
            }
        }

        newStation = await stationService.save(newStation)
        // Add the tracks array to localStorage, associated with the new station. 
        const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${newStation._id}`
        saveToStorage(STATION_TRACKS_STORAGE_KEY, [])

        return newStation

    } catch (error) {
        console.error('error creating new liked station', error)
    }

}

export async function getStationsByCategories(stations) {
    try {
        const stationsByCategories = {}
        for (const station of stations) {
            if (station.category in stationsByCategories) stationsByCategories[station.category].push(station)
            else stationsByCategories[station.category] = [station]
        }
        return stationsByCategories

    } catch (err) {
        console.error(err)
    }
}

async function _saveRequest(station, methodType) {
    const stationToSave = {
        _id: station._id,
        ...station
    }

    return await storageService[methodType](STORAGE_KEY, stationToSave)
}


export function processSpotifyStations(stations) {
    stations = _removeDups(stations)
    stations = _renameId(stations)

    return stations
}

function _removeDups(arr) {
    let noDups = arr.reduce((acc, item) => {
        if (!acc.some(existing => existing.id === item.id)) acc.push(item)
        return acc
    }, [])

    return noDups
}

function _renameId(arr) {
    return arr.map(({ id, ...rest }) => ({ _id: id, ...rest })) // rename id to _id
}

async function getStationsById(likedStationsIds = []) {
    try {
        const stationsFromLocalStorage = await query()
        return stationsFromLocalStorage.filter(station => likedStationsIds.includes(station._id))
    } catch (error) {
        console.error('Error fetching liked stations:', err)
    }
}

function getLikedStationTracks() {
    try {
        const user = store.getState()?.userModule?.user
        // return _getStationTracks(user.likedTracksStationId)
    } catch (error) {
        console.error('error getting liked station tracks', error)
    }
}

export async function getTrackById(stationId, trackId) {
    try {
        const tracks = await getStationsTracks(stationId)
        const track = tracks.find(trackObj => trackObj.track.id === trackId)
        return track
    } catch (err) {
        console.error(`couldnt retrieve track by id: ${trackId} from station id: ${stationId}`)
        throw err
    }
}

export async function getStationFirstTrack(stationId) {
    try {
        const station = await getById(stationId)
        const tracks = await getStationsTracks(station)
        return tracks && tracks.length > 0 && tracks[0]
    } catch (err) {
        console.error("couldnt get first track: ", err)
        throw err
    }
}

export async function getTrackUrl(trackId) {
    try {
        const { data: playUrl } = await Api.get(`/tracks/${trackId}`)
        console.log(playUrl)
        return playUrl
    } catch (err) {
        console.error("failed to get url for track with id: ", trackId)
        throw err
    }
}

export async function getPrevTrackId(stationId, trackId) {
    try {
        const { data: prevTrack } = await Api.get(`/stations/${stationId}/${trackId}/prev`)
        console.log("prevTrack: ", prevTrack)
        return prevTrack
    } catch (err) {
        console.error(`failed to get previous track in station ${stationId}`)
        throw err
    }
}

export async function getNextTrackId(stationId, trackId) {
    try {
        const { data: nextTrack } = await Api.get(`/stations/${stationId}/${trackId}/next`)
        return nextTrack
    } catch (err) {
        console.error(`failed to get next track in station ${stationId}`)
        throw err
    }
}
