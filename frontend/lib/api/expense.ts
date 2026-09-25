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

export type ExpensesPage = {
    expenses: Expense[]
    total: number
    totalPages: number
    page: number
    pageSize: number
}

export type CreateExpenseInput = {
    categoryId: string
    amount: number
    merchant: string
    note?: string
    date: string
}

export async function getExpenses(
    backendToken: string,
    { page = 1, pageSize = 10 }: { page?: number; pageSize?: number } = {}
): Promise<ExpensesPage> {
    const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) })
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses?${params}`, {
        headers: { 'Authorization': `Bearer ${backendToken}` },
    })

    if (!res.ok) {
        throw new Error(`Failed to fetch expenses: ${res.status} ${res.statusText}`)
    }
   return (await res.json()) as ExpensesPage
}

export async function createExpense(backendToken: string, payload: CreateExpenseInput): Promise<Expense> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/expenses`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${backendToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    })

    if (!res.ok) {
        throw new Error(`Failed to create expense: ${res.status} ${res.statusText}`)
    }
    const data = await res.json()
    return data.expense as Expense
}