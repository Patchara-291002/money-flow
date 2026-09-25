import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Import routes
import authRoutes from './routes/auth.routes'
import expenseRoutes from './routes/expense.route'
import categoryRoutes from './routes/category.route'

dotenv.config()

const app = express()
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}))
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use('/auth', authRoutes)
app.use('/expenses', expenseRoutes)
app.use('/categories', categoryRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Money Flow API is running 🚀' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app