import { useState } from "react";
import { ProgressBarVisuals } from "./ProgressBarVisuals";
import { ReactSVG } from "react-svg";

export function VolumeBar({ maxVolume = 100 }) {
    const [volume, setVolume] = useState(10)

    return (
        <div className="volume-bar">
            <ReactSVG src="/icons/volume.svg" />
            <ProgressBarVisuals value={volume} max={maxVolume} onChange={setVolume} />
        </div>
    )
}
