import { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside"
import defaultImg from "/img/default-playlist-img.png";

export function SearchTrackList({ tracks, onAddTrack }) {
    const [activeRowIndex, setActiveRowIndex] = useState(null)
    const activeRow = useClickOutside(() => setActiveRowIndex(null))
    return (
        <ul className={"search-track-list"}>
            {tracks.map((track, index) => (
                <li
                    ref={activeRow}
                    key={index}
                    onClick={() =>
                        setActiveRowIndex(activeRowIndex == index ? null : index)
                    }
                    className={`search-track-container ${activeRowIndex === index ? "active" : ""}`}>
                    <div className="search-track-title">
                        <img
                            src={
                                track.imgUrl && track.imgUrl.length > 0
                                    ? track.imgUrl[0].url
                                    : defaultImg
                            }
                            alt={track.title}
                        />
                        <div className="search-track-info">
                            <span>{track.title}</span>
                            <div className="artist-list">
                                {track?.artists?.map((artist, idx) => (
                                    <a key={artist.spotifyId || idx}>
                                        {artist.name}
                                    </a>
                                ))}
                            </div>
                        </div>


                    </div>
                    <div className="search-track-album">{track.album}</div>
                    <div className="add-button-container">
                        <button className="add-btn" onClick={() => onAddTrack(track)}>
                            Add
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
