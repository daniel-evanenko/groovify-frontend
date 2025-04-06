import { useNavigate } from "react-router-dom";
import { ALBUM, STATION, GROOVIFY } from "../../../utils/constants"
import { setActiveStation } from "../../../store/actions/library.actions";

const StationItem = ({ station }) => {
    const navigate = useNavigate()
    const { imgUrl, name, spotifyId, isAlbum } = station;

    function handleClick() {
        if (!station) {
            navigate('/')
        }
        setActiveStation(station?.spotifyId)
        navigate(`/station/${station?.spotifyId}`)
    }
    return (
        <div onClick={handleClick} className="station-item">
            <img className="lib-station-image" src={imgUrl || "../../../public/no-station-image.jpg"}></img>
            <p className="lib-station-name">{name}</p>
            <p className="lib-station-artist">
                <span>{isAlbum ? ALBUM : STATION}</span>
                <span> • </span>
                <span>{spotifyId ? GROOVIFY : "David Gelbard"}</span>
            </p>
        </div>
    )
}

export default StationItem;