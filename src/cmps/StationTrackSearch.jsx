import { useState } from 'react';
import { ReactSVG } from 'react-svg';

export function StationTrackSearch() {
    const [query, setQuery] = useState('');



    return (
        <section className="station-track-search">
            <div className="search">
                <h2>Let's find something for your playlist</h2>
                <div className="search-input">
                    <ReactSVG className='search-icon' src='/icons/search.svg'></ReactSVG>
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for songs or episodes"
                    />
                    {query && (
                        <button className="clear-btn" onClick={() => setQuery('')}>
                            ✕
                        </button>
                    )}
                </div>
            </div>
        </section>
    )

}