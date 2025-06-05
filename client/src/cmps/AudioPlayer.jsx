import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { eventBus, playerEvents } from "../services/event-bus.service";
import { setCurTrackDuration, setPlaybackReady, setPlaying } from "../store/actions/player.actions";
import { getTrackUrl } from "../services/station/station.service";
import { useSelector } from "react-redux";

export function AudioPlayer() {
    const reactPlayer = useRef(null)
    const activeTrackId = useSelector(state => state.systemModule.activeTrackId)
    const isPlaying = useSelector(state => state.playerModule.playing)
    const [trackUrl, setTrackUrl] = useState("")
    const [volume, setVolume] = useState(0.1)

    useEffect(() => {
        const volumeChangedCleanup = eventBus.on(playerEvents.VOLUME_CHANGED,
            newVolume => {
                setVolume(newVolume / 100)
            })

        const seekCleanup = eventBus.on(playerEvents.SEEK,
            newPos => {
                reactPlayer.current.seekTo(newPos)
            })

        return () => {
            volumeChangedCleanup()
            seekCleanup()
        }
    }, [])

    useEffect(() => {
        async function fetchYtUrl() {
            if (!activeTrackId) return
            
            try {
                const ytUrl = await getTrackUrl(activeTrackId)
                if (ytUrl) {
                    setTrackUrl(ytUrl)
                }
                else {
                    setPlaybackReady(false)
                    setPlaying(false)
                }

            } catch (err) {
                console.error("couldnt load track playUrl")
            }
        }

        fetchYtUrl()

    }, [activeTrackId])

    function onPlayerReady() {
        const trackDuration = reactPlayer.current.getDuration()
        setCurTrackDuration(trackDuration)
        setPlaybackReady(true)
        setPlaying(true)
    }

    function onPlayerProgress(progress) {
        eventBus.emit(playerEvents.TRACK_PROGRESS, progress.playedSeconds)
    }

    function handleError(err) {
        console.error(err)
    }

    return (
        <ReactPlayer
            ref={reactPlayer}
            url={trackUrl}
            playing={isPlaying}
            volume={volume}
            style={{ display: "none" }}
            onReady={onPlayerReady}
            onProgress={onPlayerProgress}
            onError={handleError}
        />
    )
}
