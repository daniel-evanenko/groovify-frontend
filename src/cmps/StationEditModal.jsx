import { ReactSVG } from "react-svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
const CLOUD_NAME = 'debxyogu4';
const UPLOAD_PRESET = 'station_images';
export function StationEditModal({ onClose, onConfirm, station, openFileUpload = false }) {
    const [stationToEdit, setStationToEdit] = useState(station)
    const fileInputRef = useRef(null)

    useEffect(() => {
        if (openFileUpload) {
            handleUploadButtonClick()
        }
    }, [openFileUpload]);


    function handleUploadButtonClick() {
        fileInputRef.current.click()
    }

    async function handleFileChange(event) {
        const file = event.target.files[0]
        if (!file) return

        const formData = new FormData();
        formData.append('file', file);
        formData.append('cloud_name', CLOUD_NAME);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                formData
            );

            setStationToEdit((prevStationToEdit) => ({ ...prevStationToEdit, imgUrl: response.data.secure_url, }))
        } catch (error) {
            console.error('Upload error:', error)

        }
    }

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
                <div className='inner-modal'>
                    <img className="album-image" src={imgUrl} onClick={handleUploadButtonClick} alt="station" />
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
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
        </div>
    )
}
