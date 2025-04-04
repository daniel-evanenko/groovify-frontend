import { useState } from 'react';

const BUTTON_CLICKED_ACTIVE_CLASS = 'button-clicked-active';

const TagControlls = () => {

    const [buttonClassNames, setButtonClassNames] = useState([])

    const toggleButtonClick = (event) => {
        event.preventDefault()

        setButtonClassNames(prevClassNames => {
            const isClicked = prevClassNames.includes(BUTTON_CLICKED_ACTIVE_CLASS);
            return isClicked ? [] : [BUTTON_CLICKED_ACTIVE_CLASS];
        });  
        
    }

    console.log(buttonClassNames.join(' '))

    return (
        <section className="tag-controlls">
            <button className={buttonClassNames.join(' ')} onClick={toggleButtonClick}>
                Stations
            </button>
        </section>
    )
}

export default TagControlls;
