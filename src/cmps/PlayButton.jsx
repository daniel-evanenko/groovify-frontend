import { ReactSVG } from "react-svg";

export function PlayButton() {

    function handlePlayClick(ev) {
        ev.stopPropagation()
    }

    return (
        <button className="play-btn" onClick={ev => handlePlayClick(ev)}>
            <ReactSVG src='/icons/play.svg' />
        </button>
    )
}