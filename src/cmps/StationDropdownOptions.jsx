import { useEffect, useRef, useState } from "react";
import { ReactSVG } from "react-svg";

export function StationDropdownOptions({ options = [] }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        console.log(`Selected option: ${option}`);
        setIsOpen(false);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        const handleMouseDown = (event) => handleClickOutside(event); // Create a reference to the handler

        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

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
                            className="dropdown-item" // Changed to dropdown-item to match the CSS.
                            onClick={() => handleOptionClick(option.label)}
                        >
                            {option.icon && (
                                <ReactSVG src={option.icon} className="dropdown-icon" />
                            )}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}