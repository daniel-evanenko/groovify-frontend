import { useEffect, useRef, useState } from "react"
import { Loader } from "./Loader"

export function ResizableItemsList({ items, minItemCount, minItemWidth, className, children }) {
    const elList = useRef()
    const [displayAmount, setDisplayAmount] = useState(items.length)

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            const itemsListWidth = entries[0].itemsRect.width
            const displayAmount = Math.max(Math.floor(itemsListWidth / minItemWidth), minItemCount)
            setDisplayAmount(displayAmount)

        })

        resizeObserver.observe(elList.current)
        return () => resizeObserver.disconnect()
    }, [])


    if (!items) return <Loader></Loader>

    return (
        <section ref={elList} className={`item-list ${className}`}>
            <div className="item-previews">
                {items.slice(0, displayAmount).map((item, idx) => children(item, idx))}
            </div>
        </section>
    )
}

