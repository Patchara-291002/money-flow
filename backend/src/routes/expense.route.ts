import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import upload from '../middleware/upload.middleware'
import { listExpenses, addExpense, scanExpense } from '../controllers/expense.controller'

const router = Router()

router.use(authenticate)

router.get('/', listExpenses)
router.post('/', addExpense)
router.post('/scan', upload.single('image'), scanExpense)


export default router