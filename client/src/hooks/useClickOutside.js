import { useEffect, useRef } from "react";

/**
 * Detects clicks outside of the referenced element.
 * @param {Function} onOutsideClick - Callback to run when a click outside is detected
 * @returns {React.RefObject} ref to attach to the element you want to watch
 */
export function useClickOutside(onOutsideClick) {
  const ref = useRef(null);

  useEffect(() => {
    function handleMouseDown(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [onOutsideClick]);

  return ref;
}
