import { Router, Request, Response } from 'express';
import casesRouter from './cases.routes';
import bookmarksRouter from './bookmarks.routes';
import historyRouter from './history.routes';
import notesRouter from './notes.routes';
import profileRouter from './profile.routes';
import settingsRouter from './settings.routes';
import dashboardRouter from './dashboard.routes';
import searchesRouter from './searches.routes';
import { SearchesController } from '../controllers/searches.controller';

const router = Router();

// Health Check endpoint matching Requirement 7
router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'LAWVOX backend is running',
  });
});

// Global Search endpoint matching Requirement 18: GET /api/search?q=keyword
router.get('/search', SearchesController.globalSearch);

// Mount feature routers
router.use('/cases', casesRouter);
router.use('/bookmarks', bookmarksRouter);
router.use('/history', historyRouter);
router.use('/notes', notesRouter);
router.use('/profile', profileRouter);
router.use('/settings', settingsRouter);
router.use('/dashboard', dashboardRouter);
router.use('/searches', searchesRouter);

export default router;
