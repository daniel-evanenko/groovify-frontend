import FilterControlls from "./cmps/FilterControlls";
import MainControlls from "./cmps/MainControlls"
import TagControlls from "./cmps/TagControlls"
import NoUserStations from "./cmps/NoUserStations";
import StationsLibraryList from "./cmps/StationsLibraryList";
import { useSelector } from "react-redux";
import { useState } from "react";

const LeftSideBar = () => {
    
    const stations = useSelector((state) => state.libraryModule.stations);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleMiniMaxClick = () => setIsMinimized(preValue => !preValue)

    const getWidthClass = () => isMinimized ? "left-side-bar-collapsed" : "left-side-bar-expanded"

    const handleMouseOver = (event) => {
        setIsMouseOver(preValue => !preValue)
    }

    return (
        <aside className={`left-side-bar ${getWidthClass()}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOver}>
            <MainControlls onMiniMaxClick={handleMiniMaxClick} isMouseOver={isMouseOver}/>
            { stations.length > 0 && <TagControlls /> }
            { stations.length > 0 && <FilterControlls /> }
            { stations.length === 0 && <NoUserStations /> }
            <StationsLibraryList />
        </aside>
    )
}

export default LeftSideBar;