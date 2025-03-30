import { ReactSVG } from "react-svg";


export function ActionBar() {

    function handlePlayClick() {}
    return (
        <section className='action-bar'>
            <button className="play-btn" onClick={handlePlayClick}>
                <ReactSVG src='/icons/play.svg'
                />
            </button>
        </section>
    )

}