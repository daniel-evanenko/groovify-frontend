import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader } from '../cmps/Loader.jsx';
import { ActionBar } from '../cmps/ActionBar.jsx';
import { TrackList } from '../cmps/TrackList.jsx';
import { extractColors } from "extract-colors";
import { useSelector } from 'react-redux';
import { clearStation, loadStation, saveStation } from '../store/actions/station.actions.js';
import { ReactSVG } from 'react-svg';
import { StationEditModal } from '../cmps/StationEditModal.jsx'
import { setIsLoading } from '../store/actions/system.actions.js';
export function StationDetails() {
    const station = useSelector(storeState => storeState.stationModule.station)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams()
    const navigate = useNavigate()

    async function handleConfirm(station) {
        try {
            saveStation(station)
        } catch (error) {
            console.error(error)
        } finally {
            setIsModalOpen(false)
        }
    }
    async function fetchStation() {
        setIsLoading(true)
        try {
            await loadStation(params.stationId)
        } catch (error) {
            console.log(error)
            navigate('/')
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchStation();
        return () => {
            clearStation()
        }
    }, [params.stationId]);



    useEffect(() => {
        if (!station) return;
        // Wait for DOM update
        requestAnimationFrame(() => {
            setStationHeaderBg()
        });

    }, [station])



    async function setStationHeaderBg() {
        try {
            const mainElement = document.querySelector(".station-header-bg")
            if (!mainElement) return;

            const colors = await extractColors(station.imgUrl);
            if (colors.length > 0) {
                const { red, green, blue } = colors[0];
                const gradient = `linear-gradient(to bottom, rgb(${red}, ${green}, ${blue}), rgba(0,0,0,0))`
                mainElement.style.backgroundImage = gradient
            }
        } catch (error) {
            console.error(error)
        }
    }


    if (isLoading) return <Loader></Loader>

    if (!station) return <div>No playlist data available</div>
    return (
        <section className="station-page">
            <div className='station-header-bg'>
                <header className="top-bar"></header>
                <div className="station-header">
                    <div className="station-image">
                        <img src={station.imgUrl} alt="station" />
                        <div className="overlay" onClick={() => setIsModalOpen(true)}>
                            <ReactSVG src='/icons/Pencil.svg' />
                            <p>Choose photo</p>
                        </div>
                    </div>
                    <div className="station-details">
                        <span className="station-type">Playlist</span>
                        <h1 className="station-name">{station.name}</h1>
                        <div className="station-description">{station.description}</div>
                        <div className="station-info">
                            <span>{station.owner.fullname}</span>
                            <span>•</span>
                            <span>{station.tracks.length} songs</span>
                        </div>
                    </div>
                </div>
            </div>
            <ActionBar station={station}></ActionBar>
            <TrackList station={station}></TrackList>
            {isModalOpen && <StationEditModal onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} station={station} openFileUpload={true}>
            </StationEditModal>}
        </section>
    )
}