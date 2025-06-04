import { useParams } from "react-router-dom"
import { StationList } from "./StationList"
import { useEffect, useState } from "react"
import { searchStations } from "../services/station/station.service"

export function SearchIndex() {
    const params = useParams()
    const [stations, setStations] = useState([])

    useEffect(() => {
        async function fetchStations() {
            const query = params.query
            const stations = await searchStations([query], 35)
            setStations(stations)
        }

        fetchStations()

    }, [params])

    return (
        <div className="search-index">
            <StationList stations={stations} title="Playlists" />
        </div>
    )
}