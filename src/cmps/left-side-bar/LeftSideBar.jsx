import FilterControlls from "./cmps/FilterControlls";
import MainControlls from "./cmps/MainControlls"
import TagControlls from "./cmps/TagControlls"
import NoUserStations from "./cmps/NoUserStations";
import StationsLibraryList from "./cmps/StationsLibraryList";
import { useSelector } from "react-redux";

const LeftSideBar = () => {
    
    const stations = useSelector((state) => state.libraryModule.stations);

    return (
        <aside className="left-side-bar">
            <MainControlls />
            { stations.length > 0 && <TagControlls /> }
            { stations.length > 0 && <FilterControlls /> }
            { stations.length === 0 && <NoUserStations /> }
            <StationsLibraryList />
        </aside>
    )
}

export default LeftSideBar;