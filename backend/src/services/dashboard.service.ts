import { db } from '../config/database';
import { DashboardData, DashboardStatistics, CategorySummary, Case } from '../types';
import { ProfileService } from './profile.service';
import { BookmarksService } from './bookmarks.service';
import { HistoryService } from './history.service';
import { SearchesService } from './searches.service';

export class DashboardService {
  /**
   * Format seconds into human readable duration e.g. "4h 32m" or "28m"
   */
  private static formatSeconds(totalSeconds: number): string {
    if (!totalSeconds || totalSeconds <= 0) return '0m';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }

  /**
   * Calculate live statistics directly from SQLite tables
   */
  static getStatistics(): DashboardStatistics {
    // 1. Total Listening Time (Sum of duration_listened in seconds)
    const listeningSumRow = db
      .prepare('SELECT COALESCE(SUM(duration_listened), 0) as total_seconds FROM listening_history')
      .get() as { total_seconds: number };
    const totalListeningTimeSeconds = listeningSumRow.total_seconds || 0;

    // 2. Cases Listened (Distinct cases in listening history)
    const casesCountRow = db
      .prepare('SELECT COUNT(DISTINCT case_id) as total_cases FROM listening_history')
      .get() as { total_cases: number };
    const casesListened = casesCountRow.total_cases || 0;

    // 3. Bookmarks Count
    const bookmarksCountRow = db
      .prepare('SELECT COUNT(*) as total_bookmarks FROM bookmarks')
      .get() as { total_bookmarks: number };
    const bookmarksCount = bookmarksCountRow.total_bookmarks || 0;

    // 4. Daily Average (Calculate distinct active listening days or default to 7-day average)
    const distinctDaysRow = db
      .prepare('SELECT COUNT(DISTINCT DATE(listened_at)) as active_days FROM listening_history')
      .get() as { active_days: number };
    const activeDays = Math.max(1, distinctDaysRow.active_days || 1);
    const dailyAverageMinutes = Math.round(totalListeningTimeSeconds / 60 / activeDays);

    return {
      totalListeningTimeSeconds,
      totalListeningTimeFormatted: this.formatSeconds(totalListeningTimeSeconds),
      casesListened,
      bookmarksCount,
      dailyAverageMinutes,
    };
  }

  /**
   * Get Category breakdown with actual case counts from database
   */
  static getCategories(): CategorySummary[] {
    const predefinedCategories = [
      {
        category: 'Fundamental Rights',
        articleRange: 'Articles 12–35',
        description: 'Core constitutional liberties, protection of life, personal liberty, and remedies.',
      },
      {
        category: 'Constitutional Amendments',
        articleRange: 'Article 368',
        description: 'Parliamentary amending powers, constitutional limits, and basic structure doctrine.',
      },
      {
        category: 'Right to Privacy',
        articleRange: 'Article 21',
        description: 'Informational privacy, digital surveillance jurisprudence, and autonomy.',
      },
      {
        category: 'Freedom of Speech',
        articleRange: 'Article 19(1)(a)',
        description: 'Press freedom, digital expression, reasonable restrictions, and dissent rights.',
      },
      {
        category: 'Equality',
        articleRange: 'Articles 14–18',
        description: 'Equal protection, non-discrimination, affirmative action, and social justice.',
      },
      {
        category: 'Judicial Review',
        articleRange: 'Articles 32, 136, 226',
        description: 'Power of the judiciary to examine legislative enactments and executive actions.',
      },
    ];

    return predefinedCategories.map((cat) => {
      const countRow = db
        .prepare('SELECT COUNT(*) as count FROM cases WHERE LOWER(category) = LOWER(?)')
        .get(cat.category) as { count: number };
      return {
        category: cat.category,
        articleRange: cat.articleRange,
        description: cat.description,
        caseCount: countRow?.count || 0,
      };
    });
  }

  /**
   * Get complete Dashboard payload
   */
  static getDashboardData(): DashboardData {
    const profile = ProfileService.getProfile();
    const statistics = this.getStatistics();
    const continueListening = HistoryService.getLatestListening();
    const bookmarks = BookmarksService.getBookmarks();
    const categories = this.getCategories();
    const recentSearches = SearchesService.getRecentSearches(5);

    // Recent Cases
    const recentCases = db
      .prepare('SELECT * FROM cases ORDER BY created_at DESC, year DESC LIMIT 5')
      .all() as Case[];

    // Recommendations (landmark cases not yet listened to or top rated)
    const recommendations = db
      .prepare(`
        SELECT * FROM cases 
        WHERE id NOT IN (SELECT case_id FROM listening_history WHERE completion_percentage > 80)
        ORDER BY year DESC
        LIMIT 4
      `)
      .all() as Case[];

    // Determine greeting based on hour
    const hour = new Date().getHours();
    let greeting = 'Good morning';
    if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon';
    } else if (hour >= 17) {
      greeting = 'Good evening';
    }

    return {
      welcome: {
        userName: profile.name,
        profession: profile.profession,
        institution: profile.institution,
        greeting: `${greeting}, ${profile.name.split(' ')[0]}`,
      },
      statistics,
      continueListening,
      recentCases,
      bookmarks,
      categories,
      recommendations: recommendations.length > 0 ? recommendations : recentCases.slice(0, 4),
      recentSearches,
    };
  }
}
