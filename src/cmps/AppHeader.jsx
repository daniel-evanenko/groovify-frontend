import icon from "/icons/favicon.ico"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { eventBus, INDEX_MOUNT } from "../services/event-bus.service"

export function AppHeader() {
    const [fillHome, setFillHome] = useState(true)
    const [fillBrowse, setFillBrowse] = useState(false)
    const elSearchOptions = useRef()
    const elSearchButton = useRef()
    const elSearchInput = useRef()
    const navigate = useNavigate()

    const location = useLocation()
    const match = location.pathname.match(/^\/station\/(.+)$/);
    const stationId = match ? match[1] : null;

    useEffect(() => {
        console.log("stationId:", stationId)
        if (stationId !== null) {
            setFillHome(false)
            setFillBrowse(false)
        }

    }, [stationId])

    useEffect(() => {
        const unsubscribe = eventBus.on(INDEX_MOUNT, onIndexMount)

        return unsubscribe
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

    function onSearchClicked() {
        elSearchInput.current.focus()
        elSearchButton.current.style.setProperty("cursor", "default")
    }

    function onBrowseClicked() {
        setFillBrowse(true)
        setFillHome(false)
    }

    function onIndexMount() {
        console.log("index mounted")
        setFillHome(true)
        setFillBrowse(false)
    }

    const homeEmpty =
        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="e-9640-icon" viewBox="0 0 24 24">
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" fill="currentColor" />
        </svg>

    const homeFull =
        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="e-9640-icon icon-full" viewBox="0 0 24 24" >
            <path d="M13.5 1.515a3 3 0 0 0-3 0L3 5.845a2 2 0 0 0-1 1.732V21a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7.577a2 2 0 0 0-1-1.732l-7.5-4.33z" fill="currentColor" />
        </svg>

    const browseEmpty =
        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="e-9640-icon" viewBox="0 0 24 24">
            <path d="M15 15.5c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" fill="currentColor" />
            <path d="M1.513 9.37A1 1 0 0 1 2.291 9h19.418a1 1 0 0 1 .979 1.208l-2.339 11a1 1 0 0 1-.978.792H4.63a1 1 0 0 1-.978-.792l-2.339-11a1 1 0 0 1 .201-.837zM3.525 11l1.913 9h13.123l1.913-9H3.525zM4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4h-2V3H6v3H4V2z" fill="currentColor" />
        </svg>

    const browseFull =
        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="e-9640-icon icon-full" viewBox="0 0 24 24" >
            <path d="M4 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4H4V2zM1.513 9.37A1 1 0 0 1 2.291 9H21.71a1 1 0 0 1 .978 1.208l-2.17 10.208A2 2 0 0 1 18.562 22H5.438a2 2 0 0 1-1.956-1.584l-2.17-10.208a1 1 0 0 1 .201-.837zM12 17.834c1.933 0 3.5-1.044 3.5-2.333 0-1.289-1.567-2.333-3.5-2.333S8.5 14.21 8.5 15.5c0 1.289 1.567 2.333 3.5 2.333z" fill="currentColor" />
        </svg>

    return (
        <header className="app-header">
            <img className="icon" src={icon} alt="icon" onClick={onHomeClicked} style={{ cursor: "pointer" }}></img>

            <div className="nav-options">
                <button className="home-btn nav-btn" onClick={onHomeClicked}>
                    {fillHome ? homeFull : homeEmpty}
                </button>

                <div className="search-options" ref={elSearchOptions}>
                    <button ref={elSearchButton} className="search-btn nav-btn" onClick={onSearchClicked}>
                        <svg xmlns="http://www.w3.org/2000/svg" data-encore-id="icon" role="img" aria-hidden="true" className="e-9640-icon" viewBox="0 0 24 24">
                            <path d="M10.533 1.27893C5.35215 1.27893 1.12598 5.41887 1.12598 10.5579C1.12598 15.697 5.35215 19.8369 10.533 19.8369C12.767 19.8369 14.8235 19.0671 16.4402 17.7794L20.7929 22.132C21.1834 22.5226 21.8166 22.5226 22.2071 22.132C22.5976 21.7415 22.5976 21.1083 22.2071 20.7178L17.8634 16.3741C19.1616 14.7849 19.94 12.7634 19.94 10.5579C19.94 5.41887 15.7138 1.27893 10.533 1.27893ZM3.12598 10.5579C3.12598 6.55226 6.42768 3.27893 10.533 3.27893C14.6383 3.27893 17.94 6.55226 17.94 10.5579C17.94 14.5636 14.6383 17.8369 10.533 17.8369C6.42768 17.8369 3.12598 14.5636 3.12598 10.5579Z" fill="currentColor" />
                        </svg>
                    </button>

                    <input
                        ref={elSearchInput}
                        className="search-input"
                        type="text"
                        placeholder="What do you want to play?"
                        onFocus={onInputFocus}
                        onBlur={onInputFocusLost} />

                    <button className="browse-btn nav-btn" onClick={onBrowseClicked}>
                        {fillBrowse ? browseFull : browseEmpty}
                    </button>
                </div>
            </div>

            <div className="profile"></div>
        </header>
    )
}