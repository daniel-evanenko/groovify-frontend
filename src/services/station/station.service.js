import { storageService } from '../async-storage.service.js'

const STORAGE_KEY = 'STATION'

export const stationService = {
    query,
    getById,
    save,
    remove,
    addTrackToStation,
    removeTrackToStation
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

async function removeTrackToStation(trackId, stationId) {
    const station = await getById(stationId);
    const filteredTracks = station.tracks.filter(track => track._id !== trackId)
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
    }
    return await storageService[methodType](STORAGE_KEY, stationToSave)
}

