import icon from "/icons/favicon.ico"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { eventBus, INDEX_MOUNT } from "../services/event-bus.service"
import { ReactSVG } from "react-svg"

export function AppHeader() {
    const [fillHome, setFillHome] = useState(true)
    const [fillBrowse, setFillBrowse] = useState(false)
    const elSearchOptions = useRef()
    const elSearchButton = useRef()
    const elSearchInput = useRef()
    const navigate = useNavigate()

    const location = useLocation()
    const match = location.pathname.match(/^\/station\/(.+)$/)
    const stationId = match ? match[1] : null

    useEffect(() => {
        if (stationId !== null) {
            setFillHome(false)
            setFillBrowse(false)
        }

    }, [stationId])

    useEffect(() => {
        const indexMountCleanup = eventBus.on(INDEX_MOUNT, onIndexMount)

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

    function onSearchClicked() {
        elSearchInput.current.focus()
        elSearchButton.current.style.setProperty("cursor", "default")
    }

    function onBrowseClicked() {
        setFillBrowse(true)
        setFillHome(false)
        navigate("/search")
    }

    function onIndexMount() {
        setFillHome(true)
        setFillBrowse(false)
    }

    return (
        <header className="app-header">
            <img className="icon" src={icon} alt="icon" onClick={onHomeClicked} style={{ cursor: "pointer" }}></img>

            <div className="nav-options">
                <button className={`home-btn nav-btn ${fillHome ? "pressed" : ""}`} onClick={onHomeClicked}>
                    {fillHome ? <ReactSVG src="/icons/home-full.svg" /> : <ReactSVG src="/icons/home-empty.svg" />}
                </button>

                <div className="search-options" ref={elSearchOptions}>
                    <button ref={elSearchButton} className="search-btn" onClick={onSearchClicked}>
                        <ReactSVG src="/icons/search.svg" />
                    </button>

                    <input
                        ref={elSearchInput}
                        className="search-input"
                        type="text"
                        placeholder="What do you want to play?"
                        onFocus={onInputFocus}
                        onBlur={onInputFocusLost} />

                    <span className="vert-bar"></span>
                    <button className={`browse-btn nav-btn ${fillBrowse ? "pressed" : ""}`} onClick={onBrowseClicked}>
                        {fillBrowse ? <ReactSVG src="/icons/browse-full.svg" /> : <ReactSVG src="/icons/browse-empty.svg" />}
                    </button>
                </div>
            </div>

            <div className="profile"></div>
        </header>
    )
}