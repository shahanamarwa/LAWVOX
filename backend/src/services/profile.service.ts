import { db } from '../config/database';
import { Profile, UpdateProfileInput } from '../types';

export class ProfileService {
  /**
   * Get the current user profile
   */
  static getProfile(): Profile {
    let profile = db.prepare('SELECT * FROM profile ORDER BY id ASC LIMIT 1').get() as Profile | undefined;
    if (!profile) {
      db.prepare(`
        INSERT INTO profile (name, profession, email, institution, research_interests, avatar_url)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(
        'Advocate Aarav Sharma',
        'Constitutional Law Advocate & Researcher',
        'aarav.sharma@lawchambers.in',
        'High Court & Supreme Court Bar Association • Bar No: D/1482/2019',
        'Constitutional Precedents, Basic Structure Doctrine, Right to Privacy & Digital Laws, Fundamental Rights Jurisprudence, Judicial Review & Writs, Administrative Law & Natural Justice',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      );
      profile = db.prepare('SELECT * FROM profile ORDER BY id ASC LIMIT 1').get() as Profile;
    }
    return profile;
  }

  /**
   * Update the user profile
   */
  static updateProfile(input: UpdateProfileInput): Profile {
    const current = this.getProfile();

    const updates: string[] = [];
    const params: (string | null)[] = [];

    if (input.name !== undefined) {
      updates.push('name = ?');
      params.push(input.name);
    }
    if (input.profession !== undefined) {
      updates.push('profession = ?');
      params.push(input.profession);
    }
    if (input.email !== undefined) {
      updates.push('email = ?');
      params.push(input.email);
    }
    if (input.institution !== undefined) {
      updates.push('institution = ?');
      params.push(input.institution);
    }
    if (input.research_interests !== undefined) {
      updates.push('research_interests = ?');
      params.push(input.research_interests);
    }
    if (input.avatar_url !== undefined) {
      updates.push('avatar_url = ?');
      params.push(input.avatar_url);
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      params.push(String(current.id));

      const sql = `UPDATE profile SET ${updates.join(', ')} WHERE id = ?`;
      db.prepare(sql).run(...params);
    }

    return this.getProfile();
  }
}
