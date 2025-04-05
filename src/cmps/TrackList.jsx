import { useRef, useState } from "react";
import { ReactSVG } from "react-svg";
import { formatDate, formatTime } from "../services/util.service";
import { StationDropdownOptions } from "./StationDropdownOptions";
import { useClickOutside } from "../hooks/useClickOutside";
import { removeTrackFromStation } from "../store/actions/station.actions";

export function TrackList({ station }) {
    const [activeRowIndex, setActiveRowIndex] = useState(null);
    const activeRow = useClickOutside(() => setActiveRowIndex(null));

    const moreOptions = [
        { label: "Add to playlist", value: "add to playlist", icon: "icons/create-playlist.svg" },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
        { label: "Delete", value: "delete", icon: "icons/Delete.svg" },
    ];

    function handleOptionClick(option, track) {
        switch (option) {
            case 'Add to playlist':
                break;
            case 'Add to queue':
                break;
            case 'Delete':
                removeTrackFromStation(track.id, station._id)
                break;

            default:
                break;
        }
    }

    return (
        <ul className={"track-list"}>
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
            {station.tracks.map((track, index) => (
                <li
                    ref={activeRow}
                    key={index}
                    onClick={() =>
                        setActiveRowIndex(activeRowIndex == index ? null : index)
                    }
                    className={`track-container ${activeRowIndex === index ? "active" : ""}`}
                >
                    <div className="track-order">{index + 1}</div>
                    {TitleCmp({ track })}
                    <div className="track-album">
                        <a>{track.album}</a>
                    </div>
                    <div className="track-date-added">{formatDate(track.addedAt)}</div>
                    <div className="track-duration">
                        <div className="duration-btn left">
                            <ReactSVG src="/icons/like.svg" />
                        </div>
                        <span className="duration-text">{formatTime(track.formalDuration)}</span>
                        <div className="duration-btn right">
                            <StationDropdownOptions
                                options={moreOptions}
                                onOptionClick={(option) => handleOptionClick(option, track)}
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function TitleCmp({ track }) {
    return (
        <div className="track-title">
            <img src={track.imgUrl[2].url} alt={track.title} />
            <div className="track-info">
                <span>{track.title}</span>
                <a>{track.artists.map((a) => a.name).join(", ")}</a>
            </div>
        </div>
    );
}