import { legacy_createStore as createStore, combineReducers } from 'redux'
import { userReducer } from './reducers/user.reducer.js'
import { libraryReducer } from './reducers/library.reducer.js'
import { stationReducer } from './reducers/station.reducer.js'
import { systemReducer } from './reducers/system.reducer.js'
import { playerReducer } from './reducers/player.reducer.js'


const rootReducer = combineReducers({
    userModule: userReducer,
    libraryModule: libraryReducer,
    stationModule: stationReducer,
    systemModule: systemReducer,
    playerModule: playerReducer
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)
