export type Expense = {
    id: string
    amount: number
    merchant: string
    note: string | null
    date: string
    category: {
        id: string
        name: string
        icon: string | null
        color: string | null
    } 
}

export async function getExpenses(backendToken: string): Promise<Expense[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
        headers: {
            'Authorization': `Bearer ${backendToken}`,
        },
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch expenses: ${res.status} ${res.statusText}`)
    }

    const data = await res.json()
    return data.expenses as Expense[]
}