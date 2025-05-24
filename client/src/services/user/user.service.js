import { storageService } from '../async-storage.service.js'
import defaultUser from './defaultUser.js'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const STORAGE_KEY = 'user'

export const userService = {
    login,
    logout,
    getUsers,
    getById,
    getLoggedinUser,
    saveLoggedinUser,
    updateUser,
    signup
}

async function getUsers() {
    const users = await storageService.query(STORAGE_KEY)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY, userId)
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username)

    if (!user) throw new Error('Invalid credentials')
    return saveLoggedinUser(user)
}


function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    const sessionUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return JSON.parse(sessionUser)
}

function saveLoggedinUser(user) {
    const loggedInUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        likedTracksStationId: user.likedTracksStationId,
        likedStationIds: user.likedStationIds
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(loggedInUser))
    return loggedInUser
}


async function updateUser(user) {
    return await storageService.put(STORAGE_KEY, user)
}

async function signup(userCred) {
    try {
        const newUser = await storageService.post(STORAGE_KEY, userCred)
        if (!newUser) throw new Error('Failed to create user')

        return saveLoggedinUser(newUser)
    } catch (error) {
        console.error('ERROR - cannot signup', error)
        throw error
    }
}