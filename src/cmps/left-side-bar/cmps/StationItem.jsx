import { ALBUM, STATION, GROOVIFY } from "../../../utils/constants"

const StationItem = ({ station }) => {

    const { imgUrl, name, spotifyId, isAlbum } = station;

    return (
        <div className="station-item">
            <img className="lib-station-image" src={imgUrl || "../../../public/no-station-image.jpg"}></img>
            <p className="lib-station-name">{name}</p>
            <p className="lib-station-artist">
                <span>{isAlbum ? ALBUM : STATION }</span> 
                <span> • </span>
                <span>{spotifyId ? GROOVIFY : "David Gelbard"}</span>
            </p>
        </div>
    )
}

export default StationItem;