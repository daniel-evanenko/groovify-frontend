import { useEffect, useState } from "react";
import { StationList } from "../cmps/StationList";
import { getStationLists } from "../services/station/station.service";
import { loadStations } from "../store/actions/library.actions";
import { Loader } from "../cmps/Loader";

export function StationIndex() {

    const [allStationsLists, setAllStationsLists] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const stationList = await getStationLists();
            setAllStationsLists(stationList);
            await loadStations();
        } catch (error) {
            console.error("Error getting data", error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();


    if (loading) return <Loader></Loader>
    return (
        <section className="station-index">
            {allStationsLists.map(stationList =>
                <StationList key={stationList[0].categoryId} stations={stationList}></StationList>
            )}
        </section>
    )
}