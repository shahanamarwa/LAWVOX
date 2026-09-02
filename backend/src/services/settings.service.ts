import { db } from '../config/database';
import { Settings, UpdateSettingsInput } from '../types';

interface RawSettingsRow {
  id: number;
  notification_enabled: number;
  autoplay_enabled: number;
  playback_speed: number;
  language: string;
  appearance: string;
  updated_at: string;
}

export class SettingsService {
  private static formatSettings(row: RawSettingsRow): Settings {
    return {
      id: row.id,
      notification_enabled: Boolean(row.notification_enabled),
      autoplay_enabled: Boolean(row.autoplay_enabled),
      playback_speed: Number(row.playback_speed),
      language: row.language,
      appearance: row.appearance,
      updated_at: row.updated_at,
    };
  }

  /**
   * Get application settings
   */
  static getSettings(): Settings {
    let row = db.prepare('SELECT * FROM settings ORDER BY id ASC LIMIT 1').get() as RawSettingsRow | undefined;
    if (!row) {
      db.prepare(`
        INSERT INTO settings (notification_enabled, autoplay_enabled, playback_speed, language, appearance)
        VALUES (?, ?, ?, ?, ?)
      `).run(1, 1, 1.0, 'English', 'light');
      row = db.prepare('SELECT * FROM settings ORDER BY id ASC LIMIT 1').get() as RawSettingsRow;
    }
    return this.formatSettings(row);
  }

  /**
   * Update application settings
   */
  static updateSettings(input: UpdateSettingsInput): Settings {
    const current = this.getSettings();

    const updates: string[] = [];
    const params: (number | string)[] = [];

    if (input.notification_enabled !== undefined) {
      updates.push('notification_enabled = ?');
      params.push(input.notification_enabled ? 1 : 0);
    }
    if (input.autoplay_enabled !== undefined) {
      updates.push('autoplay_enabled = ?');
      params.push(input.autoplay_enabled ? 1 : 0);
    }
    if (input.playback_speed !== undefined) {
      updates.push('playback_speed = ?');
      params.push(input.playback_speed);
    }
    if (input.language !== undefined) {
      updates.push('language = ?');
      params.push(input.language);
    }
    if (input.appearance !== undefined) {
      updates.push('appearance = ?');
      params.push(input.appearance);
    }

    if (updates.length > 0) {
      updates.push('updated_at = CURRENT_TIMESTAMP');
      params.push(current.id);

      const sql = `UPDATE settings SET ${updates.join(', ')} WHERE id = ?`;
      db.prepare(sql).run(...params);
    }

    return this.getSettings();
  }
}
