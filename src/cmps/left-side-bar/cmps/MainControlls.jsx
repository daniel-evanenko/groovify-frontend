import { useState } from 'react';
import CreatePlaylistIcon from '../../../../public/icons/create-playlist.svg?react';
import { createNewStation } from '../../../services/station/station.service'
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store/store';

const CREATE_PLAYLIST_ICON = 'create-playlist-icon';
const CLICKED = 'button-clicked-options';
const PRIMARY_BUTTON = 'primary-button';
const CREATE_BUTTON = 'create-button';
const MAIN_CONTROLS = 'main-controlls';

const MainControlls = () => {

    const [iconClassNames, setIconClassNames] = useState([CREATE_PLAYLIST_ICON]);
    const navigate = useNavigate();

    const handleClick = async () => {
        const newStationId = await createNewStation()
        navigate(`station/${newStationId}`)
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