
import { useNavigate } from "react-router-dom";
import { clearStation, saveStation } from "../store/actions/station.actions";
import { PlayButton } from "./PlayButton";
import { StationDropdownOptions } from "./StationDropdownOptions";
import { useState } from "react";
import { StationEditModal } from "./StationEditModal";
import { removeStation } from "../store/actions/library.actions";


export function ActionBar({ station, isAllowed}) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const moreOptions = [
        { label: "Edit details", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
        { label: "Delete", value: "delete", icon: 'icons/Delete.svg' },
    ]

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
                _removeStation(station)
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

    return (
        <section className='action-bar'>
            <PlayButton stationId={station?._id}/>
            {isAllowed && <StationDropdownOptions options={moreOptions} onOptionClick={(option) => handleOptionClick(option)}></StationDropdownOptions>}
            {isModalOpen && <StationEditModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} station={station}>
            </StationEditModal>}
        </section>
    )

}


