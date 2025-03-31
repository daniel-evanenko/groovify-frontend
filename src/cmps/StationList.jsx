import { StationPreview } from "./StationPreview"

export function StationList({ stations }) {

    const listTitle = stations[0].category
    let a = 1

    return (
        <article className="station-list">
            <a>{listTitle}</a>
            <div className="station-previews">
                {stations.map(station =>
                    <StationPreview key={station.spotifyId+`${a++}`} station={station}></StationPreview>
                )}
            </div>
        </article>
    )
}