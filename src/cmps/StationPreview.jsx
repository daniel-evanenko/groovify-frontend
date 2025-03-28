import { LongTxt } from "./LongTxt"
import tmpImg from "/tmp-assets/temp_station_img.jpg"

export function StationPreview({ imgSrc = tmpImg, desc = "lorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsumlorem ipsum" }) {
    
    return (
        <article className="station-preview">
            <img src={imgSrc} alt="station-img"></img>
            <LongTxt>{desc}</LongTxt>
        </article>
    )
}