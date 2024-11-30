import { Router } from 'express';
import { adminController } from '../controllers/adminController';

const router = Router();

router.post('/admin/clean-database', adminController.cleanDatabase);

export default router;