import { Request, Response } from 'express'
import { getExpensesByUser, createExpense, scanReceipt } from '../services/expense.service'

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

export const scanExpense = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'Image file is required' })
      return
    }

    const allowedMediaTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'] as const
    const mediaType = allowedMediaTypes.find((type) => type === req.file!.mimetype)
    if (!mediaType) {
      res.status(400).json({ message: 'Unsupported image type' })
      return
    }

    const draft = await scanReceipt(req.file.buffer, mediaType)
    res.json({ draft })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to scan receipt' })
  }
}