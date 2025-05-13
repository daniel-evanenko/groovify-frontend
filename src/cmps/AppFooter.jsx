import { ReactSVG } from "react-svg";
import { PlayButton } from "./PlayButton";
import { PlayerProgressBar } from "./progress-bars/PlayerProgressBar";
import { VolumeBar } from "./progress-bars/VolumeBar";
import { useEffect, useState } from "react";
import { eventBus, TRACK_PLAYBACK_READY } from "../services/event-bus.service";


export function AppFooter() {
    const [trackDuration, setTrackDuration] = useState(0)
    const [isInert, setIsInert] = useState(true)

    useEffect(() => {
        eventBus.on(TRACK_PLAYBACK_READY, onTrackPlaybackReady)
    }, [])
    
    function onTrackPlaybackReady(duration) {
        setTrackDuration(duration)
        setIsInert(false)
    }

    return (
        <footer className="app-footer">
            <div className={`player-controls ${isInert ? "inert" : ""}`}>
                <div className="player-buttons">
                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/previous.svg" />
                    </button>

                    <PlayButton className={`player-controls-btn`} />


                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/next.svg" />
                    </button>
                </div>
                <PlayerProgressBar max={trackDuration} />
            </div>
            <VolumeBar />

        </footer>
    )
}


