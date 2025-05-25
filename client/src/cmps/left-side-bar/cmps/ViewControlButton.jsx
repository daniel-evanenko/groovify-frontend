import FilteringOptions from '../../../../public/icons/filtering-options.svg?react';

const ViewControlButton = () => {

    return (
        <section className="view-control-button-section">
            <button className="list-button">
                <span>Recents</span>
            </button>
            <FilteringOptions className="list-button-icon" />
        </section>
    )
}

export default ViewControlButton;