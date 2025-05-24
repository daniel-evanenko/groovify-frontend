import { useEffect, useRef } from 'react'
import Lottie from 'lottie-react'
import likeToggleAnimation from '/public/animations/like-dislike-animation.json'

export function LikeButton({ obj, isLiked, onToggle, bigBtn = false }) {
    const lottieRef = useRef()

    const likedFrame = 70
    const unlikedFrame = 0

    useEffect(() => {
        if (!lottieRef.current) return

        const targetFrame = isLiked ? likedFrame : unlikedFrame
        lottieRef.current.goToAndStop(targetFrame, true)
    }, [isLiked]) // ✅ Depend on `isLiked`

    const handleClick = (e) => {
        e.stopPropagation()

        if (!lottieRef.current) return

        if (!isLiked) {
            lottieRef.current.playSegments([0, likedFrame], true)
        } else {
            lottieRef.current.playSegments([71, 129], true)
        }

        onToggle(obj)
    }

    return (
        <div
            className={`like-btn ${bigBtn ? 'big-btn' : ''}`}
            onClick={handleClick}
        >
            <Lottie
                lottieRef={lottieRef}
                animationData={likeToggleAnimation}
                autoplay={false}
                loop={false}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    )
}
