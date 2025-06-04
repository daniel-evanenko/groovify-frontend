import { useEffect, useRef, useState } from 'react'
import { debounce } from '../services/util.service'
import { SearchTrackList } from './SearchTrackList'
import { addTrackToStation } from '../store/actions/station.actions'
import { SearchBar } from './SearchBar'
import { searchTracks } from '../services/station/station.service'

export function StationTrackSearch({ station }) {
    const [query, setQuery] = useState('')
    const debouncedLoadTracks = useRef(debounce(loadTracks, 300)).current
    const [tracks, setTracks] = useState([])

    useEffect(() => {
        debouncedLoadTracks(query)
    }, [query, debouncedLoadTracks])



    async function loadTracks(query) {
        try {
            const fetchedTracks = await searchTracks(query, 20)
            setTracks(fetchedTracks)
        } catch (error) {
            console.error('Error loading tracks:', error)

        }
    }

    async function onAddTrack(trackToAdd) {
        const filteredTracks = tracks.filter(
            trackObj => trackObj.track?.id !== trackToAdd.track.id
        )
        setTracks(filteredTracks)
        addTrackToStation(trackToAdd, station._id)
    }

    return (
        <section className="station-track-search">
            <div className="search">
                <h2>Let's find something for your playlist</h2>
                <SearchBar
                    onSearch={setQuery}
                    updateQuery={setQuery}
                    placeholder="Search for songs"
                />

                {tracks.length > 0 && (
                    <SearchTrackList tracks={tracks} onAddTrack={onAddTrack}></SearchTrackList>
                )}
                
                {tracks.length === 0 && query && (
                    <>

                        <div className="no-results">No results found for "{query}"
                            <p>Please make sure your words are spelled correctly, or use fewer or different keywords.</p>
                        </div>

                    </>


                )}
            </div>
        </section>
    )
}