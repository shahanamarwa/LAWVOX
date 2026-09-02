import { Request, Response, NextFunction } from 'express';
import { ProfileService } from '../services/profile.service';
import { AppResponse } from '../utils/response';

export class ProfileController {
  /**
   * GET /api/profile
   * Return demo user profile
   */
  static async get(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const profile = ProfileService.getProfile();
      AppResponse.success(res, profile);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/profile
   * Update profile
   */
  static async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, profession, email, institution, research_interests, avatar_url } = req.body;

      if (email !== undefined && (!email || typeof email !== 'string' || !email.includes('@'))) {
        AppResponse.badRequest(res, 'Please provide a valid email address.');
        return;
      }

      const updated = ProfileService.updateProfile({
        name,
        profession,
        email,
        institution,
        research_interests,
        avatar_url,
      });

      AppResponse.success(res, updated, 200, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }
}
