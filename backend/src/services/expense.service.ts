import prisma from '../lib/prisma'
import gemini from '../lib/gemini'
import { Type } from '@google/genai'

export const getExpensesByUser = async (userId: string, page: number, pageSize: number) => {
  const [expenses, total] = await Promise.all([
    prisma.expense.findMany({
      where: { userId },
      include: { category: true },
      orderBy: [
        {date: 'desc'},
        {createdAt: 'desc'},
        {id: 'desc'}
      ],
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.expense.count({ where: { userId } }),
  ])

  return { expenses, total }
}

export const createExpense = async (data: {
  userId: string
  categoryId: string
  amount: number
  merchant: string
  note?: string
  date: Date
}) => {
  return prisma.expense.create({ data })
}

export const createExpenses = async (
  items: {
    userId: string
    categoryId: string
    amount: number
    merchant: string
    note?: string
    date: Date
  }[]
) => {
  return prisma.$transaction(items.map((data) => prisma.expense.create({ data })))
}

export const scanReceipt = async (imageBuffer: Buffer, mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp') => {
  const categories = await prisma.category.findMany({ select: { id: true, name: true } })
  const categoryIds = categories.map((c) => c.id)
  const categoryListText = categories.map((c) => `- ${c.id}: ${c.name}`).join('\n')

  const response = await gemini.models.generateContent({
    model: 'gemini-3.1-flash-lite',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { data: imageBuffer.toString('base64'), mimeType: mediaType } },
          {
            text: `นี่คือรูปใบเสร็จหรือสลิปโอนเงิน อ่านข้อมูลออกมา แล้วเลือก categoryId ที่ตรงกับรายการนี้มากที่สุดจากหมวดหมู่ที่มีอยู่เท่านั้น:\n${categoryListText}`,
          },
        ],
      },
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          merchant: { type: Type.STRING, description: 'ชื่อร้านค้าหรือผู้รับเงินที่ปรากฏในใบเสร็จ/สลิป' },
          amount: { type: Type.NUMBER, description: 'จำนวนเงินรวมที่จ่าย/โอน' },
          date: { type: Type.STRING, description: 'วันที่ทำรายการ รูปแบบ YYYY-MM-DD' },
          categoryId: {
            type: Type.STRING,
            format: 'enum',
            enum: categoryIds,
            description: 'id ของหมวดหมู่ที่ตรงกับรายการนี้มากที่สุด',
          },
        },
        required: ['merchant', 'amount', 'date', 'categoryId'],
      },
    },
  })

  return JSON.parse(response.text ?? '{}')
}

// export const getMonthlySummary = async (userId: string, year: number, month: number) => {
//   const startDate = new Date(year, month - 1, 1)
//   const endDate = new Date(year, month, 0, 23, 59, 59)

//   const expenses = await prisma.expense.findMany({
//     where: {
//       userId,
//       date: { gte: startDate, lte: endDate },
//     },
//     include: { category: true },
//   })

//   const total = expenses.reduce((sum, e) => sum + e.amount, 0)

//   return { expenses, total, count: expenses.length }
// }