import { ReactSVG } from "react-svg";
import { PlayButton } from "./PlayButton";
import { PlayerProgressBar } from "./progress-bars/PlayerProgressBar";
import { VolumeBar } from "./progress-bars/VolumeBar";


export function AppFooter() {

    return (
        <footer className="app-footer">
            <div className="player-controls">
                <div className="player-buttons">
                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/previous.svg" />
                    </button>

                    <PlayButton className="player-controls-btn" />
                    
                    <button className=" player-controls-btn">
                        <ReactSVG src="/icons/next.svg" />
                    </button>
                </div>
                <PlayerProgressBar max={10} />
            </div>
            <VolumeBar />
        </footer>
    )
}


