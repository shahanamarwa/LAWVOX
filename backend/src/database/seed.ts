// backend/src/database/seed.ts

import { db } from '../config/database';
import { Case } from '../types';

const LANDMARK_CASES: Case[] = [
  {
    id: 'kesavananda-bharati',
    case_name: 'Kesavananda Bharati v. State of Kerala',
    court: 'Supreme Court of India',
    year: 1973,
    citation: '1973 SCR (4) 225',
    category: 'Constitutional Law',
    judge: 'Chief Justice S.M. Sikri',
    constitutional_provisions: 'Article 368 (Amendment Power)',
    summary: 'Established the Basic Structure Doctrine - Parliament cannot amend the basic features of the Constitution.',
    legal_issue: 'Can Parliament use Article 368 to amend the basic structure of the Constitution?',
    decision: 'Held that Article 368 does not authorize the Parliament to alter the basic structure of the Constitution. The power of amendment has constitutional limits.',
    keywords: 'Basic Structure, Constitutional Amendment, Limitation',
    bench_size: '13-Judge Bench',
    doctrine: 'Basic Structure Doctrine',
    audio_url: 'https://example.com/kesavananda.mp3',
  },
  {
    id: 'shreya-singhal',
    case_name: 'Shreya Singhal v. Union of India',
    court: 'Supreme Court of India',
    year: 2015,
    citation: '2015 (5) SCC 1',
    category: 'Constitutional Law',
    judge: 'Chief Justice R.M. Lodha',
    constitutional_provisions: 'Article 19(1)(a) (Freedom of Speech)',
    summary: 'Struck down Section 66A of IT Act as unconstitutional for being vague and overbroad.',
    legal_issue: 'Is Section 66A of Information Technology Act consistent with Article 19(1)(a)?',
    decision: 'Held that Section 66A is unconstitutional as it is vague, overbroad, and violates freedom of speech and expression.',
    keywords: 'Free Speech, Section 66A IT Act, Overbreadth Doctrine',
    bench_size: '2-Judge Bench',
    doctrine: 'Freedom of Speech & Overbreadth',
    audio_url: 'https://example.com/shreya.mp3',
  },
  {
    id: 'indian-young-lawyers',
    case_name: 'Indian Young Lawyers Association v. State of Kerala',
    court: 'Supreme Court of India',
    year: 2018,
    citation: '2018 (10) SCC 1',
    category: 'Constitutional Law',
    judge: 'Chief Justice Dipak Misra',
    constitutional_provisions: 'Articles 14, 15, 25 (Equality & Religious Freedom)',
    summary: 'Allowed women of all ages to enter Sabarimala temple, striking down the exclusionary practice.',
    legal_issue: 'Does the restriction on women entering Sabarimala violate constitutional equality and freedom rights?',
    decision: 'Held that the practice of restricting entry of women to Sabarimala violates Articles 14, 15, and 25. Gender-based discrimination cannot be justified on religious grounds.',
    keywords: 'Sabarimala, Gender Equality, Religious Freedom',
    bench_size: '5-Judge Bench',
    doctrine: 'Equality & Religious Freedom',
    audio_url: 'https://example.com/sabarimala.mp3',
  },
  {
    id: 'olga-tellis',
    case_name: 'Olga Tellis v. Bombay Municipal Corporation',
    court: 'Supreme Court of India',
    year: 1985,
    citation: '1986 (2) SCC 163',
    category: 'Socio-Economic Rights',
    judge: 'Justice Chandrachud',
    constitutional_provisions: 'Article 21 (Right to Life)',
    summary: 'Recognized the right to livelihood as an integral part of the right to life.',
    legal_issue: 'Does the right to life under Article 21 include the right to livelihood?',
    decision: 'Held that the right to life includes the right to livelihood. Without livelihood, life is reduced to mere animal existence.',
    keywords: 'Right to Livelihood, Right to Life, Socio-Economic Rights',
    bench_size: '2-Judge Bench',
    doctrine: 'Right to Livelihood',
    audio_url: 'https://example.com/olga.mp3',
  },
  {
    id: 'maneka-gandhi',
    case_name: 'Maneka Gandhi v. Union of India',
    court: 'Supreme Court of India',
    year: 1978,
    citation: '1978 (1) SCC 248',
    category: 'Constitutional Law',
    judge: 'Justice Hans Raj Khanna',
    constitutional_provisions: 'Article 21 (Procedure Established by Law)',
    summary: 'Expanded Article 21 to mean "law" in the sense of just, fair, and reasonable law (Golden Triangle doctrine).',
    legal_issue: 'Can the government restrict a citizen\'s passport without following fair procedure?',
    decision: 'Held that Article 21 means procedure must be established by law, and such procedure must be just, fair, and reasonable. Mere legal procedure is not enough.',
    keywords: 'Golden Triangle, Fair Procedure, Substantive Due Process',
    bench_size: '4-Judge Bench',
    doctrine: 'Golden Triangle',
    audio_url: 'https://example.com/maneka.mp3',
  },
  {
    id: 'vishaka-rajasthan',
    case_name: 'Vishaka v. State of Rajasthan',
    court: 'Supreme Court of India',
    year: 1997,
    citation: '1997 (6) SCC 241',
    category: 'Fundamental Rights',
    judge: 'Justice J.S. Verma',
    constitutional_provisions: 'Articles 14, 19, 21 (Equality, Freedom, Right to Life)',
    summary: 'Issued comprehensive guidelines against sexual harassment of women at workplace.',
    legal_issue: 'Can the court issue guidelines to prevent sexual harassment at workplace in absence of specific legislation?',
    decision: 'Held that Articles 14, 19, and 21 protect women from sexual harassment. Court issued Vishaka Guidelines as binding law until Parliament enacts legislation.',
    keywords: 'Sexual Harassment, Workplace, Gender Rights',
    bench_size: '3-Judge Bench',
    doctrine: 'Workplace Harassment Guidelines',
    audio_url: 'https://example.com/vishaka.mp3',
  },
  {
    id: 'puttaswamy-privacy',
    case_name: 'Justice K.S. Puttaswamy v. Union of India',
    court: 'Supreme Court of India',
    year: 2017,
    citation: '2017 (10) SCC 1',
    category: 'Fundamental Rights',
    judge: 'Chief Justice Dipak Misra',
    constitutional_provisions: 'Article 21 (Right to Life & Liberty)',
    summary: 'Recognized the fundamental right to privacy as an intrinsic part of Article 21.',
    legal_issue: 'Is the right to privacy a fundamental right under the Indian Constitution?',
    decision: 'Held that the right to privacy is a fundamental right protected under Article 21. Privacy includes personal autonomy, bodily integrity, and informational privacy.',
    keywords: 'Right to Privacy, Fundamental Right, Article 21',
    bench_size: '9-Judge Bench',
    doctrine: 'Fundamental Right to Privacy',
    audio_url: 'https://example.com/puttaswamy.mp3',
  },
  {
    id: 'golaknath-punjab',
    case_name: 'Golaknath v. State of Punjab',
    court: 'Supreme Court of India',
    year: 1967,
    citation: '1967 (2) SCR 762',
    category: 'Constitutional Law',
    judge: 'Chief Justice M. Hidayatullah',
    constitutional_provisions: 'Article 368 (Amendment Power)',
    summary: 'Held that Fundamental Rights cannot be amended, restricting Parliamentary amendment powers.',
    legal_issue: 'Can Parliament amend Part III (Fundamental Rights) of the Constitution?',
    decision: 'Held that Parliament cannot amend Fundamental Rights as they are immutable. This was later overruled by Kesavananda Bharati (Basic Structure Doctrine).',
    keywords: 'Constitutional Amendment, Fundamental Rights, Parliamentary Power',
    bench_size: '11-Judge Bench',
    doctrine: 'Amendment Limitations',
    audio_url: 'https://example.com/golaknath.mp3',
  },
];

