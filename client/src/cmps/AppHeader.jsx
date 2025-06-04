import icon from "/icons/favicon.ico"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { eventBus, INDEX_MOUNT } from "../services/event-bus.service"
import { ReactSVG } from "react-svg"
import { SearchBar } from "./SearchBar"
import Avatar from '@mui/material/Avatar';
import { useSelector } from "react-redux"
import { capitalize } from "@mui/material"

export function AppHeader() {
    const [fillHome, setFillHome] = useState(true)
    const [fillBrowse, setFillBrowse] = useState(false)
    const elSearchOptions = useRef()
    const elSearchButton = useRef()
    const navigate = useNavigate()

    const location = useLocation()
    const match = location.pathname.match(/^\/station\/(.+)$/)
    const stationId = match ? match[1] : null
    const user = useSelector(storeState => storeState.userModule.user)
    useEffect(() => {
        if (stationId !== null) {
            setFillHome(false)
            setFillBrowse(false)
        }

    }, [stationId])

    useEffect(() => {
        const indexMountCleanup = eventBus.on(INDEX_MOUNT, onIndexMount)
        if (window.location.hash === '#/search') {
            setFillBrowse(true)
            setFillHome(false)
        }

        return indexMountCleanup()
    }, [])

    function onInputFocus() {
        elSearchOptions.current.classList.add("focused")
    }

    function onInputFocusLost() {
        elSearchOptions.current.classList.remove("focused")
        elSearchButton.current.style.setProperty("cursor", "pointer")
    }

    function onHomeClicked() {
        setFillHome(true)
        setFillBrowse(false)
        navigate("/")
    }

    function onBrowseClicked() {
        setFillBrowse(true)
        setFillHome(false)
        // navigate("/search")
    }

    function onIndexMount() {
        setFillHome(true)
        setFillBrowse(false)
    }

    function search(query) {
        const trimmedQuery = query?.trim()

        if (trimmedQuery) {
            setFillHome(false)
            setFillBrowse(false)
            navigate(`/search/${trimmedQuery}`)
        }
    }
    
    function stringToColor(string = '') {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    return (
        <header className="app-header">
            <img className="icon" src={icon} alt="icon" onClick={onHomeClicked} style={{ cursor: "pointer" }}></img>

            <div className="nav-options">
                <button className={`home-btn nav-btn ${fillHome ? "pressed" : ""}`} onClick={onHomeClicked}>
                    {fillHome ? <ReactSVG src="/icons/home-full.svg" /> : <ReactSVG src="/icons/home-empty.svg" />}
                </button>

                <div className="search-options" ref={elSearchOptions}>
                    <SearchBar
                        onSearch={search}
                        onFocus={onInputFocus}
                        onBlur={onInputFocusLost}
                        placeholder="What do you want to play?"
                    />

                    <span className="vert-bar"></span>
                    <button className={`browse-btn nav-btn ${fillBrowse ? "pressed" : ""}`} onClick={onBrowseClicked}>
                        {fillBrowse ? <ReactSVG src="/icons/browse-full.svg" /> : <ReactSVG src="/icons/browse-empty.svg" />}
                    </button>
                </div>
            </div>

            <div className="profile">
                <Avatar
                    sx={{
                        bgcolor: stringToColor(user?.fullname),
                        color: 'black',
                        width: 32,
                        height: 32,
                        fontSize: '16px',
                    }} alt={capitalize(user?.fullname || '')}
                    src={'/broken-image.jpg'}
                >
                </Avatar>
            </div>
        </header>
    )
}