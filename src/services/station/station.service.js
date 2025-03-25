import { storageService } from '../async-storage.service.js'

const STORAGE_KEY = 'STATION'

export const stationService = {
    query,
    getById,
    save,
    remove,
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


async function _saveRequest(station, methodType) {
    const stationToSave = {
        _id: station._id,
    }
    return await storageService[methodType](STORAGE_KEY, stationToSave)
}

