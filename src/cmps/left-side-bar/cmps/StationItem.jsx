import { useNavigate } from "react-router-dom";
import { ALBUM, STATION, GROOVIFY } from "../../../utils/constants"
import { setActiveStation } from "../../../store/actions/library.actions";
import { store } from "../../../store/store";
import { libraryReducer } from "../../../store/reducers/library.reducer";

const StationItem = ({ station }) => {
    const navigate = useNavigate()
    const { name, spotifyId, isAlbum } = station
    const imgUrl = station.images.length > 0 && station.images[0].url

    const handleClick = () => {
        if (!station) {
            navigate('/')
        }
        setActiveStation(station?.spotifyId)
        navigate(`/station/${station?.spotifyId}`)
    }

    const setActiveStationClass = () => {
        const activeStationId = store.getState().libraryModule.activeStationId
        // console.log('activeStationId', activeStationId)
        // console.log('spotifyId', spotifyId)
        return activeStationId === spotifyId ? 'active-station' : ''
    }

    return (
        <div onClick={handleClick} className={`station-item ${setActiveStationClass()}`}>
            <img className="lib-station-image" src={imgUrl || "../../../public/img/default-playlist-img.png"}></img>
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