export type Category = {
    id: string
    name: string
    icon: string | null
    color: string | null
    createdAt: string
}

export async function getCategories(backendToken: string): Promise<Category[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        headers: {
            'Authorization': `Bearer ${backendToken}`,
        }
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.categories as Category[]
}
