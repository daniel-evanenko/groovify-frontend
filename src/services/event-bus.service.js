//events
export const INDEX_MOUNT = "on-index-mount"
export const PLAY_STARTED = "play-started"
export const PLAY_PAUSED = "play-paused"
export const VOLUME_CHANGED = "volume-changed"
export const TRACK_PLAYBACK_READY = "track-playback-ready"


function createEventEmitter() {
    const listenersMap = {}
    return {
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },
        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

export const eventBus = createEventEmitter()
