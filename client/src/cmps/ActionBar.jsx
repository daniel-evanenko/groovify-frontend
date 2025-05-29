import { useNavigate } from "react-router-dom"
import { useMemo, useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"

import { clearStation, saveStation } from "../store/actions/station.actions"
import { removeStation, toggleLikeStation } from "../store/actions/library.actions"

import { PlayButton } from "./PlayButton"
import { StationDropdownOptions } from "./StationDropdownOptions"
import { StationEditModal } from "./StationEditModal"
import { LikeButton } from "./LikeButton"

const ICONS = {
    edit: "/icons/Pencil.svg",
    queue: "/icons/add-to-queue.svg",
    delete: "/icons/Delete.svg"
}

export function ActionBar({ station, isAllowed, onVisibilityChange }) {
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const stations = useSelector(state => state.libraryModule.stations)

    const actionBarRef = useRef(null)

    const isLiked = useMemo(() => stations.some(s => s._id === station?._id), [stations, station?._id])

    const moreOptions = useMemo(() => [
        { label: "Edit details", value: "edit", icon: ICONS.edit },
        // { label: "Add to queue", value: "add to queue", icon: ICONS.queue },
        { label: "Delete", value: "delete", icon: ICONS.delete }
    ], [])

    useEffect(() => {
        const elementToObserve = actionBarRef.current

        if (!elementToObserve) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                onVisibilityChange?.(entry.isIntersecting)
            },
            {
                root: null,
                rootMargin: "0px 0px 10px 0px",
                threshold: 0.4,
            }
        )

        observer.observe(elementToObserve)

        return () => {
            if (elementToObserve) {
                observer.unobserve(elementToObserve)
            }
        }
    }, [onVisibilityChange])

    async function handleConfirm(updatedStation) {
        try {
            await saveStation(updatedStation)
        } catch (error) {
            console.error("Failed to save station:", error)
        } finally {
            setIsModalOpen(false)
        }
    }

    async function handleOptionClick(option) {
        switch (option) {
            case "delete":
                try {
                    await removeStation(station._id)
                    clearStation()
                    navigate("/")
                } catch (error) {
                    console.error("Failed to remove station:", error)
                }
                break
            case "edit":
                setIsModalOpen(true)
                break
            case "add to queue":
                // Future implementation
                break
            default:
                break
        }
    }

    return (
        <section className="action-bar" ref={actionBarRef}>
            <PlayButton stationId={station?._id} />

            <LikeButton
                isLiked={isLiked}
                onToggle={() => toggleLikeStation(station)}
                size={31}
                bigBtn={true}
            />

            {isAllowed && (
                <StationDropdownOptions
                    options={moreOptions}
                    onOptionClick={handleOptionClick}
                />
            )}

            {isModalOpen && (
                <StationEditModal
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirm}
                    station={station}
                />
            )}
        </section>
    )
}