import { storageService } from '../async-storage.service.js'
import { loadFromStorage, makeId, saveToStorage } from '../util.service.js';
import { addStation } from '../../store/actions/library.actions.js';
import { store } from '../../store/store.js';

export const STORAGE_KEY = "stationsDB";
export const INITIAL_STATION_PREFIX = "My Station #";
export const INITIAL_STATION_PREFIX_REGEX = /[a-zA-Z #]/g;

_createStations() // temp way to create stationsDB

export const stationService = {
    query,
    getById,
    save,
    remove,
    addTrackToStation,
    removeTrackFromStation,
    getStationBySpotifyId,
    fetchStations,
    getDefaultFilter,
    getTracks,
    createNewStation
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
        const station = await getById(stationId)
        const trackToAdd = {
            ...structuredClone(track),
            id: makeId()
        }
        station.tracks.push(trackToAdd)
        await save(station)
        return trackToAdd

    } catch (error) {
        console.error('ERROR addTrackToStation', error)
    }
}

async function removeTrackFromStation(trackId, stationId) {
    const station = await getById(stationId);
    const filteredTracks = station.tracks.filter(track => track.id !== trackId)
    station.tracks = filteredTracks;
    return await save(station)
}

function findNextStationId() {
    const allStations = store.getState()?.libraryModule?.stations
    const allStationsNames = allStations.map(station => station.name)
    const nonRenamedNewStations = allStationsNames.filter(stationName => stationName.startsWith(INITIAL_STATION_PREFIX));
    const newStationNumber = nonRenamedNewStations.map(stationName => parseInt(stationName.replace(INITIAL_STATION_PREFIX_REGEX, '')))
    if (newStationNumber.length) return Math.max(...newStationNumber) + 1
}

export async function createNewStation({ userFullName }) {
    const imgUrl = '';
    const nextStationId = findNextStationId() || '1';
    const stationName = `${INITIAL_STATION_PREFIX}${nextStationId}`;
    
    const newStation = {
        name: stationName,
        imgUrl,
        description: "",
        category: "",
        categoryId: "",
        owner: {
            fullname: userFullName
        }
    }

    return await addStation(newStation);
}

export async function getStationLists() {
    try {
        const response = await fetch("/tmp-assets/stations-home-page.json")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const homePageStations = await response.json()
        return homePageStations
    } catch (error) {
        console.error("Error fetching JSON:", error)
    }
}



async function _saveRequest(station, methodType) {
    const stationToSave = {
        _id: station._id,
        ...station
    }

    return await storageService[methodType](STORAGE_KEY, stationToSave)
}

async function getStationBySpotifyId(entityId) {
    try {
        const stations = await query()
        const station = await stations.find(entity => entity.spotifyId === entityId)
        return station
    } catch (error) {
        console.error("Error getting station:", error)
    }
}

async function _createStations() {
    let stations = loadFromStorage(STORAGE_KEY)
    try {
        if (!stations || !stations.length) {
            const response = await fetch("/tmp-assets/filtered-stations.json")
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            stations = await response.json()
        }

    } catch (error) {
        console.error("Error fetching JSON:", error)

    }
    saveToStorage(STORAGE_KEY, stations)

}


async function fetchStations() {
    const response = await fetch("/tmp-assets/stations.json")
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}

function getDefaultFilter() {
    return { title: '' }
}
async function getTracks(filter = {}) {
    const title = filter.title?.trim()

    if (!title) return []

    try {
        const response = await fetch('/tmp-assets/track.json')
        if (!response.ok) throw new Error('Failed to fetch tracks')

        const tracks = await response.json()
        const regex = new RegExp(title, 'i')

        return tracks.filter(track => regex.test(track.title)).slice(1, 10)
    } catch (err) {
        console.error('Error fetching tracks:', err)
        return []
    }
}
