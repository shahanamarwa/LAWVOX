import { Router } from 'express';
import { BookmarksController } from '../controllers/bookmarks.controller';

const router = Router();

router.get('/', BookmarksController.getAll);
router.get('/:caseId', BookmarksController.checkStatus);
router.post('/:caseId', BookmarksController.create);
router.delete('/:caseId', BookmarksController.delete);

export default router;
