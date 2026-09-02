import { Request, Response, NextFunction } from 'express';
import { SettingsService } from '../services/settings.service';
import { AppResponse } from '../utils/response';

export class SettingsController {
  /**
   * GET /api/settings
   * Return application settings
   */
  static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const settings = SettingsService.getSettings();
      AppResponse.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/settings
   * Update application settings
   */
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { notification_enabled, autoplay_enabled, playback_speed, language, appearance } = req.body;

      if (playback_speed !== undefined && (isNaN(Number(playback_speed)) || Number(playback_speed) <= 0)) {
        AppResponse.badRequest(res, 'Playback speed must be a positive number.');
        return;
      }

      const updated = SettingsService.updateSettings({
        notification_enabled: notification_enabled !== undefined ? Boolean(notification_enabled) : undefined,
        autoplay_enabled: autoplay_enabled !== undefined ? Boolean(autoplay_enabled) : undefined,
        playback_speed: playback_speed !== undefined ? Number(playback_speed) : undefined,
        language: language !== undefined ? String(language) : undefined,
        appearance: appearance !== undefined ? String(appearance) : undefined,
      });

      AppResponse.success(res, updated, 200, 'Settings updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
