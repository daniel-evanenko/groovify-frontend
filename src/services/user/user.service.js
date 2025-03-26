import { storageService } from '../async-storage.service.js'
import defaultUser from './defaultUser.js'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const USER = 'user'

export const userService = {
    login,
    logout,
    getUsers,
    getById,
    getLoggedinUser,
    saveLoggedinUser,
}

async function getUsers() {
    const users = await storageService.query(USER)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(USER, userId)
}

async function login(userCred) {
    const users = await storageService.query(USER)
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    const sessionUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return sessionUser ? JSON.parse(sessionUser) : defaultUser
}

function saveLoggedinUser(user) {
    const loggedInUser = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(loggedInUser))
    return loggedInUser
}


