import { ReactSVG } from "react-svg";

const ICONS = {
    like: "/icons/like.svg",
    liked: "/icons/liked.svg"
};

export function LikeButton({ isLiked, onToggle, bigBtn = false }) {

    // function delayedOnToggle() {
    //     setTimeout(onToggle, )
    // }

    return (
        <div
            className={`like-icon ${isLiked ? "liked" : "unliked"} ${bigBtn ? "bigBtn" : ""}`}
            onClick={onToggle}
        >
            <ReactSVG src={isLiked ? ICONS.liked : ICONS.like} />
        </div>
    );
}
