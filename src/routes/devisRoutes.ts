import { Router } from 'express';
import { DevisController } from '../controllers/devisController';
import { authenticateToken, requireClient, requireAdmin } from '../middlewares/authMiddleware';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// routes admin
router.get('/admin', authenticateToken, requireAdmin, DevisController.listAll);
router.get('/admin/stats', authenticateToken, requireAdmin, DevisController.getStats);
router.put('/admin/:id/validate', authenticateToken, requireAdmin, upload.single('devisFile'), DevisController.validate);
router.put('/admin/:id/refuse', authenticateToken, requireAdmin, DevisController.refuse);
router.delete('/admin/:id', authenticateToken, requireAdmin, DevisController.delete);

// routes client
router.post('/', authenticateToken, requireClient, DevisController.create);
router.get('/my', authenticateToken, requireClient, DevisController.getClientHistory);
router.get('/:id', authenticateToken, requireClient, DevisController.getOne);

export default router;


