import { useEffect, useRef, useState } from "react"
import { debounce } from "../services/util.service"
import { ReactSVG } from "react-svg"

export function SearchBar({
    onSearch,
    updateQuery = undefined,
    debounceTimeout = 300,
    placeholder = ""
}) {
    const debouncedSearch = useRef(debounce(onSearch, debounceTimeout)).current
    const [query, setQuery] = useState("")
    const isInitialMount = useRef(true)
    const elSearchInput = useRef()
    const elSearchButton = useRef()

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
            return
        }

        debouncedSearch(query)
    }, [query, debouncedSearch])


    function onQueryChanged(e) {
        const value = e.target.value
        setQuery(value)
        if (updateQuery) updateQuery(value)
    }

    function onQueryClear() {
        setQuery("")
        if (updateQuery) updateQuery("")
    }

    function onSearchClicked() {
        elSearchInput.current.focus()
        elSearchButton.current.style.setProperty("cursor", "default")
    }

    return (
        <div className="search-bar">
            <button ref={elSearchButton} className="search-btn" onClick={onSearchClicked}>
                <ReactSVG src="/icons/search.svg" />
            </button>
            <input
                ref={elSearchInput}
                className="search-input"
                type="text"
                value={query}
                onChange={onQueryChanged}
                placeholder={placeholder}
            />
            {query && (
                <button className="clear-btn" onClick={onQueryClear}>
                    <ReactSVG src="/icons/close.svg" />
                </button>
            )}
        </div>
    )
}