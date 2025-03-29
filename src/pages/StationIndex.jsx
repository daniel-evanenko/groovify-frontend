import { useEffect, useState } from "react";
import { StationList } from "../cmps/StationList";
import { getStationLists } from "../services/station/station.service";

export function StationIndex() {

    const [allStationsLists, setAllStationsLists] = useState([])

    useEffect(() => {
        getStationLists()
            .then(data => {
                setAllStationsLists(data)
            })
            .catch(err => console.error("error getting data", err))
    }, [])



    return (
        <section className="station-index">
            {allStationsLists.map(stationList =>
                <StationList key={stationList[0].categoryId} stations={stationList}></StationList>
            )}
        </section>
    )
}