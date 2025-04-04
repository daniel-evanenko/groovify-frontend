import FilterControlls from "./cmps/FilterControlls";
import MainControlls from "./cmps/MainControlls"
import TagControlls from "./cmps/TagControlls"

const LeftSideBar = () => {

    return (
        <aside className="left-side-bar">
            <MainControlls />
            <TagControlls />
            <FilterControlls />
        </aside>
    )
}

export default LeftSideBar;