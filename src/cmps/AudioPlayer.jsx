import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { eventBus, playerEvents } from "../services/event-bus.service";

export function AudioPlayer() {
    const reactPlayer = useRef(null)
    const [playing, setPlaying] = useState(false)
    const [volume, setVolume] = useState(0.1)

    useEffect(() => {
        const playStartedCleanup = eventBus.on(playerEvents.PLAY_STARTED, () => {
            setPlaying(true)
        })

        const playPausedCleanup = eventBus.on(playerEvents.PLAY_PAUSED, () => {
            setPlaying(false)
        })

        const volumeChangedCleanup = eventBus.on(playerEvents.VOLUME_CHANGED, newVolume => {
            setVolume(newVolume / 100)
        })

        const seekCleanup = eventBus.on(playerEvents.SEEK, newPos => {
            reactPlayer.current.seekTo(newPos)
        })

        return () => {
            playStartedCleanup()
            playPausedCleanup()
            volumeChangedCleanup()
            seekCleanup()
        }
    }, [])

    function onPlayerReady() {
        const trackDuration = reactPlayer.current.getDuration()
        eventBus.emit(playerEvents.TRACK_PLAYBACK_READY, trackDuration)
    }

    function onPlayerProgress(progress) {
        eventBus.emit(playerEvents.TRACK_PROGRESS, progress.playedSeconds)
    }

    return (
        <ReactPlayer
            ref={reactPlayer}
            url="https://www.youtube.com/watch?v=1P5BSm_oFJg"
            playing={playing}
            volume={volume}
            style={{ display: "none" }}
            onReady={onPlayerReady}
            onProgress={onPlayerProgress}
        />
    )
}
