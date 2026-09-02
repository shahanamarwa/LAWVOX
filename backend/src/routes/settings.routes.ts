import { Router } from 'express';
import { SettingsController } from '../controllers/settings.controller';

const router = Router();

router.get('/', SettingsController.get);
router.put('/', SettingsController.update);

export default router;
