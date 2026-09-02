import { Router } from 'express';
import { NotesController } from '../controllers/notes.controller';

const router = Router();

router.get('/', NotesController.getAll);
router.get('/:id', NotesController.getById);
router.post('/', NotesController.create);
router.put('/:id', NotesController.update);
router.delete('/:id', NotesController.delete);

export default router;
