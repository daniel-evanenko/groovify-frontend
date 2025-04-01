import SearchIcon from '../../../public/icons/search.svg?react';
import ViewControlButton from './ViewControlButton';

const FilterControlls = () => (
    <section className="filter-controlls">
        <button className="search-button">
            <SearchIcon className="search-button-icon" />
        </button>
        <ViewControlButton />
        
    </section>
)

export default FilterControlls