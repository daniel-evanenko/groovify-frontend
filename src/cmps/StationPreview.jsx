import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import defaultImg from "/img/default-playlist-img.png"
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
                <img src={station?.imgUrl || defaultImg} alt="station-img" onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    e.currentTarget.src = defaultImg;
                }}></img>
                <PlayButton />
            </div>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}