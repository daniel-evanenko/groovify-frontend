import { useState } from 'react'
import { ReactSVG } from 'react-svg'

export function TrackLikeButton({ track, isLiked, onToggle }) {
    const [animate, setAnimate] = useState(false)

    const handleClick = (e) => {
        e.stopPropagation()
        setAnimate(true)
        onToggle(track)
        setTimeout(() => setAnimate(false), 300) // match CSS duration
    }

    return (
        <div className={`like-btn ${isLiked ? 'liked' : ''} ${animate ? 'animate' : ''}`} onClick={handleClick}>
            <ReactSVG src={isLiked ? '/icons/check-circle.svg' : '/icons/like.svg'} />
        </div>
    )
}
