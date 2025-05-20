export function CategoryPreview({ category }) {

    const colors = [
        "rgb(220, 20, 140)", "rgb(0, 100, 80)", "rgb(132, 0, 231)","rgb(96, 129, 8)",
        "rgb(71, 125, 149)", "rgb(13, 115, 236)", "rgb(80, 55, 80)", "rgb(119, 119, 119)",
        "rgb(175, 40, 150)", "rgb(141, 103, 171)", "rgb(233, 20, 41)", "rgb(30, 50, 100)",
        "rgb(216, 64, 0)", "rgb(186, 93, 7)", "rgb(176, 98, 57)", "rgb(140, 25, 50)",
        "rgb(81, 121, 161)", "rgb(165, 103, 82)", "rgb(20, 138, 8)"
    ]
    const randColor = colors[Math.floor(Math.random() * colors.length)]

    return (
        <article className="category-preview" style={{"background-color": randColor}}>
            <span>{category.name}</span>
            <img src={`${category.icons[0].url}`}></img>
        </article>
    )
}