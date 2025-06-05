import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Loader } from '../cmps/Loader.jsx'
import { ActionBar } from '../cmps/ActionBar.jsx'
import { TrackList } from '../cmps/TrackList.jsx'
import { extractColors } from 'extract-colors'
import { useSelector } from 'react-redux'
import { clearStation, loadStation } from '../store/actions/station.actions.js'
import { ReactSVG } from 'react-svg'
import { StationEditModal } from '../cmps/StationEditModal.jsx'
import { setIsLoading } from '../store/actions/system.actions.js'
import { StationTrackSearch } from '../cmps/StationTrackSearch.jsx'
import { DEFAULT_IMAGE_URL } from '../services/station/station.service.js'
import { updateStation } from '../store/actions/library.actions.js'
import { PlayButton } from '../cmps/PlayButton.jsx'
import { LongTxt } from '../cmps/LongTxt.jsx'

export function StationDetails() {
    const station = useSelector(storeState => storeState.stationModule.station)
    const globalIsLoading = useSelector(storeState => storeState.systemModule.isLoading)

    const [isModalOpen, setIsModalOpen] = useState(false)
    const params = useParams()
    const navigate = useNavigate()

    const imgUrl = station?.images?.length > 0 ? station.images[0].url : DEFAULT_IMAGE_URL

    const user = useSelector(storeState => storeState.userModule.user)
    const tracks = useSelector(storeState => storeState.stationModule.tracks)
    const [isActionBarVisible, setIsActionBarVisible] = useState(true)

    useEffect(() => {
        setTopBarBg()
    }, [isActionBarVisible])

    async function setTopBarBg() {
        try {
            const topBar = document.querySelector('.top-bar')
            const trackHeader = document.querySelector('.track-header')
            if (!topBar) return
            if (!isActionBarVisible) {
                const colors = await extractColors(imgUrl)
                if (colors.length > 0) {
                    const { red, green, blue } = colors[0]
                    const darkenFactor = 0.30
                    const darkRed = Math.round(red * darkenFactor)
                    const darkGreen = Math.round(green * darkenFactor)
                    const darkBlue = Math.round(blue * darkenFactor)

                    const darkerColor = `rgb(${darkRed}, ${darkGreen}, ${darkBlue})`
                    topBar.style.backgroundColor = darkerColor
                    trackHeader.classList.add('observer-track-heaer')


                } else {
                    topBar.style.backgroundColor = ''

                }
            } else {
                topBar.style.backgroundColor = ''
                trackHeader.classList.remove('observer-track-heaer')

            }

        } catch (error) {
            console.error('Error setting top bar background:', error)
            const topBar = document.querySelector('.top-bar')
            if (topBar) {
                topBar.style.backgroundColor = ''
            }
        }
    }

    function calculatePlaylistInfo() {
        const totalSongs = tracks?.length
        if (!totalSongs) return
        let totalDurationMs = 0

        for (const trackObj of tracks) {
            if (trackObj && trackObj.track && typeof trackObj.track.duration_ms === 'number' && !isNaN(trackObj.track.duration_ms)) {
                totalDurationMs += trackObj.track.duration_ms
            } else {
                console.warn(`Warning: Track with missing or invalid duration (track.track.duration_ms) found. Skipping duration for track:`, trackObj)
            }
        }

        const totalDurationSeconds = Math.floor(totalDurationMs / 1000)

        const hours = Math.floor(totalDurationSeconds / 3600)
        const remainingSecondsAfterHours = totalDurationSeconds % 3600

        const minutes = Math.floor(remainingSecondsAfterHours / 60)

        let durationParts = []
        let prefix = ""

        if (hours >= 2) {
            prefix = "about "
        }

        if (hours > 0) {
            durationParts.push(`${hours} hr`)
        }

        if (minutes > 0) {
            if (hours === 0 || minutes > 0) {
                durationParts.push(`${minutes} min`)
            }
        }

        let formattedDuration
        if (durationParts.length === 0) {
            if (totalDurationSeconds > 0) {
                formattedDuration = "less than 1 min"
                prefix = ""
            } else {

                formattedDuration = "0 min"
                prefix = ""
            }
        } else {
            formattedDuration = durationParts.join(" ")
        }

        const finalDurationString = prefix + formattedDuration

        return `${totalSongs} songs, ${finalDurationString}`
    }

    function isAllowed() {
        if (!station || !user) return false
        return (
            (station.owner?.fullname || station.owner?.display_name) === user.fullname
        )
    }
    function isLikedStation() {
        return station._id == user?.likedTracksStationId
    }

    async function handleConfirm(stationToSave) {
        try {
            await updateStation(stationToSave)

        } catch (error) {
            console.error('Error saving station:', error)
        } finally {
            setIsModalOpen(false)
        }
    }

    async function fetchStationData() {
        setIsLoading(true)
        try {
            await loadStation(params.stationId)
        } catch (error) {
            console.error('Error fetching station:', error)
            navigate('/')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!params.stationId) {
            navigate('/')
            return
        }

        fetchStationData()



        return () => {
            clearStation()
        }
    }, [params.stationId])

    useEffect(() => {
        if (!station || !imgUrl) return

        requestAnimationFrame(() => {
            setStationHeaderBg()
        })
    }, [station, imgUrl])

    async function setStationHeaderBg() {
        try {
            const mainElement = document.querySelector('.station-header-bg')
            if (!mainElement) return

            const colors = await extractColors(imgUrl)
            if (colors.length > 0) {
                const { red, green, blue } = colors[0]
                const gradient = `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), rgba(0,0,0,0))`
                mainElement.style.backgroundImage = gradient

            } else {
                mainElement.style.backgroundImage = 'none'
            }
        } catch (error) {
            console.error('Error setting station header background:', error)
            const mainElement = document.querySelector('.station-header-bg')
            if (mainElement) {
                mainElement.style.backgroundImage = 'none'
            }
        }
    }

    if (globalIsLoading) return <Loader />

    if (!station) return <div>No playlist data available</div>

    return (
        <section className="station-page">
            <div className='station-header-bg' />
            <header className="top-bar"> {!isActionBarVisible && <div className='intersection-header'><PlayButton stationId={station?._id} /> <h1 className="station-name">{station.name}</h1>  </div>}</header>
            <div className="station-header" >
                <div className="station-image">
                    <img src={imgUrl} alt="station cover" />
                    {isAllowed() && !isLikedStation() && <div className="overlay" onClick={() => setIsModalOpen(true)}>
                        <ReactSVG src='/icons/Pencil.svg' />
                        <p>Choose photo</p>
                    </div>}

                </div>
                <div className="station-details">
                    <span className="station-type">Playlist</span>
                    <h1 className="station-name">{station.name}</h1>
                    {station.description && <LongTxt length={120}>{station.description}</LongTxt>}
                    <div className="station-info">
                        <a>{station.owner?.fullname || station.owner?.display_name || 'Unknown User'}</a>
                        <span> • </span>
                        <span>{calculatePlaylistInfo()}</span>
                    </div>
                </div>
            </div>
            <div className="content-spacing">
                {<ActionBar isAllowed={isAllowed()} isLikedStation={isLikedStation()} station={station} onVisibilityChange={setIsActionBarVisible}
                ></ActionBar>}
                <TrackList isAllowed={isAllowed()} station={station} tracks={tracks}></TrackList>
                {isAllowed() && <StationTrackSearch isAllowed={isAllowed()} station={station}></StationTrackSearch>}
            </div>
            {isModalOpen && (
                <StationEditModal
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                    station={station}
                    openFileUpload={true}
                />
            )}
        </section>
    )
}