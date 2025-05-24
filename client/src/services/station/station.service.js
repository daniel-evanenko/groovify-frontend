import { storageService } from '../async-storage.service.js'
import { loadFromStorage, makeId, saveToStorage } from '../util.service.js';
import { addStation } from '../../store/actions/library.actions.js';
import { store } from '../../store/store.js';
import { TRACKS_STORAGE_KEY_PREFIX } from '../spotify/spotify-api.service.js';
import { updateUser } from '../../store/actions/user.actions.js';

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
    getStationTracks,
    getLikedStationTracks
}

window.cs = stationService



async function query(filter = {}) {
    return await storageService.query(STORAGE_KEY)
}

function getById(stationId) {
    return storageService.get(STORAGE_KEY, stationId)
}

async function remove(stationId) {
    await storageService.remove(STORAGE_KEY, stationId)
}

async function save(station) {
    const methodType = station._id ? 'put' : 'post';
    return await _saveRequest(station, methodType);
}

async function addTrackToStation(track, stationId) {
    try {
        const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${stationId}`
        const tracks = loadFromStorage(STATION_TRACKS_STORAGE_KEY) || []

        const trackToAdd = {
            ...structuredClone(track),
        }
        tracks.push(trackToAdd)
        saveToStorage(STATION_TRACKS_STORAGE_KEY, tracks)
        return tracks
    } catch (error) {
        console.log('error adding a track', error)
    }
}

function removeTrackFromStation(trackId, stationId) {
    try {
        const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${stationId}`
        const tracks = loadFromStorage(STATION_TRACKS_STORAGE_KEY) || []
        const updatedTracks = tracks.filter(
            trackObj => trackObj.track?.id !== trackId
        )
        saveToStorage(STATION_TRACKS_STORAGE_KEY, updatedTracks)
        return updatedTracks
    } catch (error) {
        console.log('error removing a track', error)
    }
}

function findNextStationId() {
    const allStations = store.getState()?.libraryModule?.libraryStations
    const allStationsNames = allStations.map(station => station.name)
    const nonRenamedNewStations = allStationsNames.filter(stationName => stationName.startsWith(INITIAL_STATION_PREFIX));
    const newStationNumber = nonRenamedNewStations.map(stationName => parseInt(stationName.replace(INITIAL_STATION_PREFIX_REGEX, '')))
    if (newStationNumber.length) return Math.max(...newStationNumber) + 1
}

export async function createNewStation() {
    const user = store.getState()?.userModule?.user

    const nextStationId = findNextStationId() || '1';
    const stationName = `${INITIAL_STATION_PREFIX}${nextStationId}`;

    let newStation = {
        name: stationName,
        images: { 0: { url: DEFAULT_IMAGE_URL, height: null, width: null } },
        description: "",
        category: "",
        categoryId: "",
        owner: {
            fullname: user.fullname
        }
    }

    const newStationId = await addStation(newStation);

    // Add the tracks array to localStorage, associated with the new station. 
    const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${newStationId}`
    saveToStorage(STATION_TRACKS_STORAGE_KEY, [])

    user.likedStationIds.push(newStationId)
    updateUser(user, false)

    return newStationId
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
export async function getStationsByCategories() {
    try {
        const stations = await storageService.query(STORAGE_KEY, 0)
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

async function getStationsById(likedPlaylistIds = []) {
    try {
        const stationsFromLocalStorage = await query()
        return stationsFromLocalStorage.filter(station => likedPlaylistIds.includes(station._id))
    } catch (error) {
        console.error('Error fetching liked stations:', err)
    }
}

async function getStationTracks(stationId) {
    const STATION_TRACKS_STORAGE_KEY = TRACKS_STORAGE_KEY_PREFIX + `${stationId}`
    return loadFromStorage(STATION_TRACKS_STORAGE_KEY) || []
}

async function getLikedStationTracks() {
    try {
        const user = store.getState()?.userModule?.user
        return await getStationTracks(user.likedTracksStationId)
    } catch (error) {
        console.error('error getting liked station tracks', error)
    }

}

export function addYtUrlsToTrack(stationId, trackId, youtubeUrls) {
    const stationTracks = loadFromStorage(TRACKS_STORAGE_KEY_PREFIX + `${stationId}`)
    const trackObj = stationTracks.find(trackObject => trackObject.track.id === trackId)
    trackObj.youtubeUrls = youtubeUrls
    const updatedTracks = [...stationTracks, trackObj]
    saveToStorage(TRACKS_STORAGE_KEY_PREFIX + `${stationId}`, updatedTracks)
}

export function getTrackYtUrls(stationId, trackId) {
    const stationTracks = loadFromStorage(TRACKS_STORAGE_KEY_PREFIX + `${stationId}`)
    const trackObj = stationTracks.find(trackObject => trackObject.track.id === trackId)
    return trackObj.youtubeUrls ? trackObj.youtubeUrls : undefined
}