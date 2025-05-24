import { useEffect, useState } from "react"
import { getCategories } from "../services/spotify/spotify-api.service"
import { Loader } from "../cmps/Loader"
import { CategoryList } from "../cmps/CategoryList"

export function CategoriesPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const categories = await getCategories()
            setCategories(categories)
        }

        fetchData()
    }, [])

    if (!categories || categories.length === 0) return <Loader />

    return (
        <section className="categories-page">
            <h2>Browse all</h2>
            <CategoryList categories={categories} />
        </section>

    )
}