//events
export const INDEX_MOUNT = "on-index-mount"

export const playerEvents = Object.freeze({
    PLAY_STARTED: "play-started",
    PLAY_PAUSED: "play-paused",
    VOLUME_CHANGED: "volume-changed",
    TRACK_PLAYBACK_READY: "track-playback-ready",
    SEEK: "seek",
    TRACK_PROGRESS: "track-progressed"
})

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
