import { useEffect, useRef, useState } from "react"
import { ProgressBarVisuals } from "./ProgressBarVisuals"
import { eventBus, playerEvents } from "../../services/event-bus.service"
import { formatTime } from "../../services/util.service"

export function PlayerProgressBar({ trackDuration }) {
    const [curTrackPos, setCurTrackPos] = useState(0)
    const trackDurationRef = useRef(trackDuration)
    const curTimeDisplayRef = useRef()
    const trackDurationDisplayRef = useRef()

    useEffect(() => {
        const trackPorgressCleanup = eventBus.on(playerEvents.TRACK_PROGRESS, onTrackPosChange)

        return () => {
            trackPorgressCleanup()
        }
    }, [])

    useEffect(() => {
        trackDurationRef.current = trackDuration
        trackDurationDisplayRef.current.innerText = formatTime(trackDuration)
    }, [trackDuration])

    useEffect(() => {
        curTimeDisplayRef.current.innerText = formatTime(curTrackPos)
    }, [curTrackPos])

    function onTrackSeek(newPos) {
        eventBus.emit(playerEvents.SEEK, newPos)
        onTrackPosChange(newPos)
    }

    function onTrackPosChange(newPos) {
        const duration = trackDurationRef.current
        const clampedTrackPos = Math.min(Math.max(newPos, 0), duration)
        setCurTrackPos(clampedTrackPos)
    }

    return (
        <div className="player-progress-bar">
            <span ref={curTimeDisplayRef}></span>
            <ProgressBarVisuals
                value={curTrackPos}
                max={trackDuration}
                onValueChange={onTrackSeek}
            />
            <span ref={trackDurationDisplayRef}></span>
        </div>
    )
}
