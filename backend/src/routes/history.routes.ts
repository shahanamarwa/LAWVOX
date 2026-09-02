import { Router } from 'express';
import { HistoryController } from '../controllers/history.controller';

const router = Router();

router.get('/', HistoryController.getAll);
router.post('/', HistoryController.create);
router.put('/:id', HistoryController.update);
router.delete('/:id', HistoryController.delete);

export default router;
