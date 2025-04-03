
import { PlayButton } from "./PlayButton";
import { StationDropdownOptions } from "./StationDropdownOptions";


export function ActionBar({ station }) {

    const moreOptions = [
        { label: "Delete", value: "delete", icon: 'icons/Delete.svg' },
        { label: "Edit", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "Add to queue", value: "add to queue", icon: "icons/add-to-queue.svg" },
    ];

    return (
        <section className='action-bar'>
            <PlayButton />
            <StationDropdownOptions options={moreOptions}></StationDropdownOptions>
        </section>
    )

}