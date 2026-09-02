import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';

const router = Router();

router.get('/', ProfileController.get);
router.put('/', ProfileController.update);

export default router;
