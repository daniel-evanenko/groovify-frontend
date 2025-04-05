
import { useNavigate } from "react-router-dom";
import { clearStation, removeStation } from "../store/actions/station.actions";
import { PlayButton } from "./PlayButton";
import { StationDropdownOptions } from "./StationDropdownOptions";


export function ActionBar({ station }) {
    const navigate = useNavigate()
    const moreOptions = [
        { label: "Edit details", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
        { label: "Delete", value: "delete", icon: 'icons/Delete.svg' },
    ];

    function handleOptionClick(option) {
        switch (option) {
            case 'delete':
                _removeStation(station);
                break;
            case 'Edit':
                break;
            case 'Add to queue':
                break;

            default:
                break;
        }
    }

    async function _removeStation(station) {
        try {
            removeStation(station._id)
            clearStation();
            navigate('/');
        } catch (error) {
            console.error(error)
        }

    }

    return (
        <section className='action-bar'>
            <PlayButton />
            <StationDropdownOptions options={moreOptions} onOptionClick={(option) => handleOptionClick(option)}></StationDropdownOptions>
        </section>
    )

}


