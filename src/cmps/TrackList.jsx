import { useState } from "react";
import { ReactSVG } from "react-svg";
import { formatDate, formatTime } from "../services/util.service";

export function TrackList({ station }) {

    const [tracks, setTracks] = useState(station.tracks || [])
    return (
        <ul className={'track-list'}>
            <li className="track-header">
                <div className="track-order">#</div>
                <div className="track-title">Title</div>
                <div className="track-album">Album</div>
                <div className="track-date-added">Date Added</div>
                <div className="track-duration">
                    <ReactSVG src='/icons/clock.svg' />
                </div>
            </li>
            {tracks.map((track, index) => (
                <li key={index} className="track-container">
                    <div className="track-order">{index + 1}</div>
                    {TitleCmp({ track })}
                    <div className="track-album"><a>{track.album}</a></div>
                    <div className="track-date-added">{formatDate(track.addedAt)}</div>
                    <div className="track-duration">{formatTime(track.formalDuration)}</div>
                </li>

            ))}

        </ul>
    )
}


export function TitleCmp({ track }) {
    return (
        <div className="track-title">
            <img src={track.imgUrl[2].url} alt={track.title} />
            <div className="track-info">
                <span>{track.title}</span>
                <a>{track.artists.map(a => a.name).join(', ')}</a>
            </div>
        </div>
    )

}