/**
 * Seeds the database with landmark constitutional cases
 */
export function seedDatabase(): void {
  try {
    const existingCount = db
      .prepare('SELECT COUNT(*) as count FROM cases')
      .get() as { count: number };

    if (existingCount.count > 0) {
      console.log(`[Seed] Database already contains ${existingCount.count} cases. Skipping seed.`);
      return;
    }

    const insertStmt = db.prepare(`
      INSERT INTO cases (
        id, case_name, court, year, citation, category, judge,
        constitutional_provisions, summary, legal_issue, decision,
        keywords, bench_size, doctrine, audio_url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `);

    const insertMany = db.transaction((cases: Case[]) => {
      for (const caseData of cases) {
        insertStmt.run(
          caseData.id,
          caseData.case_name,
          caseData.court,
          caseData.year,
          caseData.citation || null,
          caseData.category,
          caseData.judge || null,
          caseData.constitutional_provisions || null,
          caseData.summary || null,
          caseData.legal_issue || null,
          caseData.decision || null,
          caseData.keywords || null,
          caseData.bench_size || null,
          caseData.doctrine || null,
          caseData.audio_url || null
        );
      }
    });

    insertMany(LANDMARK_CASES);

    console.log(`[Seed] ✅ Successfully inserted ${LANDMARK_CASES.length} landmark cases into lawvox.db`);
  } catch (err) {
    console.error('[Seed] Error seeding database:', err);
  }
}
