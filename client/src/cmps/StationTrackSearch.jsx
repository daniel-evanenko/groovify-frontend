import { useEffect, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { debounce } from '../services/util.service'
import { stationService } from '../services/station/station.service'
import { SearchTrackList } from './SearchTrackList'
import { addTrackToStation } from '../store/actions/station.actions'

export function StationTrackSearch({ station }) {
    const [filterBy, setFilterBy] = useState(stationService.getDefaultFilter())
    const debouncedLoadTracks = useRef(debounce(loadTracks, 300)).current
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        debouncedLoadTracks(filterBy)
    }, [filterBy, debouncedLoadTracks])

    function handleChange({ target }) {
        const { value, name, type } = target
        const newValue = type === 'number' ? +value : value
        setFilterBy((prevFilter) => ({ ...prevFilter, [name]: newValue }))
    }

    async function loadTracks(currentFilter) {
        try {
            const fetchedTracks = await stationService.getTracks(currentFilter)
            setTracks(fetchedTracks)
        } catch (error) {
            console.error('Error loading tracks:', error)

        }
    }

    async function onAddTrack(track) {
        addTrackToStation(track, station._id)
    }
    const { title } = filterBy

    return (
        <section className="station-track-search">
            <div className="search">
                <h2>Let's find something for your playlist</h2>
                <div className="search-input">
                    <ReactSVG className="search-icon" src="/icons/search.svg" />
                    <input
                        type="search"
                        name="title"
                        value={title}
                        onChange={handleChange}
                        placeholder="Search for songs or episodes"
                    />
                    {title && (
                        <button className="clear-btn" onClick={() => setFilterBy((prev) => ({ ...prev, title: '' }))}>
                            ✕
                        </button>
                    )}
                </div>
                {tracks.length > 0 && (
                    <SearchTrackList tracks={tracks} onAddTrack={onAddTrack}></SearchTrackList>
                )}
                {tracks.length === 0 && title && (
                    <>

                        <div className="no-results">No results found for "{title}"
                            <p>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
                        </div>

                    </>


                )}
            </div>
        </section>
    )
}