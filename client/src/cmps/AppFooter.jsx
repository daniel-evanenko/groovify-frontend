import { ReactSVG } from "react-svg";
import { PlayButton } from "./PlayButton";
import { PlayerProgressBar } from "./progress-bars/PlayerProgressBar";
import { VolumeBar } from "./progress-bars/VolumeBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setMiniActiveTrack } from "../store/actions/system.actions";
import { getTrackById } from "../services/station/station.service";


export function AppFooter() {
    const activeStationId = useSelector(state => state.systemModule.activeStationId)
    const activeTrackId = useSelector(state => state.systemModule.activeTrackId)
    const trackPlaybackState = useSelector(state => state.playerModule.playbackReady)
    const miniActiveTrack = useSelector(state => state.systemModule.miniActiveTrack)
    const [isInert, setIsInert] = useState(true)

    useEffect(() => {
        if (trackPlaybackState) setIsInert(false)
    }, [trackPlaybackState])

    useEffect(() => {   
        if (!activeTrackId) return

        async function setTrack() {
            try {
                const trackObj = await getTrackById(activeStationId, activeTrackId)
                setMiniActiveTrack(trackObj)
            } catch (err) {
                console.error("failed to set the track in footer")
            }
        }

        setTrack()
    }, [activeTrackId])

    return (
        <footer className="app-footer">
            {miniActiveTrack &&
                <div className="active-track-preview">
                    <img src={miniActiveTrack.imgUrl} alt="album cover"></img>
                    <div className="active-track-details">
                        <a className="title">{miniActiveTrack.title}</a>
                        <a className="artist">{miniActiveTrack.artist}</a>
                    </div>
                </div>
            }
            <div className={`player-controls ${isInert ? "inert" : ""}`}>
                <div className="player-buttons">
                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/previous.svg" />
                    </button>

                    <PlayButton className={`player-controls-btn`} stationId={activeStationId} />

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


