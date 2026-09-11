import prisma from '../lib/prisma'
import anthropic from '../lib/anthropic'
import { jsonSchemaOutputFormat } from '@anthropic-ai/sdk/helpers/json-schema'

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

export const scanReceipt = async (imageBuffer: Buffer, mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp') => {
  const categories = await prisma.category.findMany({ select: { id: true, name: true } })
  const categoryIds = categories.map((c) => c.id)

  const outputFormat = jsonSchemaOutputFormat({
    type: 'object',
    properties: {
      merchant: { type: 'string', description: 'ชื่อร้านค้าหรือผู้รับเงินที่ปรากฏในใบเสร็จ/สลิป' },
      amount: { type: 'number', description: 'จำนวนเงินรวมที่จ่าย/โอน' },
      date: { type: 'string', description: 'วันที่ทำรายการ รูปแบบ YYYY-MM-DD' },
      categoryId: {
        type: 'string',
        enum: categoryIds,
        description: 'id ของหมวดหมู่ที่ตรงกับรายการนี้มากที่สุด',
      },
    },
    required: ['merchant', 'amount', 'date', 'categoryId'],
    additionalProperties: false,
  })

  const categoryListText = categories.map((c) => `- ${c.id}: ${c.name}`).join('\n')

  const response = await anthropic.messages.parse({
    model: 'claude-sonnet-5',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mediaType, data: imageBuffer.toString('base64') },
          },
          {
            type: 'text',
            text: `นี่คือรูปใบเสร็จหรือสลิปโอนเงิน อ่านข้อมูลออกมา แล้วเลือก categoryId ที่ตรงกับรายการนี้มากที่สุดจากหมวดหมู่ที่มีอยู่เท่านั้น:\n${categoryListText}`,
          },
        ],
      },
    ],
    output_config: { format: outputFormat },
  })

  return response.parsed_output
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