import { Router } from 'express';
import { CasesController } from '../controllers/cases.controller';

const router = Router();

// Search cases endpoint (declared before /:id)
router.get('/search', CasesController.search);

// Case CRUD
router.get('/', CasesController.getAll);
router.get('/:id', CasesController.getById);
router.post('/', CasesController.create);
router.put('/:id', CasesController.update);
router.delete('/:id', CasesController.delete);

export default router;
