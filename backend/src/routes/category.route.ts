import { Router } from 'express'
import { authenticate } from '../middleware/auth.middleware'
import { listCategories } from '../controllers/category.controller'

const router = Router();

router.use(authenticate);

router.get('/', listCategories);

export default router