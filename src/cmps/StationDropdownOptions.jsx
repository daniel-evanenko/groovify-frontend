import React, { useState } from "react";
import { ReactSVG } from "react-svg";

export function StationDropdownOptions({ options = [] }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container">
            <button className="dropdown-btn" onClick={toggleDropdown}>
                <ReactSVG src='/icons/more-options.svg' className="dropdown-icon" /> {/* Use ReactSVG for the icon */}
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
