import { LongTxt } from "./LongTxt"
import { useNavigate } from "react-router-dom"
import defaultImg from "/img/default-playlist-img.png"
import { PlayButton } from "./PlayButton"
import { loadStation } from "../store/actions/station.actions"
import { stationService } from "../services/station/station.service"

export function StationPreview({ station }) {
    const navigate = useNavigate()

    async function handleStationClick() {
        if (!station) {
            navigate('/')
            return
        }

        else if (!station._id) {
            try {
                const newStation = await stationService.getById(station.id)
                loadStation(newStation._id)
                navigate(`/station/${newStation._id}`)
                return
            } catch (err) {
                console.error("error getting new station from spotify", err)
                navigate('/')
                throw err
            }
        }

        else {
            loadStation(station._id)
            navigate(`/station/${station._id}`)
        }
    }

    const imgUrl = station?.images[0]?.url || defaultImg

    return (
        <article className="station-preview" onClick={handleStationClick}>
            <div>
                <img src={imgUrl} alt="station-img" onError={(e) => {
                    e.currentTarget.onerror = null; // prevent infinite loop
                    e.currentTarget.src = defaultImg;
                }}></img>
                <PlayButton stationId={station._id} />
            </div>
            <LongTxt>{station?.description || "Your weekly update of the most played tracks right now - Global."}</LongTxt>
        </article>
    )
}