import { useState } from "react";
import { useClickOutside } from "../hooks/useClickOutside"
import defaultImg from "/img/default-playlist-img.png";

export function SearchTrackList({ tracks, onAddTrack }) {
    const [activeRowIndex, setActiveRowIndex] = useState(null)
    const activeRow = useClickOutside(() => setActiveRowIndex(null))

    return (
        <ul className="search-track-list">
            {tracks.map((trackObj, index) => {
                const {
                    track,
                    added_at
                } = trackObj

                const {
                    id,
                    name,
                    duration_ms,
                    album,
                    artists
                } = track

                return (
                    <li
                        ref={activeRow}
                        key={id || index}
                        onClick={() =>
                            setActiveRowIndex(activeRowIndex === index ? null : index)
                        }
                        className={`search-track-container ${activeRowIndex === index ? "active" : ""}`}>

                        <div className="search-track-title">
                            <img
                                src={album?.images?.[0]?.url || defaultImg}
                                alt={name}
                            />
                            <div className="search-track-info">
                                <span>{name}</span>
                                <div className="artist-list">
                                    {artists?.map((artist, idx) => (
                                        <a key={artist.id || idx}>{artist.name}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="search-track-album">
                            <a>{album?.name}</a>
                        </div>

                        <div className="add-button-container">
                            <button className="add-btn" onClick={() => onAddTrack(trackObj)}>
                                Add
                            </button>
                        </div>
                    </li>
                )
            })}
        </ul>
    );
}
