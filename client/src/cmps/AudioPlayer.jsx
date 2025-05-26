import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { eventBus, playerEvents } from "../services/event-bus.service";
import { setCurTrackDuration, setPlaybackReady, setPlaying } from "../store/actions/player.actions";
import { getTrackById, getTrackYtUrls } from "../services/station/station.service";
import { useSelector } from "react-redux";
import { getYtVideoUrls } from "../services/youtube/yt-api.service";
import { makeYtQueryFromTrack } from "../services/youtube/yt.service";

export function AudioPlayer() {
    const reactPlayer = useRef(null)
    const activeStationId = useSelector(state => state.systemModule.activeStationId)
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
            try {
                const ytUrl = await getTrackYtUrls(activeStationId, activeTrackId)?.[0]
                if (ytUrl) {
                    setTrackUrl(ytUrl)
                } else {
                    throw undefined
                }
            } catch (err) {
                if (err === undefined) {
                    const trackObj = getTrackById(activeStationId, activeTrackId)
                    const query = makeYtQueryFromTrack(trackObj.track)
                    const videoUrls = await getYtVideoUrls(activeStationId, activeTrackId, query)
                    setTrackUrl(videoUrls[0])
                }
            } finally {
                setPlaybackReady(false)
            }
        }
        
        setPlaying(false)
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
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onReady={onPlayerReady}
            onProgress={onPlayerProgress}
            onError={handleError}
        />
    )
}
