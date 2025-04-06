import { ReactSVG } from "react-svg";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";
export function StationEditModal({ onClose, onConfirm, station }) {
    const [stationToEdit, setStationToEdit] = useState(station)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setStationToEdit(prevStationToEdit => ({ ...prevStationToEdit, [field]: value }))
    }

    const { name, description, imgUrl } = stationToEdit

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="header">
                    <h1> Edit details</h1>
                    <button onClick={onClose}>
                        <ReactSVG src="icons/close.svg"> </ReactSVG>
                    </button>
                </div>
                <img className="album-image" src={imgUrl} alt="station" />
                <input
                    className="title"
                    name="name"
                    label="name"
                    value={name}
                    onChange={handleChange}
                    maxLength={100}
                />
                <textarea className="description"
                    name="description" label="description"
                    value={description} onChange={handleChange}
                    placeholder="Add an optional description"
                    maxLength={300}>
                </textarea>
                <button className="save-button" onClick={() => onConfirm(stationToEdit)}>Save</button>
                <p className="disclaimer">By proceeding, you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</p>

            </div>
        </div>
    )
}
