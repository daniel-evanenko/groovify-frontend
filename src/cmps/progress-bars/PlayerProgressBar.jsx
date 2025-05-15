import { useEffect, useRef, useState } from "react"
import { ProgressBarVisuals } from "./ProgressBarVisuals"
import { eventBus, playerEvents } from "../../services/event-bus.service"

export function PlayerProgressBar({ trackDuration }) {
    const [curTrackPos, setCurTrackPos] = useState(0)
    const trackDurationRef = useRef(trackDuration)

    useEffect(() => {
        const trackPorgressCleanup = eventBus.on(playerEvents.TRACK_PROGRESS, onTrackPosChange)

        return () => {
            trackPorgressCleanup()
        }
    }, [])

    useEffect(() => {
        trackDurationRef.current = trackDuration
    }, [trackDuration])

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
        <div>
            <ProgressBarVisuals
                value={curTrackPos}
                max={trackDuration}
                onValueChange={onTrackSeek}
            />
        </div>
    )
}
