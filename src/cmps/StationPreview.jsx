import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import tmpImg from "/tmp-assets/temp_station_img.jpg"
import { setActiveStation } from "../store/actions/library.actions"
import { PlayButton } from "./PlayButton"

export function StationPreview({ station }) {
    const navigate = useNavigate()

    function handleStationClick() {
        if (!station) {
            navigate('/')
        }
        setActiveStation(station?.spotifyId)
        navigate(`/station/${station?.spotifyId}`)

    }

    return (
        <article className="station-preview" onClick={handleStationClick}>
            <div>
                <img src={station?.imgUrl || tmpImg} alt="station-img"></img>
                <PlayButton />
            </div>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}