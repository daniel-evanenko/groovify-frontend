export function LongTxt({ children, length = 45 }) {
    let displayText = ""
    if (children.length < length) displayText = children
    else displayText = children.slice(0, length) + "..."

    return <p className="long-txt">{displayText}</p>
}