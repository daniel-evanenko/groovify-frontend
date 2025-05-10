import { useEffect, useState } from "react"
import { useProgress } from "../../hooks/useProgress"
import { ProgressBarVisuals } from "./ProgressBarVisuals"
import { eventBus, PLAY_PAUSED, PLAY_STARTED } from "../../services/event-bus.service"

export function PlayerProgressBar({ max }) {
    const { currentVal, set, start, stop, isRunning } = useProgress({ endingVal: max })
    const [wasRunningBeforeDrag, setWasRunningBeforeDrag] = useState(false)

    useEffect(() => {
        const playStartedCleanup = eventBus.on(PLAY_STARTED, () => start())
        const playPausedCleanup = eventBus.on(PLAY_PAUSED, () => stop())

        return () => {
            playStartedCleanup()
            playPausedCleanup()
        }
    }, [])

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
            max={max}
            onChange={set}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        /></div>
    )
}
