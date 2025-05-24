import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { eventBus, playerEvents } from "../services/event-bus.service";

export function PlayButton() {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        eventBus.emit(isPlaying ? playerEvents.PLAY_STARTED : playerEvents.PLAY_PAUSED)
    }, [isPlaying])

    function handlePlayClick(ev) {
        ev.stopPropagation()
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
    }

    return (
        <button className="play-btn" onClick={ev => handlePlayClick(ev)}>
            {isPlaying ? <ReactSVG src="/icons/pause.svg" /> : <ReactSVG src="/icons/play.svg" />}
        </button>
    )
}