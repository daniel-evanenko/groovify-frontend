import { useEffect, useState } from "react"
import { useProgress } from "../../hooks/useProgress"
import { ProgressBarVisuals } from "./ProgressBarVisuals"
import { eventBus, PLAY_PAUSED, PLAY_STARTED } from "../../services/event-bus.service"

export function PlayerProgressBar({ max }) {
    const { isReady, isRunning, currentVal, set, start, stop, setEndingVal } = useProgress({ startVal: 0 })
    const [wasRunningBeforeDrag, setWasRunningBeforeDrag] = useState(false)

    useEffect(() => {
        if (max > 0) setEndingVal(max)
    }, [max])

    useEffect(() => {
        if (!isReady) return 

        const playStartedCleanup = eventBus.on(PLAY_STARTED, () => start())
        const playPausedCleanup = eventBus.on(PLAY_PAUSED, () => stop())

        return () => {
            playStartedCleanup()
            playPausedCleanup()
        }
    }, [isReady])

    function handleDragStart() {
        if (isRunning) {
            setWasRunningBeforeDrag(true)
            stop()
        }
    }

    function handleDragEnd() {
        if (wasRunningBeforeDrag) {
            setWasRunningBeforeDrag(false)
            start()
        }
    }

    return (
        <div>
            <ProgressBarVisuals
                value={currentVal}
                max={max || 1}
                onChange={set}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            />
        </div>
    )
}
