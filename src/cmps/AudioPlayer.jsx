import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { eventBus, PLAY_PAUSED, PLAY_STARTED, TRACK_PLAYBACK_READY, VOLUME_CHANGED } from "../services/event-bus.service";

export function AudioPlayer() {
    const reactPlayer = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.1)

    useEffect(() => {
        const playStartedCleanup = eventBus.on(PLAY_STARTED, () => {
            setPlaying(true)
        })

        const playPausedCleanup = eventBus.on(PLAY_PAUSED, () => {
            setPlaying(false)
        })

        const volumeChangedCleanup = eventBus.on(VOLUME_CHANGED, (newVolume) => {
            setVolume(newVolume / 100)
        })

        return () => {
            playStartedCleanup()
            playPausedCleanup()
            volumeChangedCleanup()
        }
    }, [])

    function onPlayerReady() {
        const trackDuration = reactPlayer.current.getDuration()
        eventBus.emit(TRACK_PLAYBACK_READY, trackDuration)
    }

    return (
        <ReactPlayer
            ref={reactPlayer}
            url="https://www.youtube.com/watch?v=1P5BSm_oFJg"
            playing={playing}
            volume={volume}
            style={{ display: "none" }}
            onReady={onPlayerReady}
        />
    )
}
