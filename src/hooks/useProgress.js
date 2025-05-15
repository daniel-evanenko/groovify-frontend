import { useRef, useState } from "react"

export function useProgress({ startVal = 0 }) {
    const [currentVal, setCurrentVal] = useState(startVal)
    const [endingVal, setEndingVal] = useState(null)
    const intervalRef = useRef(null)
    const [isRunning, setIsRunning] = useState(false)

    function start() {
        if (intervalRef.current || !endingVal) return
        setIsRunning(true)

        intervalRef.current = setInterval(() => {
            setCurrentVal(prev => {
                if (prev < endingVal) return prev + 1

                stop()
                return prev
            })
        }, 1000)
    }

    function stop() {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setIsRunning(false)
    }

    function set(value) {
        if (endingVal == null) return
        setCurrentVal(Math.min(Math.max(value, startVal), endingVal))
    }

    const isReady = endingVal !== null

    return { currentVal, set, start, stop, isRunning, setEndingVal, isReady }
}
