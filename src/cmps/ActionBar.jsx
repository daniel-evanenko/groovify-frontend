import { ReactSVG } from "react-svg";
import { StationDropdownOptions } from "./StationDropdownOptions";


export function ActionBar() {

    function handlePlayClick() { }
    return (
        <section className='action-bar'>
            <div>
                <button className="play-btn" onClick={handlePlayClick}>
                    <ReactSVG src='/icons/play.svg'
                    />
                </button>
            </div>
            <div>
                <StationDropdownOptions options={['Edit','Delete']}></StationDropdownOptions>
            </div>
        </section>
    )

}