import { useState } from 'react';
import CreatePlaylistIcon from '../../../public/icons/create-playlist.svg?react';

const CREATE_PLAYLIST_ICON = 'create-playlist-icon';
const CLICKED = 'clicked';

export const MainControlls = () => {

    const [iconClassNames, setIconClassNames] = useState([CREATE_PLAYLIST_ICON]);

    const toggleIconDisplay = () => {
        setIconClassNames(prevClassNames => {
            const isClicked = prevClassNames.includes(CLICKED);
            return isClicked ? [CREATE_PLAYLIST_ICON] : [CREATE_PLAYLIST_ICON, CLICKED];
        });
    }

    const handleClick = () => {
        toggleIconDisplay();        
    }

    return (
        <section className="main-controlls">
            <h6>Icon</h6>
            <h1>Your Library</h1>
            <button className='create-button' onClick={handleClick}>
                <CreatePlaylistIcon className={iconClassNames.join(' ')} />
                Create
            </button>
        </section>
    )
}