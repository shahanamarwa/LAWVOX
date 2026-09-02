import { Router } from 'express';
import { SearchesController } from '../controllers/searches.controller';

const router = Router();

router.get('/', SearchesController.getRecent);
router.post('/', SearchesController.addSearch);
router.delete('/:id', SearchesController.deleteSearch);

export default router;
