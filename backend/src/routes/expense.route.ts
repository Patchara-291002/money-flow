import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import { listExpenses, addExpense, monthlySummary } from '../controllers/expense.controller'

const router = Router()

router.use(authenticate)

router.get('/', listExpenses)
router.post('/', addExpense)
router.get('/summary', monthlySummary)

export default router