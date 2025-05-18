import { CategoryPreview } from "./CategoryPreview";
import { ResizableItemsList } from "./ResizableItemsList";

export function CategoryList({ categories }) {

    return (
        <ResizableItemsList className="category-list" items={categories} minItemWidth={250} minItemCount={2}>
            {(category, idx) => (
                <CategoryPreview key={category.id} category={category} />
            )}
        </ResizableItemsList>
    )
}