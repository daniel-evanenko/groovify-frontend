
import { useNavigate } from "react-router-dom";
import { clearStation, saveStation } from "../store/actions/station.actions";
import { PlayButton } from "./PlayButton";
import { StationDropdownOptions } from "./StationDropdownOptions";
import { useEffect, useState } from "react";
import { StationEditModal } from "./StationEditModal";
import { removeStation, toggleLikeStation } from "../store/actions/library.actions";
import { LikeButton } from "./TrackLikedButton";
import { useSelector } from "react-redux";


export function ActionBar({ station, isAllowed }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const stations = useSelector(state => state.libraryModule.libraryStations)

    const moreOptions = [
        { label: "Edit details", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
        { label: "Delete", value: "delete", icon: 'icons/Delete.svg' },
    ]
    function isLikedStation() {
        return stations.some(s => s._id === station._id)
    }
    async function handleConfirm(station) {
        try {
            saveStation(station)
        } catch (error) {
            console.error(error)
        } finally {
            setIsModalOpen(false)
        }
    }
    function handleOptionClick(option) {
        switch (option) {
            case 'delete':
                _removeStation(station);
                break;
            case 'edit':
                setIsModalOpen(true)
                break;
            case 'add to queue':
                break;

            default:
                break;
        }
    }



    async function _removeStation(station) {
        try {
            await removeStation(station._id)
            clearStation();
            navigate('/');
        } catch (error) {
            console.error(error)
        }

    }

    function onToggleLikedStation(station) {
        toggleLikeStation(station)
    }
    return (
        <section className='action-bar'>
            <PlayButton />
            <LikeButton track={station}
                isLiked={isLikedStation()}
                onToggle={() => onToggleLikedStation(station)}
                bigBtn={true}
            />
            {isAllowed && <StationDropdownOptions options={moreOptions} onOptionClick={(option) => handleOptionClick(option)}></StationDropdownOptions>}
            {isModalOpen && <StationEditModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} station={station}>
            </StationEditModal>}
        </section>
    )

}


