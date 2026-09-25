import { Request, Response } from 'express'
import { getExpensesByUser, createExpense, createExpenses, scanReceipt } from '../services/expense.service'

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const page = Math.max(1, Number(req.query.page) || 1)
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20))

    const { expenses, total } = await getExpensesByUser(userId, page, pageSize)

    res.json({ expenses, total, totalPages: Math.ceil(total / pageSize), page, pageSize })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch expenses' })
  }
}

export const addExpense = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const { categoryId, amount, merchant, note, date } = req.body

    const expense = await createExpense({
      userId,
      categoryId,
      amount,
      merchant,
      note,
      date: new Date(date),
    })

    res.json({ expense })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create expense' })
  }
}

export const addExpenses = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId
    const { expenses } = req.body

    if (!Array.isArray(expenses) || expenses.length === 0) {
      res.status(400).json({ message: 'expenses must be a non-empty array' })
      return
    }

    const items = expenses.map((e) => ({
      userId,
      categoryId: e.categoryId,
      amount: e.amount,
      merchant: e.merchant,
      note: e.note,
      date: new Date(e.date),
    }))

    const created = await createExpenses(items)
    res.json({ expenses: created })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to create expenses' })
  }
}

const allowedMediaTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const

export const scanExpense = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined
    if (!files || files.length === 0) {
      res.status(400).json({ message: 'At least one image file is required' })
      return
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const mediaType = allowedMediaTypes.find((type) => type === file.mimetype)
        if (!mediaType) {
          return { filename: file.originalname, error: 'Unsupported image type' }
        }

        try {
          const draft = await scanReceipt(file.buffer, mediaType)
          return { filename: file.originalname, draft }
        } catch (error) {
          console.error(error)
          return { filename: file.originalname, error: 'Failed to scan receipt' }
        }
      })
    )

    res.json({ results })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to scan receipts' })
  }
}