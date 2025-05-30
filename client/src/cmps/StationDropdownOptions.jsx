import { useRef, useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import { useClickOutside } from "../hooks/useClickOutside";

export function StationDropdownOptions({ options = [], onOptionClick }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useClickOutside(() => setIsOpen(false));


    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option, event) => {
        event.stopPropagation();
        if (onOptionClick) {
            onOptionClick(option.value);
        }
        setIsOpen(false);
    };

    return (
        <div className="dropdown-container" ref={dropdownRef}>
            <button className="dropdown-btn" onClick={toggleDropdown}>
                <ReactSVG src="/icons/more-options.svg" className="dropdown-icon" />
            </button>

            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="dropdown-item"
                            onClick={(event) => handleOptionClick(option, event)}
                        >
                            {option.icon && (
                                <ReactSVG src={option.icon} className="dropdown-icon-size" />
                            )}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}