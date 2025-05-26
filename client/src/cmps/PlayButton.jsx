import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import { setPlaying } from "../store/actions/player.actions";
import { setActiveStation, setTrack } from "../store/actions/system.actions";
import { getStationFirstTrack } from "../services/station/station.service";

export function PlayButton({ stationId }) {
    const isPlaying = useSelector(state => state.playerModule.playing)
    const activeStationId = useSelector(state => state.systemModule.activeStationId)

    async function handlePlayClick(ev) {
        ev.stopPropagation()
        if (stationId !== activeStationId) {
            try {
                const trackObj = await getStationFirstTrack(stationId)
                setActiveStation(stationId)
                setTrack(trackObj.track.id)
            } catch (err) {
                console.error("failed to fetch first track", err)
            }
        } else {
            setPlaying(!isPlaying)
        }
    }

    function isActiveStation() {
        return activeStationId === stationId
    }

    return (
        <button className="play-btn" onClick={ev => handlePlayClick(ev)}>
            {isActiveStation() && isPlaying ? <ReactSVG src="/icons/pause.svg" /> : <ReactSVG src="/icons/play.svg" />}
        </button>
    )
}