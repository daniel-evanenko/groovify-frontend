import FilterControlls from "./FilterControlls";
import MainControlls from "./MainControlls"
import TagControlls from "./TagControlls"

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