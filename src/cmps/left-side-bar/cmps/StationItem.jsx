import { useNavigate } from "react-router-dom";
import { ALBUM, STATION, GROOVIFY } from "../../../utils/constants"
import { useSelector } from "react-redux";
import { loadStation } from "../../../store/actions/station.actions";

const StationItem = ({ station, isMinimized }) => {
    const navigate = useNavigate()
    const selectedStation = useSelector(state => state.stationModule.station?._id)
    const activeStationId = useSelector(state => state.systemModule.activeStationId)

    const { name, _id, isAlbum } = station
    const imgUrl = station.images.length > 0 && station.images[0].url

    const handleClick = () => {
        if (!station) {
            navigate('/')
        }
        loadStation(_id)
        navigate(`/station/${_id}`)
    }

    const selectedClass = selectedStation === _id ? "selected-station" : ""
    const activeClass = activeStationId === _id ? "active" : ""

    return (
        <div onClick={handleClick} className={`station-item ${selectedClass}`}>
            <img className="lib-station-image" src={imgUrl || "/img/default-playlist-img.png"}></img>
            {
                !isMinimized && <>
                                    <p className={`lib-station-name ${activeClass}`}>{name}</p>
                                    <p className="lib-station-artist">
                                    <span>{isAlbum ? ALBUM : STATION}</span>
                                    <span> • </span>
                                    <span>{_id ? GROOVIFY : "David Gelbard"}</span>
                                    </p>
                                </>
            }
        </div>
    )
}

export default StationItem;