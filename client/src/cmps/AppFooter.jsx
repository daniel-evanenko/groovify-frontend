import { ReactSVG } from "react-svg";
import { PlayButton } from "./PlayButton";
import { PlayerProgressBar } from "./progress-bars/PlayerProgressBar";
import { VolumeBar } from "./progress-bars/VolumeBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export function AppFooter() {
    const activeStationId = useSelector(state => state.systemModule.activeStationId)
    const trackPlaybackState = useSelector(state => state.playerModule.playbackReady)
    const [isInert, setIsInert] = useState(true)

    useEffect(() => {
        if (trackPlaybackState) setIsInert(false)
    }, [trackPlaybackState])

    return (
        <footer className="app-footer">
            <div className={`player-controls ${isInert ? "inert" : ""}`}>
                <div className="player-buttons">
                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/previous.svg" />
                    </button>

                    <PlayButton className={`player-controls-btn`} stationId={activeStationId}/>

                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/next.svg" />
                    </button>
                </div>
                <PlayerProgressBar />
            </div>
            <VolumeBar />
        </footer>
    )
}


