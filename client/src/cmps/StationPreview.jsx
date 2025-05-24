import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import defaultImg from "/img/default-playlist-img.png"
import { PlayButton } from "./PlayButton"
import { setActiveStation } from "../store/actions/library.actions"

export function StationPreview({ station }) {
    const navigate = useNavigate()

    function handleStationClick() {
        if (!station) {
            navigate('/')
        }
        // setActiveStation(station)
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
                <PlayButton />
            </div>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}