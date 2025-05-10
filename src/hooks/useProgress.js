import { useRef, useState } from "react"

export function useProgress({ startVal = 0, endingVal}) {
    const [currentVal, setCurrentVal] = useState(startVal)
    const intervalRef = useRef(null)
    const [isRunning, setIsRunning] = useState(false)

    function start() {
        if (intervalRef.current) return
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
        setCurrentVal(Math.min(Math.max(value, startVal), endingVal))
    }

    return { currentVal, start, stop, set, isRunning }
}