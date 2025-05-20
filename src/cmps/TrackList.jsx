import { useEffect, useState } from "react"
import { ReactSVG } from "react-svg"
import { formatDate, formatTime } from "../services/util.service"
import { StationDropdownOptions } from "./StationDropdownOptions"
import { useClickOutside } from "../hooks/useClickOutside"
import { removeTrackFromStation } from "../store/actions/station.actions"
import defaultImg from "/img/default-playlist-img.png"
import { getStationsTracks } from "../services/spotify/spotify-api.service"
import { useSelector } from "react-redux"

export function TrackList({ station }) {
    const [activeRowIndex, setActiveRowIndex] = useState(null)
    const [hoveredRow, setHoveredRow] = useState(null)
    const [currentlyPlayingTrackId, setCurrentlyPlayingTrackId] = useState(null)
    const activeRow = useClickOutside(() => setActiveRowIndex(null))
    const tracks = useSelector(storeState => storeState.stationModule.tracks)


    const moreOptions = [
        { label: "Add to playlist", value: "add to playlist", icon: "icons/create-playlist.svg" },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
        { label: "Remove from this playlist", value: "delete", icon: "icons/trash.svg" },
    ]

    function handleOptionClick(option, track) {
        switch (option) {
            case 'add to playlist':
                break
            case 'add to queue':
                break
            case 'delete':
                removeTrackFromStation(track.id, station._id)
                break
            default:
                break
        }
    }

    function onPlay(track) {
        setCurrentlyPlayingTrackId(track.id)

    }

    function onPause() {
        setCurrentlyPlayingTrackId(null)
    }
    return (
        <ul className="track-list">
            <li className="track-header">
                <div className="track-order">#</div>
                <div className="track-title">Title</div>
                <div className="track-album">Album</div>
                <div className="track-date-added">Date Added</div>
                <div className="track-duration">
                    <div className="duration-btn left"></div>
                    <span className="duration-text">
                        <ReactSVG src="/icons/clock.svg" />
                    </span>
                    <div className="duration-btn right"></div>
                </div>
            </li>

            {tracks.map((trackObj, index) => {
                const {
                    track,
                    track: {
                        id,
                        name,
                        duration_ms,
                        album,
                        artists,
                        external_urls,
                    },
                    added_at,
                } = trackObj

                const isActive = activeRowIndex === index
                const isHovered = hoveredRow === index
                const isPlaying = id === currentlyPlayingTrackId

                return (
                    <li
                        ref={activeRow}
                        key={index}
                        onClick={() => setActiveRowIndex(isActive ? null : index)}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`track-container ${isActive ? "active" : ""}`}
                    >
                        <div className="track-order">
                            {!isPlaying && !isHovered && (
                                <span className="track-number">{index + 1}</span>
                            )}

                            {!isPlaying && isHovered && (
                                <ReactSVG
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onPlay(track)
                                    }}
                                    src="/icons/play.svg"
                                />
                            )}

                            {isPlaying && !isHovered && (
                                <ReactSVG className="now-playing" src="/icons/pause.svg" />
                            )}

                            {isPlaying && isHovered && (
                                <ReactSVG
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onPause()
                                    }}
                                    src="/icons/pause.svg"
                                />
                            )}
                        </div>

                        <div className={`track-title ${isPlaying ? "now-playing" : ""}`}>
                            <img
                                src={album?.images?.[0]?.url || defaultImg}
                                alt={name}
                            />
                            <div className="track-info">
                                <span>{name}</span>
                                <div className="artist-list">
                                    {artists?.map((artist, idx) => (
                                        <a key={artist.id || idx}>{artist.name}</a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="track-album">
                            <a>{album?.name}</a>
                        </div>

                        <div className="track-date-added">{formatDate(added_at)}</div>

                        <div className="track-duration">
                            <div className="duration-btn">
                                <ReactSVG
                                    src={"/icons/like.svg"}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                />
                            </div>
                            <span className="duration-text">{formatTime(duration_ms)}</span>
                            <div className="duration-btn">
                                <StationDropdownOptions
                                    options={moreOptions}
                                    onOptionClick={(option) => handleOptionClick(option, track)}
                                />
                            </div>
                        </div>
                    </li>
                )
            })}

        </ul>
    )
}
