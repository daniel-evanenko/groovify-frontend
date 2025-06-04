import { useSelector } from "react-redux"
import { useMemo } from "react"
import StationItem from "./StationItem"

const StationsLibraryList = ({ isMinimized }) => {
    const stations = useSelector(state => state.libraryModule.stations)

    const libraryStations = useMemo(() => {
        const likedTracksStation = stations.find(station => station.isLikedTracks)
        const allOtherTracks = stations.filter(station => !station.isLikedTracks)

        return likedTracksStation?.tracks?.length
            ? [likedTracksStation, ...allOtherTracks]
            : allOtherTracks
    }, [stations])

    return (
        <section className="library-stations">
            {
                libraryStations.map(station =>
                    <StationItem
                        key={station._id}
                        station={station}
                        isMinimized={isMinimized}
                    />)
            }
        </section>
    )
}

export default StationsLibraryList
