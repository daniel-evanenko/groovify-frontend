import { useState, useEffect } from 'react';
import CreatePlaylistIcon from '../../../../public/icons/create-playlist.svg?react';
import { createNewStation } from '../../../services/station/station.service'
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";

const CREATE_PLAYLIST_ICON = 'create-playlist-icon';
const CLICKED = 'button-clicked-options';
const PRIMARY_BUTTON = 'primary-button';
const CREATE_BUTTON = 'create-button';
const MAIN_CONTROLS = 'main-controlls';
const ICON_CONTENT = 'icon-content';
const ICON_CONTENT_HIDDEN = 'icon-content-hidden';
const ICON_CONTENT_SHOW = 'icon-content-show';

const MainControlls = ({ onMiniMaxClick }) => {

    const [iconClassNames, setIconClassNames] = useState([CREATE_PLAYLIST_ICON]);
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // window.addEventListener('mouseover', onMouseOver)
        // window.addEventListener('mouseout', onMouseOut)
        // return () => {
        //     window.removeEventListener('mouseover', onMouseOver)
        //     window.addEventListener('mouseout', onMouseOut)
        // }
    }, [])

    const handleClick = async () => {
        const newStationId = await createNewStation({userFullName: 'David Gelbard'})
        navigate(`station/${newStationId}`)
    }

    const handleMiniMaxClick = (event) => {
        onMiniMaxClick(event);
        setIsMinimized(preValue => !preValue)
    }

    const onMouseOver = (event) => { 
        // console.log('clientY:', event.clientY, 'clientX:', clientX);
        // console.log(event)
        // if (event.x < 280 && event.y < 180 && event.y < 900) setIsMouseOver(true)
    }

    const onMouseOut = (event) => setIsMouseOver(false)

    return (
        <section className={`${MAIN_CONTROLS} ${isMinimized ? "main-controlls-column" : "main-controlls-row"}`}>
            <div className={` ${ICON_CONTENT} ${ICON_CONTENT_SHOW}`}
                 onClick={handleMiniMaxClick}>
                <ReactSVG src="/icons/library-closed.svg" className={`library-closed-icon ${isMouseOver ? "svg-show" : "svg-hide"}`} />
            </div>
            <h1 className="fs14" style={{ display: `${isMinimized ? "none" : "block"}` }}>Your Library</h1>
            <button className={`${CREATE_BUTTON} ${PRIMARY_BUTTON}`} onClick={handleClick}>
                <CreatePlaylistIcon className={iconClassNames.join(' ')} />
            </button>
        </section>
    )
}

export default MainControlls;