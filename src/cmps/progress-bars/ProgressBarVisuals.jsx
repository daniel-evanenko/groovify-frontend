import { useEffect, useRef, useState } from "react"

export function ProgressBarVisuals({ value, max, onChange, onDragStart, onDragEnd }) {
    const barRef = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [seekerVisibility, setSeekerVisibility] = useState("none")

    useEffect(() => {
        function handleMouseMove(e) {
            if (!isDragging || !barRef.current) return
            const rect = barRef.current.getBoundingClientRect()
            const relativeX = e.clientX - rect.left
            const clampedX = Math.max(0, Math.min(rect.width, relativeX))
            const newValue = Math.round((clampedX / rect.width) * max)
            onChange(newValue)
        }

        function handleMouseUp() {
            if (isDragging) {
                setIsDragging(false)
                onDragEnd?.()
                document.body.style.userSelect = ""
            }
        }

        if (isDragging) {
            document.body.style.userSelect = "none" 
            window.addEventListener("mousemove", handleMouseMove)
            window.addEventListener("mouseup", handleMouseUp)
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("mouseup", handleMouseUp)
        }
    }, [isDragging, max, onChange, onDragEnd])

    function onMouseDown(e) {
        setIsDragging(true)
        onDragStart?.()

        if (barRef.current) {
            const rect = barRef.current.getBoundingClientRect()
            const relativeX = e.clientX - rect.left
            const clampedX = Math.max(0, Math.min(rect.width, relativeX))
            const newValue = Math.round((clampedX / rect.width) * max)
            onChange(newValue)
        }
    }

    function onMouseOver() {
        setSeekerVisibility("block")
    }

    function onMouseOut() {
        if (isDragging) return
        setSeekerVisibility("none")
    }

    const fillPercentage = (value / max) * 100

    return (
        <div
            className="progress-bar-wrapper"
            onMouseDown={onMouseDown}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <div className="progress-bar" ref={barRef}>
                <div className="progress-bar-top" style={{ width: `${fillPercentage}%` }}>
                    <div className="seeker" style={{ display: seekerVisibility }} />
                </div>
            </div>
        </div>
    )
}
