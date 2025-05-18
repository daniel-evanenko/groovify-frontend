export function CategoryPreview({ category }) {

    return (
        <article className="category-preview">
            <span>{category.name}</span>
            <img src={`${category.icons[0].url}`}></img>
        </article>
    )
}