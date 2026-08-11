import prisma from '../lib/prisma'

export const getExpensesByUser = async (userId: string) => {
  return prisma.expense.findMany({
    where: { userId },
    include: { category: true },
    orderBy: { date: 'desc' },
  })
}

export const createExpense = async (data: {
  userId: string
  categoryId: string
  amount: number
  merchant: string
  note?: string
  date: Date
  imageUrl?: string
  receiptNumber?: string
}) => {
  return prisma.expense.create({ data })
}

export const getMonthlySummary = async (userId: string, year: number, month: number) => {
  const startDate = new Date(year, month - 1, 1)
  const endDate = new Date(year, month, 0, 23, 59, 59)

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      date: { gte: startDate, lte: endDate },
    },
    include: { category: true },
  })

  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  return { expenses, total, count: expenses.length }
}