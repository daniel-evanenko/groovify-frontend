import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import tmpImg from "/tmp-assets/temp_station_img.jpg"

export function StationPreview({ station }) {
    const navigate = useNavigate()

    return (
        <article className="station-preview" onClick={() => navigate(`/station/${station?.spotifyId}`)}>
            <img src={station?.imgUrl || tmpImg} alt="station-img"></img>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}