import { useEffect, useState } from "react";
import { StationList } from "../cmps/StationList";
import { getStationsByCategories } from "../services/station/station.service";
import { Loader } from "../cmps/Loader";
import { eventBus, INDEX_MOUNT } from "../services/event-bus.service";
import { useSelector } from "react-redux";

export function StationIndex() {
    const [stationsLists, setStationsLists] = useState({})
    const [loading, setLoading] = useState(true)
    const stationsList = useSelector(state => state.stationModule.indexStations)

    useEffect(() => {
        eventBus.emit(INDEX_MOUNT)

        async function getLists() {
            try {
                const lists = await getStationsByCategories(stationsList)
                setStationsLists(lists)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        getLists()
    }, [stationsList])

    if (loading) return <Loader></Loader>

    return (
        <section className="station-index">
            {Object.keys(stationsLists).map((category, idx) =>
                <StationList key={idx} stations={stationsLists[category]} />
            )}
        </section>
    )
}