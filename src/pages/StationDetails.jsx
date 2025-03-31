import { useParams, useNavigate } from 'react-router-dom'
import { stationService } from '../services/station/station.service.js'
import { useEffect, useState } from 'react'
import { randomColor } from '../services/util.service.js';
import { Loader } from '../cmps/Loader.jsx';
import { ActionBar } from '../cmps/ActionBar.jsx';
export function StationDetails() {
    const [station, setStation] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadStation()
    }, [params.stationId])


    useEffect(() => {
        if (!station) return;

        // Wait for DOM update
        requestAnimationFrame(() => {
            setStationHeaderBg(station.backgroundColor);
        });

    }, [station]);


    async function loadStation() {
        try {
            const station = await stationService.getStationBySpotifyId(params.stationId)
            console.log("🚀 ~ loadStation ~ station:", station)
            setStation(station)
            setStationHeaderBg(station?.backgroundColor)
        } catch (error) {
            console.log(error)
            navigate('/')

        } finally {
            setLoading(false)
        }
    }

    function setStationHeaderBg(backgroundColor) {
        const mainElement = document.querySelector(".station-header-bg");
        if (!mainElement) return;
        if (!backgroundColor) backgroundColor = randomColor();
        mainElement.style.backgroundImage = `linear-gradient(to bottom, ${backgroundColor} 0%,rgba(18,18,18,0.1) 350px)`;
    }


    if (loading) return <Loader></Loader>;

    if (!station) return <div>No playlist data available</div>;
    return (
        <section>
            <div className="station-page">
                <div className='station-header-bg'>
                    <header className="top-bar"></header>
                    <div className="station-header">
                        <div className="station-image">
                            <img
                                src={station.imgUrl}
                                alt="station"
                            />
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

            </div>
        </section>
    )
}