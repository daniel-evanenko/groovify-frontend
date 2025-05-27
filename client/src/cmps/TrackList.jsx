import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ReactSVG } from "react-svg"
import { formatDate, formatTime } from "../services/util.service"
import { StationDropdownOptions } from "./StationDropdownOptions"
import { useClickOutside } from "../hooks/useClickOutside"
import { removeTrackFromStation, toggleLikeTrack } from "../store/actions/station.actions"
import defaultImg from "/img/default-playlist-img.png"
import { stationService } from "../services/station/station.service"
import { LikeButton } from "./TrackLikedButton"
import { setActiveStation, setTrackId } from "../store/actions/system.actions"
import { setPlaying } from "../store/actions/player.actions"

export function TrackList({ station, isAllowed }) {
    const tracks = useSelector(state => state.stationModule.tracks)
    const activeTrackId = useSelector(state => state.systemModule.activeTrackId)
    const playing = useSelector(state => state.playerModule.playing)
    const [selectedRowIndex, setSelectedRowIndex] = useState(null)
    const [hoveredRow, setHoveredRow] = useState(null)
    const activeRow = useClickOutside(() => setSelectedRowIndex(null))
    const [userLikedTracks, setUserLikedTracks] = useState([])

    useEffect(() => {
        async function fetchLikedTracks() {
            try {
                const likedTracks = await stationService.getLikedStationTracks()
                setUserLikedTracks(likedTracks || [])
                console.log(likedTracks)
            } catch (err) {
                console.error("Failed to fetch liked tracks", err)
            }
        }

        fetchLikedTracks()
    }, [])

    function isTrackLiked(trackObj) {
        const res = userLikedTracks.some(_trackObj => _trackObj.track?.id === trackObj.track?.id)
        return res
    }

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

    async function onPlay(track) {
        setActiveStation(station._id)
        setTrackId(track.id)
        setPlaying(true)
    }

    function onPause() {
        setPlaying(false)
    }

    function getPlayIcon(track) {
        return <ReactSVG
            onClick={e => {
                e.stopPropagation()
                onPlay(track)
            }}
            src="/icons/play.svg"
        />
    }

    function getPauseIcon(track) {
        return <ReactSVG
            onClick={e => {
                e.stopPropagation()
                onPause(track)
            }}
            src="/icons/pause.svg"
        />
    }

    function getAppropriateTrackIcon(
        isHovered,
        isTrackActive,
        index,
        track
    ) {
        if (!isHovered) {
            return <span className="track-number">{index + 1}</span>
        }

        if (!isTrackActive) {
            return getPlayIcon(track)
        }

        if (playing) {
            return getPauseIcon(track)
        }

        return getPlayIcon(track)
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

                const isSelected = selectedRowIndex === index
                const isHovered = hoveredRow === index
                const isTrackActive = id === activeTrackId

                return (
                    <li
                        ref={activeRow}
                        key={index}
                        onClick={() => setSelectedRowIndex(isSelected ? null : index)}
                        onMouseEnter={() => setHoveredRow(index)}
                        onMouseLeave={() => setHoveredRow(null)}
                        className={`track-container ${isSelected ? "active" : ""}`}
                    >
                        <div className="track-order">
                            {getAppropriateTrackIcon(isHovered, isTrackActive, index, track)}
                        </div>

                        <div className={`track-title ${isTrackActive ? "now-playing" : ""}`}>
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
                                <LikeButton track={trackObj}
                                    isLiked={isTrackLiked(trackObj)}
                                    onToggle={() => toggleLikeTrack(trackObj)}
                                />
                            </div>
                            <span className="duration-text">{formatTime(duration_ms)}</span>
                            <div className="duration-btn">
                                {isAllowed && <StationDropdownOptions
                                    options={moreOptions}
                                    onOptionClick={(option) => handleOptionClick(option, track)}
                                />}
                            </div>
                        </div>
                    </li>
                )
            })}

        </ul>
    )
}
