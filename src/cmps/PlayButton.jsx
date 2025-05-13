import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { eventBus, PLAY_PAUSED, PLAY_STARTED } from "../services/event-bus.service";
import { debounce } from "../services/util.service";

export function PlayButton() {
    const [isPlaying, setIsPlaying] = useState(false)
    const onHandlePlayClickDebounce = useRef(debounce(handlePlayClick, 100)).current

    useEffect(() => {
        eventBus.emit(isPlaying ? PLAY_STARTED : PLAY_PAUSED)
    }, [isPlaying])

    function handlePlayClick(ev) {
        ev.stopPropagation()
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
    }

    return (
        <button className="play-btn" onClick={ev => onHandlePlayClickDebounce(ev)}>
            {isPlaying ? <ReactSVG src="/icons/pause.svg" /> : <ReactSVG src="/icons/play.svg" />}
        </button>
    )
}