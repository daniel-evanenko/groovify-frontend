import { useState } from "react";
import { ProgressBarVisuals } from "./ProgressBarVisuals";
import { ReactSVG } from "react-svg";
import { eventBus, playerEvents } from "../../services/event-bus.service";


export function VolumeBar({ maxVolume = 100, initialVolume = 10 }) {
    const [volume, setVolume] = useState(initialVolume)


    function volumeChanged(newVal) {
        setVolume(newVal)
        eventBus.emit(playerEvents.VOLUME_CHANGED, newVal)
    }

    return (
        <div className="volume-bar">
            <ReactSVG src="/icons/volume.svg" />
            <ProgressBarVisuals value={volume} max={maxVolume} onChange={volumeChanged} />
        </div>
    )
}
