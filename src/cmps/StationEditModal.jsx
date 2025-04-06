import { ReactSVG } from "react-svg";
export function StationEditModal({ onClose, onConfirm, station }) {

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="header">
                    <h1> Edit details</h1>
                    <button onClick={onClose}>
                        <ReactSVG src="icons/close.svg"> </ReactSVG>
                    </button>
                </div>
                <img className="album-image" src={station.imgUrl} alt="station" />
                <input className="title"></input>
                <textarea className="description" placeholder="Add an optional description" maxLength={300}>
                </textarea>
                <button className="save-button" onClick={onConfirm}>Save</button>
                <p className="disclaimer">By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

            </div>
        </div>
    )
}
