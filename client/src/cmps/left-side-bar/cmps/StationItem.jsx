import { useNavigate } from "react-router-dom";
import { ALBUM, STATION, GROOVIFY } from "../../../utils/constants"
import { setActiveStation } from "../../../store/actions/library.actions";
import { useSelector } from "react-redux";

const StationItem = ({ station, isMinimized }) => {

    const navigate = useNavigate()
    const { name, _id, isAlbum } = station
    const imgUrl = station.images.length > 0 && station.images[0].url
    const currentActiveStation = useSelector(storeState => storeState.stationModule.currentActiveStation);
    const isActive = currentActiveStation?._id === _id

    const handleClick = () => {
        if (!station) {
            navigate('/')
        }
        setActiveStation(station)
        navigate(`/station/${station?._id}`)
    }

    return (
        <div onClick={handleClick} className={`station-item ${isActive ? "active-station" : ""}`}>
            <img className="lib-station-image" src={imgUrl || "/img/default-playlist-img.png"}></img>
            {
                !isMinimized && <>
                    <p className="lib-station-name">{name}</p>
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