import { useEffect, useRef, useState } from "react"
import { StationPreview } from "./StationPreview"

export function StationList({ stations }) {
    const elStationsList = useRef()
    const [displayStationsAmount, setDisplayStationsAmount] = useState(stations.length)


    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            const stationListWidth = entries[0].contentRect.width
            const displayAmount = Math.max(Math.floor(stationListWidth / 200), 3)
            setDisplayStationsAmount(displayAmount)

        })

        resizeObserver.observe(elStationsList.current)
        return () => resizeObserver.disconnect()
    }, [])

    const listTitle = stations[0].category
    let a = 1
    return (
        <article ref={elStationsList} className="station-list">
            <a>{listTitle}</a>
            <div className="station-previews">
                {stations.slice(0, displayStationsAmount).map(station =>
                    <StationPreview key={station.spotifyId + `${a++}`} station={station}></StationPreview>
                )}
            </div>
        </article>
    )
}