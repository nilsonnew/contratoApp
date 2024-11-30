import { Router } from 'express';
import { contractController } from '../controllers/contractController';

const router = Router();

router.get('/contracts', contractController.getAllContracts);
router.post('/contracts', contractController.createContract);

export default router;