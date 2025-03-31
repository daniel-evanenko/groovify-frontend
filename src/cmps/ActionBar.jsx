import { ReactSVG } from "react-svg";
import { StationDropdownOptions } from "./StationDropdownOptions";


export function ActionBar({ station }) {


    const moreOptions = [
        { label: "delete", value: "delete", icon: 'icons/Delete.svg' },
        { label: "edit", value: "edit", icon: 'icons/Pencil.svg' },
        { label: "add to queue", value: "add to queue", icon: 'icons/AddToQueue.svg' },
    ];

    function handlePlayClick() { }
    return (
        <section className='action-bar'>
            <div>
                <button className="play-btn" onClick={handlePlayClick}>
                    <ReactSVG src='/icons/play.svg' />
                </button>
            </div>
            <div>
                <StationDropdownOptions options={moreOptions}></StationDropdownOptions>
            </div>
        </section>
    )

}