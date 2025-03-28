import { StationPreview } from "./StationPreview"

export function StationList() {

    return (
        <article className="station-list">
            <a>StationList Title</a>
            <div className="station-previews">
                <StationPreview></StationPreview>
                <StationPreview></StationPreview>
                <StationPreview></StationPreview>
                <StationPreview></StationPreview>
                <StationPreview></StationPreview>
                <StationPreview></StationPreview>
            </div>
        </article>
    )
}