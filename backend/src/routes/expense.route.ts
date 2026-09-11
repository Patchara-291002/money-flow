import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import upload from '../middleware/upload.middleware'
import { listExpenses, addExpense, addExpenses, scanExpense } from '../controllers/expense.controller'

const router = Router()

router.use(authenticate)

router.get('/', listExpenses)
router.post('/', addExpense)
router.post('/batch', addExpenses)
router.post('/scan', upload.array('images', 10), scanExpense)


export default router