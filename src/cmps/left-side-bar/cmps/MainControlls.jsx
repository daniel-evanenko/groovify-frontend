import { useState } from 'react';
import { stationService } from '../../../services/station/station.service';
import { addStation } from '../../../store/actions/library.actions';
import CreatePlaylistIcon from '../../../../public/icons/create-playlist.svg?react';

const CREATE_PLAYLIST_ICON = 'create-playlist-icon';
const CLICKED = 'button-clicked-options';
const PRIMARY_BUTTON = 'primary-button';
const CREATE_BUTTON = 'create-button';
const MAIN_CONTROLS = 'main-controlls';

const MainControlls = () => {

    const [iconClassNames, setIconClassNames] = useState([CREATE_PLAYLIST_ICON]);

    const toggleIconDisplay = () => {
        setIconClassNames(prevClassNames => {
            const isClicked = prevClassNames.includes(CLICKED);
            return isClicked ? [CREATE_PLAYLIST_ICON] : [CREATE_PLAYLIST_ICON, CLICKED];
        });
    }

    const handleClick = async (event) => {
        // toggleIconDisplay();
        // event.preventDefault();
        const createdStation = await stationService.createNewStation({ userFullName: "David Gelbard" });
        console.log('createdStation:', createdStation)
        addStation(createdStation)
        
    }

    return (
        <section className={`${MAIN_CONTROLS}`}>
            <h6></h6>
            <h1 className="fs14">Your Library</h1>
            <button className={`${CREATE_BUTTON} ${PRIMARY_BUTTON}`} onClick={handleClick}>
                <CreatePlaylistIcon className={iconClassNames.join(' ')} />
            </button>
        </section>
    )
}

export default MainControlls;