import { ReactSVG } from "react-svg";

export function PlayButton() {

    function handlePlayClick() { }

    return (
        <button className="play-btn" onClick={handlePlayClick}>
            <ReactSVG src='/icons/play.svg' />
        </button>
    )
}