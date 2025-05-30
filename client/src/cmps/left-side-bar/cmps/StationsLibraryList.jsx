import { useSelector } from "react-redux"
import { memo } from "react"
import StationItem from "./StationItem"

const StationsLibraryList = memo(({ isMinimized }) => {
    const stations = useSelector(state => state.libraryModule.stations)
    return (
        <section className="library-stations">
            {
                stations.map(station =>
                    <StationItem
                        key={station._id}
                        station={station}
                        isMinimized={isMinimized}
                    />)
            }
        </section>
    )
})

export default StationsLibraryList;