import { ReactSVG } from "react-svg";
import { PlayButton } from "./PlayButton";
import { PlayerProgressBar } from "./progress-bars/PlayerProgressBar";
import { VolumeBar } from "./progress-bars/VolumeBar";
import { useEffect, useState } from "react";
import { eventBus, playerEvents } from "../services/event-bus.service";


export function AppFooter() {
    const [trackDuration, setTrackDuration] = useState(0)
    const [isInert, setIsInert] = useState(true)

    useEffect(() => {
        const trackPlaybackReadyCleanup = eventBus.on(playerEvents.TRACK_PLAYBACK_READY, onTrackPlaybackReady)

        return () => {
            trackPlaybackReadyCleanup()
        }

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
                <PlayerProgressBar trackDuration={trackDuration} />
            </div>
            <VolumeBar />

        </footer>
    )
}


