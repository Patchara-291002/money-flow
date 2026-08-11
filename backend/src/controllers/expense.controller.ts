import { Request, Response } from 'express'
import { getExpensesByUser, createExpense, getMonthlySummary } from '../services/expense.service'

export const listExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const expenses = await getExpensesByUser(userId)
    res.json({ expenses })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch expenses' })
  }
}

export const addExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const { categoryId, amount, merchant, note, date, imageUrl, receiptNumber } = req.body

    const expense = await createExpense({
      userId,
      categoryId,
      amount,
      merchant,
      note,
      date: new Date(date),
      imageUrl,
      receiptNumber,
    })

    res.json({ expense })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create expense' })
  }
}

export const monthlySummary = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const year = parseInt(req.query.year as string) || new Date().getFullYear()
    const month = parseInt(req.query.month as string) || new Date().getMonth() + 1

    const summary = await getMonthlySummary(userId, year, month)
    res.json(summary)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch summary' })
  }
}