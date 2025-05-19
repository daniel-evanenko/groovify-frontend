import { useEffect, useState } from "react";
import { StationList } from "../cmps/StationList";
import { getHomePageStationLists } from "../services/station/station.service";
import { Loader } from "../cmps/Loader";
import { eventBus, INDEX_MOUNT } from "../services/event-bus.service";

export function StationIndex() {
    const [allStationsLists, setAllStationsLists] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const stationList = await getHomePageStationLists()
            setAllStationsLists(stationList)
        } catch (error) {
            console.error("Error getting data", error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        eventBus.emit(INDEX_MOUNT)
        fetchData()
    }, [])


    if (loading) return <Loader></Loader>
    return (
        <section className="station-index">
            {allStationsLists.map(stationList =>
                <StationList key={stationList[0].categoryId} stations={stationList}></StationList>
            )}
        </section>
    )
}