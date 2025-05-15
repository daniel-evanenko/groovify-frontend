import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { eventBus, PLAY_PAUSED, PLAY_STARTED } from "../services/event-bus.service";
import { debounce } from "../services/util.service";

export function PlayButton() {
    const [isPlaying, setIsPlaying] = useState(false)

    const debouncedTogglePlay = useRef(
        debounce(() => {
            setIsPlaying(prev => !prev)
        }, 500)
    ).current

    useEffect(() => {
        eventBus.emit(isPlaying ? PLAY_STARTED : PLAY_PAUSED)
    }, [isPlaying])

    function handlePlayClick(ev) {
        ev.stopPropagation()
        debouncedTogglePlay()
    }

    return (
        <button className="play-btn" onClick={ev => handlePlayClick(ev)}>
            {isPlaying ? <ReactSVG src="/icons/pause.svg" /> : <ReactSVG src="/icons/play.svg" />}
        </button>
    )
}