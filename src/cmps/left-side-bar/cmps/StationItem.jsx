
const StationItem = ({ station }) => {

    const { imgUrl, name, spotifyId, isAlbum } = station;

    return (
        <div className="station-item">
            <img className="lib-station-image" src={imgUrl}></img>
            <p className="lib-station-name">{name}</p>
            <p className="lib-station-artist"><span>{isAlbum ? "Album" : "Station" }</span> • <span>{spotifyId ? "Spotify" : "David Gelbard"}</span></p>
        </div>
    )
}

export default StationItem;