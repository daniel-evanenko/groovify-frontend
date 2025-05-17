import { useSelector } from "react-redux"
import { memo, useEffect } from "react"
import StationItem from "./StationItem"

const StationsLibraryList = memo(() => {

    const stations = useSelector(state => state.libraryModule.stations)

    return (
        <section class="library-stations">
            {
                stations.map(station => <StationItem station={station} />)
            }
        </section>
    )
})

export default StationsLibraryList;