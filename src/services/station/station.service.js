import { storageService } from '../async-storage.service.js'
import { loadFromStorage, saveToStorage, makeId } from '../util.service.js'

export const STORAGE_KEY = "stationsDB";
export const INITIAL_STATION_NAME = "My Station #"
export const DEFAULT_STATION_IMG_LINK = ''

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
    createNewStation
}

window.cs = stationService

const defaultFilter = {}

async function query(filter = defaultFilter) {
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
    const station = await getById(stationId);
    station.tracks.push(track)
    return await save(station)
}

async function removeTrackFromStation(trackId, stationId) {
    const station = await getById(stationId);
    const filteredTracks = station.tracks.filter(track => track.id !== trackId)
    station.tracks = filteredTracks;
    return await save(station)
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

function _findNextNewStationIndex(stationsList) {
    const stations = stationsList || loadFromStorage(STORAGE_KEY);

    const stationsWithInitialName = stations.filter(station => station?.name?.startsWith(INITIAL_STATION_NAME));
    const initialStationNameIndexes = stationsWithInitialName.map(station => {
        const [initialName, ...restStr] = station?.name?.split(INITIAL_STATION_NAME)
        const restNumber = Number(restStr)
        return Number.isNaN(restNumber) && restNumber
    })

    const initialStationNameIndexesFiltered = initialStationNameIndexes.filter(index => index)
    const [lastIndexFromSort] = initialStationNameIndexesFiltered.sort((a, b) => b - a)

    const lastIndex = lastIndexFromSort || 0;

    return lastIndex + 1
}

async function createNewStation({ userFullName }) {
    const stations = loadFromStorage(STORAGE_KEY)
    const newStationIndex = _findNextNewStationIndex(stations)
    
    try {
        const newStation = {
            _id: makeId(),
            spotifyId: makeId(),
            name: `${INITIAL_STATION_NAME}${newStationIndex}`,
            imgUrl: DEFAULT_STATION_IMG_LINK,
            desciption: '',
            owner: {
                fullname: userFullName
            },
            tracks: []
        }

        return newStation
    } catch (error) {
        console.error("Error while trying to create a new station")
    }
}


async function fetchStations() {
    const response = await fetch("/tmp-assets/stations.json")
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
    }
    return await response.json()
}