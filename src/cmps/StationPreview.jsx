import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import defaultImg from "/img/default-playlist-img.png"
import { PlayButton } from "./PlayButton"
import { loadStation } from "../store/actions/station.actions"
import { getStationFirstTrack } from "../services/station/station.service"
import { setActiveStation, setTrack } from "../store/actions/system.actions"
import { useSelector } from "react-redux"

export function StationPreview({ station }) {
    const navigate = useNavigate()
    const activeStationId = useSelector(state => state.systemModule.activeStationId)

    function handleStationClick() {
        if (!station) {
            navigate('/')
        }
        loadStation(station?._id)
        navigate(`/station/${station?._id}`)
    }

    const imgUrl = station?.images[0]?.url || defaultImg

    return (
        <article className="station-preview" onClick={handleStationClick}>
            <div>
                <img src={imgUrl} alt="station-img" onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    e.currentTarget.src = defaultImg;
                }}></img>
                <PlayButton stationId={station._id}/>
            </div>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}