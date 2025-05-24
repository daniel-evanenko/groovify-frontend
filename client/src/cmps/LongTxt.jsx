import parse from "html-react-parser"

export function LongTxt({ children, length = 45 }) {
    const startTagIndex = children.indexOf("<a ")
    const endTagIndex = startTagIndex != -1 ? children.indexOf("</a>") + 4 : -1
    const tagSubstring = startTagIndex != -1 && endTagIndex != -1 ? children.slice(startTagIndex, endTagIndex) : ""

    let displayText = children
    displayText = displayText.slice(0, startTagIndex) + displayText.slice(startTagIndex + tagSubstring.length)

    if (displayText.length >= length) displayText = displayText.slice(0, length) + "..."

    return (
        <p dir="auto" className="long-txt">{displayText}
            <span onClick={e => e.stopPropagation()}>{parse(tagSubstring)}</span>
        </p>
    )
}