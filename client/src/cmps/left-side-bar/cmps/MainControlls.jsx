import { useState } from 'react';
import CreatePlaylistIcon from '../../../../public/icons/create-playlist.svg?react';
import { createNewStation } from '../../../services/station/station.service'
import { useNavigate } from 'react-router-dom';
import { ReactSVG } from "react-svg";
import { store } from '../../../store/store';
import { useSelector } from'react-redux';
import { SET_STATIONS } from '../../../store/reducers/library.reducer';

const CREATE_PLAYLIST_ICON = 'create-playlist-icon';
const CLICKED = 'button-clicked-options';
const PRIMARY_BUTTON = 'primary-button';
const CREATE_BUTTON = 'create-button';
const MAIN_CONTROLS = 'main-controlls';
const ICON_CONTENT = 'icon-content';
const ICON_CONTENT_HIDDEN = 'icon-content-hidden';
const ICON_CONTENT_SHOW = 'icon-content-show';

const MainControlls = ({ onMiniMaxClick, isMouseLeftSideBarOver }) => {
    const [iconClassNames, setIconClassNames] = useState([CREATE_PLAYLIST_ICON])
    const [isMinimized, setIsMinimized] = useState(false)
    const [isIconHover, setIsIconHover] = useState(false)
    const user = useSelector(state => state.userModule.user);
    const stations = useSelector(state => state.libraryModule.stations);
    const navigate = useNavigate();

    const handleClick = async () => {
        const newStation = await createNewStation({ userFullName: user.fullname })
        const { _id: newStationId } = newStation
        store.dispatch({ type: SET_STATIONS, stations: [...stations, newStation] })
        navigate(`station/${newStationId}`)
    }

    const handleMiniMaxClick = (event) => {
        onMiniMaxClick(event)
        setIsMinimized(preValue => !preValue)

    }

    const getButtonMarginClass = () => isMinimized ? "create-button-mini" : "create-button-max"

    const getSelectedIcon = () => {
        let svgIconPath

        if (!isMinimized) svgIconPath = "/icons/library-opened.svg"
        if (isMinimized) svgIconPath = "/icons/library-closed.svg"
        if (isMinimized && isIconHover) svgIconPath = "/icons/library-opened.svg"

        return svgIconPath;
    }

    return (
        <section className={`${MAIN_CONTROLS} ${isMinimized ? "main-controlls-column" : "main-controlls-row"}`}>
            <div className={` ${ICON_CONTENT} ${isMinimized ? "minimized" : ""} ${isMouseLeftSideBarOver ? ICON_CONTENT_SHOW : ICON_CONTENT_HIDDEN}`}
                onClick={handleMiniMaxClick} onMouseOver={() => setIsIconHover(true)} onMouseOut={() => setIsIconHover(false)}>
                <ReactSVG src={getSelectedIcon()} />
            </div>
            <h1 className={`fs14 ${isMouseLeftSideBarOver ? "slide-in" : "slide-out"}`}
                style={{ display: `${isMinimized ? "none" : "block"}` }}
                onClick={handleMiniMaxClick}>
                Your Library
            </h1>
            <button className={`${CREATE_BUTTON} ${PRIMARY_BUTTON} ${getButtonMarginClass()}`} onClick={handleClick}>
                <CreatePlaylistIcon className={iconClassNames.join(' ')} />
            </button>
        </section>
    )
}

export default MainControlls;