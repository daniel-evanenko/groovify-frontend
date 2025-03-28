import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import tmpImg from "/tmp-assets/temp_station_img.jpg"

export function StationPreview({ station }) {
    const navigate = useNavigate()

    return (
        <article className="station-preview" onClick={() => navigate(`/station/${station?._id}`)}>
            <img src={station?.img || tmpImg} alt="station-img"></img>
            <LongTxt>{station?.desc || "loremipsum"}</LongTxt>
        </article>
    )
}