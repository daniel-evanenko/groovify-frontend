
import { PlayButton } from "./PlayButton";
import { StationDropdownOptions } from "./StationDropdownOptions";


export function ActionBar({ station }) {

    const moreOptions = [
        { label: "delete", value: "delete", icon: 'icons/Delete.svg' },
        { label: "edit", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "add to queue", value: "add to queue", icon: 'icons/AddToQueue.svg' },
    ];

    return (
        <section className='action-bar'>
            <PlayButton />
            <StationDropdownOptions options={moreOptions}></StationDropdownOptions>
        </section>
    )

}