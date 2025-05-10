import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import { eventBus, PLAY_PAUSED, PLAY_STARTED } from "../services/event-bus.service";

export function PlayButton() {
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        eventBus.emit(isPlaying ? PLAY_STARTED : PLAY_PAUSED)
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