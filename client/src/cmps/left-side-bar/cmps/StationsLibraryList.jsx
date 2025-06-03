import { useSelector } from "react-redux"
import { useRef, useEffect } from "react"
import StationItem from "./StationItem"

const StationsLibraryList = ({ isMinimized }) => {
    const stations = useSelector(state => state.libraryModule.stations)
    const libraryStations = useRef(stations);

    useEffect(() => {
        const likedTracksStation = stations.filter(station => station.isLikedTracks);
        const allOtherTracks = stations.filter(station => !station.isLikedTracks);

        const updatedLibrary = likedTracksStation?.stations?.length ? [...likedTracksStation, ...allOtherTracks] : [...likedTracksStation, ...allOtherTracks]
        libraryStations.current = updatedLibrary

    }, [stations])

    return (
        <section className="library-stations">
            {
                libraryStations.current.map(station =>
                    <StationItem
                        key={station._id}
                        station={station}
                        isMinimized={isMinimized}
                    />)
            }
        </section>
    )
}

export default StationsLibraryList;