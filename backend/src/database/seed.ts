import { db, initializeDatabase } from '../config/database';

export function seedDatabase(): void {
  // Ensure schema exists
  initializeDatabase();

  console.log('[Seed] Starting database seeding for LAWVOX Backend...');

  // 1. Seed Comprehensive Landmark Constitutional Cases
  const casesData = [
    {
      id: 'kesavananda-bharati',
      case_name: 'Kesavananda Bharati v. State of Kerala',
      court: 'Supreme Court of India',
      year: 1973,
      citation: '(1973) 4 SCC 225 | AIR 1973 SC 1461',
      category: 'Constitutional Amendments',
      judge: 'Chief Justice S.M. Sikri, Justice H.R. Khanna, Justice J.M. Shelat, Justice K.S. Hegde, Justice A.N. Grover, Justice A.N. Ray, Justice P. Jaganmohan Reddy, Justice D.G. Palekar, Justice K.K. Mathew, Justice M.H. Beg, Justice S.N. Dwivedi, Justice A.K. Mukherjea, Justice Y.V. Chandrachud',
      constitutional_provisions: 'Article 368, Article 13, Article 19(1)(f), Article 31, Preamble',
      summary:
        'Historic 13-Judge Constitutional Bench ruling by a 7:6 majority establishing the celebrated Basic Structure Doctrine. The Court affirmed that while Parliament holds plenary constituent power under Article 368 to amend any part of the Constitution, it possesses no constitutional authority to alter, destroy, or emasculate its basic structure or essential core.',
      legal_issue:
        'Does Parliament possess unlimited, sovereign constituent powers under Article 368 to abrogate or destroy fundamental rights and constitutional framework?',
      decision:
        'Parliament can amend constitutional provisions, but the power under Article 368 does not include the power to destroy or alter the foundational Basic Structure (Judicial Review, Rule of Law, Separation of Powers, Democracy, Secularism).',
      keywords: 'Basic Structure Doctrine, Article 368, Judicial Review, 13-Judge Bench, Constitutional Identity',
      bench_size: '13-Judge Constitutional Bench',
      doctrine: 'Basic Structure Doctrine',
      audio_url: '/audio/kesavananda-bharati.mp3',
    },
    {
      id: 'maneka-gandhi',
      case_name: 'Maneka Gandhi v. Union of India',
      court: 'Supreme Court of India',
      year: 1978,
      citation: '(1978) 1 SCC 248 | AIR 1978 SC 597',
      category: 'Fundamental Rights',
      judge: 'Chief Justice M.H. Beg, Justice Y.V. Chandrachud, Justice P.N. Bhagwati, Justice V.R. Krishna Iyer, Justice N.L. Untwalia, Justice S. Murtaza Fazal Ali, Justice P.S. Kailasam',
      constitutional_provisions: 'Article 21, Article 14, Article 19(1)(a), Article 19(1)(g), Passports Act 1967',
      summary:
        'Revolutionized Indian constitutional jurisprudence by establishing the Golden Triangle doctrine (Articles 14, 19, and 21 are mutually reinforcing and non-siloed). The Court ruled that any "procedure established by law" depriving personal liberty must not be arbitrary, fanciful, or oppressive, but must be just, fair, and reasonable.',
      legal_issue:
        'Can the executive impound an Indian citizen’s passport without providing grounds or hearing, and what is the constitutional scope of "procedure established by law" in Article 21?',
      decision:
        'Overruled AK Gopalan. Infused substantive due process into Article 21. Natural justice principles must be read into all statutory administrative actions affecting personal liberty.',
      keywords: 'Golden Triangle, Article 21, Substantive Due Process, Personal Liberty, Natural Justice, Passports Act',
      bench_size: '7-Judge Constitutional Bench',
      doctrine: 'Golden Triangle & Substantive Due Process',
      audio_url: '/audio/maneka-gandhi.mp3',
    },
    {
      id: 'puttaswamy',
      case_name: 'Justice K.S. Puttaswamy v. Union of India',
      court: 'Supreme Court of India',
      year: 2017,
      citation: '(2017) 10 SCC 1 | AIR 2017 SC 4161',
      category: 'Right to Privacy',
      judge: 'Chief Justice J.S. Khehar, Justice J. Chelameswar, Justice S.A. Bobde, Justice R.K. Agrawal, Justice R.F. Nariman, Justice A.M. Sapre, Justice D.Y. Chandrachud, Justice S.K. Kaul, Justice S.A. Nazeer',
      constitutional_provisions: 'Article 21, Part III (Fundamental Rights), Informational Autonomy',
      summary:
        'Unanimous 9-Judge Constitutional Bench declaration confirming that the Right to Privacy is an intrinsic and foundational fundamental right guaranteed under Article 21 and the architectural scheme of Part III. The Court established the three-prong Proportionality Test for state encroachments on privacy.',
      legal_issue:
        'Is privacy a constitutionally protected fundamental right in India following contradictory earlier rulings in MP Sharma (1954) and Kharak Singh (1962)?',
      decision:
        'Unanimously upheld privacy as a fundamental right. Overruled MP Sharma and Kharak Singh to the extent they denied privacy. Established the strict proportionality test: Legality, Legitimate State Aim, and Proportionality.',
      keywords: 'Right to Privacy, Article 21, Proportionality Test, Informational Privacy, Surveillance, 9-Judge Bench, Aadhaar',
      bench_size: '9-Judge Constitutional Bench',
      doctrine: 'Fundamental Right to Privacy & Proportionality Test',
      audio_url: '/audio/puttaswamy.mp3',
    },
    {
      id: 'vishaka',
      case_name: 'Vishaka v. State of Rajasthan',
      court: 'Supreme Court of India',
      year: 1997,
      citation: '(1997) 6 SCC 241 | AIR 1997 SC 3011',
      category: 'Equality',
      judge: 'Chief Justice J.S. Verma, Justice Sujata V. Manohar, Justice B.N. Kirpal',
      constitutional_provisions: 'Article 14, Article 19(1)(g), Article 21, Article 32, CEDAW Convention',
      summary:
        'Formulated the historic Vishaka Guidelines to prevent sexual harassment of women in the workplace in the absence of enacted legislation. The Supreme Court exercised its expansive powers under Article 32 and incorporated international treaty obligations (CEDAW) into domestic municipal law.',
      legal_issue:
        'Does sexual harassment at the workplace violate fundamental rights to equality (Art 14), non-discrimination (Art 15), trade/profession (Art 19(1)(g)), and dignity/life (Art 21)?',
      decision:
        'Gender equality includes protection from sexual harassment. The Court laid down binding guidelines and mandatory Internal Complaints Committees (ICC) across all workplaces until statutory law was enacted.',
      keywords: 'Vishaka Guidelines, Workplace Harassment, Article 14, Article 21, CEDAW, Gender Justice, Judicial Legislation',
      bench_size: '3-Judge Bench',
      doctrine: 'Judicial Gap-Filling & Workplace Gender Safety',
      audio_url: '/audio/vishaka.mp3',
    },
    {
      id: 'shreya-singhal',
      case_name: 'Shreya Singhal v. Union of India',
      court: 'Supreme Court of India',
      year: 2015,
      citation: '(2015) 5 SCC 1 | AIR 2015 SC 1523',
      category: 'Freedom of Speech',
      judge: 'Justice J. Chelameswar & Justice Rohinton F. Nariman',
      constitutional_provisions: 'Article 19(1)(a), Article 19(2), Section 66A Information Technology Act 2000',
      summary:
        'Landmark Division Bench ruling striking down Section 66A of the Information Technology Act in its entirety as unconstitutional for violating freedom of speech and expression under Article 19(1)(a). The Court held that vague and overbroad statutory definitions cause an impermissible chilling effect on digital public discourse.',
      legal_issue:
        'Whether Section 66A of the IT Act penalizing "offensive" online messages violates freedom of speech under Article 19(1)(a) and exceeds permissible reasonable restrictions under Article 19(2).',
      decision:
        'Section 66A declared void and unconstitutional. The Court established the vital constitutional boundary between mere advocacy/discussion of unpopular ideas and unlawful incitement to violence.',
      keywords: 'Freedom of Speech, Section 66A IT Act, Chilling Effect, Vagueness Doctrine, Overbreadth, Digital Rights',
      bench_size: '2-Judge Division Bench',
      doctrine: 'Chilling Effect & Overbreadth Doctrine',
      audio_url: '/audio/shreya-singhal.mp3',
    },
    {
      id: 'indian-young-lawyers',
      case_name: 'Indian Young Lawyers Association v. State of Kerala',
      court: 'Supreme Court of India',
      year: 2018,
      citation: '(2019) 11 SCC 1 | AIR 2018 SC 5670',
      category: 'Equality',
      judge: 'Chief Justice Dipak Misra, Justice R.F. Nariman, Justice A.M. Khanwilkar, Justice D.Y. Chandrachud, Justice Indu Malhotra',
      constitutional_provisions: 'Article 14, Article 15, Article 17, Article 21, Article 25, Article 26',
      summary:
        'Held by a 4:1 majority that the customary rule barring women between ages 10 and 50 from entering the Sabarimala Ayyappa temple in Kerala was unconstitutional. The Court ruled that biological physiological factors like menstruation cannot serve as a constitutional basis for exclusion from public religious worship.',
      legal_issue:
        'Does the biological exclusion of women from temple entry violate equality (Art 14/15) and religious freedom (Art 25), or is it protected under denominational rights (Art 26)?',
      decision:
        'Customary exclusion struck down. Constitutional morality and non-discrimination prevail over patriarchal customary practices. Rule 3(b) of Kerala Places of Worship Rules declared ultra vires.',
      keywords: 'Sabarimala Temple, Gender Equality, Constitutional Morality, Article 25, Anti-Exclusion, Dignity',
      bench_size: '5-Judge Constitutional Bench',
      doctrine: 'Constitutional Morality & Anti-Exclusion Principle',
      audio_url: '/audio/indian-young-lawyers.mp3',
    },
    {
      id: 'olga-tellis',
      case_name: 'Olga Tellis v. Bombay Municipal Corporation',
      court: 'Supreme Court of India',
      year: 1985,
      citation: '(1985) 3 SCC 545 | AIR 1986 SC 180',
      category: 'Fundamental Rights',
      judge: 'Chief Justice Y.V. Chandrachud, Justice D.A. Desai, Justice O. Chinnappa Reddy, Justice E.S. Venkataramiah, Justice R.B. Misra',
      constitutional_provisions: 'Article 21, Article 19(1)(e), Article 39(a), Article 41',
      summary:
        'Landmark 5-Judge ruling expanding the Right to Life under Article 21 to encompass the Right to Livelihood. The Supreme Court held that the right to live with human dignity is impossible without the means of subsistence and livelihood, requiring procedural fairness before pavement dwellers are evicted.',
      legal_issue:
        'Whether the eviction of pavement and slum dwellers by municipal corporations without notice or hearing infringes upon their Right to Livelihood under Article 21.',
      decision:
        'Right to Livelihood is an integral facet of Right to Life under Article 21. Any eviction process must follow natural justice, procedural fairness, and alternate rehabilitation principles.',
      keywords: 'Right to Livelihood, Article 21, Pavement Dwellers, Natural Justice, Eviction, Socio-Economic Rights',
      bench_size: '5-Judge Constitutional Bench',
      doctrine: 'Right to Livelihood under Article 21',
      audio_url: '/audio/olga-tellis.mp3',
    },
    {
      id: 'golaknath',
      case_name: 'Golaknath v. State of Punjab',
      court: 'Supreme Court of India',
      year: 1967,
      citation: '(1967) 2 SCR 762 | AIR 1967 SC 1643',
      category: 'Judicial Review',
      judge: 'Chief Justice K. Subba Rao, Justice K.N. Wanchoo, Justice M. Hidayatullah, Justice J.C. Shah, Justice S.M. Sikri, Justice R.S. Bachawat, Justice V. Ramaswami, Justice J.M. Shelat, Justice V. Bhargava, Justice G.K. Mitter, Justice C.A. Vaidialingam',
      constitutional_provisions: 'Article 368, Article 13(2), Part III (Fundamental Rights)',
      summary:
        'Landmark 11-Judge Constitutional Bench ruling by a 6:5 majority holding that Parliament had no power to abridge or take away fundamental rights under Part III because a constitutional amendment was considered "law" within the meaning of Article 13(2). Introduced the doctrine of Prospective Overruling.',
      legal_issue:
        'Is an amendment enacted under Article 368 a "law" within the meaning of Article 13(2), and can Parliament amend Fundamental Rights?',
      decision:
        'Parliament cannot amend Part III to extinguish fundamental rights. The decision precipitated the 24th and 25th Constitutional Amendments and the subsequent Kesavananda Bharati basic structure resolution.',
      keywords: 'Article 368, Article 13(2), Prospective Overruling, 11-Judge Bench, Fundamental Rights Non-amendability',
      bench_size: '11-Judge Constitutional Bench',
      doctrine: 'Prospective Overruling & Fundamental Rights Sanctity',
      audio_url: '/audio/golaknath.mp3',
    },
  ];

  const insertCaseStmt = db.prepare(`
    INSERT INTO cases (
      id, case_name, court, year, citation, category, judge, constitutional_provisions,
      summary, legal_issue, decision, keywords, bench_size, doctrine, audio_url
    ) VALUES (
      @id, @case_name, @court, @year, @citation, @category, @judge, @constitutional_provisions,
      @summary, @legal_issue, @decision, @keywords, @bench_size, @doctrine, @audio_url
    )
    ON CONFLICT(id) DO UPDATE SET
      case_name = excluded.case_name,
      court = excluded.court,
      year = excluded.year,
      citation = excluded.citation,
      category = excluded.category,
      judge = excluded.judge,
      constitutional_provisions = excluded.constitutional_provisions,
      summary = excluded.summary,
      legal_issue = excluded.legal_issue,
      decision = excluded.decision,
      keywords = excluded.keywords,
      bench_size = excluded.bench_size,
      doctrine = excluded.doctrine,
      audio_url = excluded.audio_url,
      updated_at = CURRENT_TIMESTAMP
  `);

  const insertCasesTx = db.transaction((cases) => {
    for (const item of cases) {
      insertCaseStmt.run(item);
    }
  });
  insertCasesTx(casesData);
  console.log(`[Seed] Seeded / updated ${casesData.length} structured landmark constitutional cases.`);

  // 2. Seed Profile matching Frontend UI
  db.prepare('DELETE FROM profile').run();
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
  console.log('[Seed] Seeded Advocate Aarav Sharma profile.');

  // 3. Seed Settings
  const settingsCount = db.prepare('SELECT COUNT(*) as count FROM settings').get() as { count: number };
  if (settingsCount.count === 0) {
    db.prepare(`
      INSERT INTO settings (notification_enabled, autoplay_enabled, playback_speed, language, appearance)
      VALUES (?, ?, ?, ?, ?)
    `).run(1, 1, 1.0, 'English', 'light');
    console.log('[Seed] Seeded default application settings.');
  }

  // 4. Seed Bookmarks matching the 4 bookmarks shown in frontend screenshot
  db.prepare('DELETE FROM bookmarks').run();
  const insertBookmark = db.prepare('INSERT OR IGNORE INTO bookmarks (case_id) VALUES (?)');
  insertBookmark.run('kesavananda-bharati');
  insertBookmark.run('maneka-gandhi');
  insertBookmark.run('puttaswamy');
  insertBookmark.run('vishaka');
  console.log('[Seed] Seeded 4 landmark bookmarks matching UI.');

  // 5. Seed Listening History matching Dashboard stats (18h 45m = 67500s)
  db.prepare('DELETE FROM listening_history').run();
  const insertHistory = db.prepare(`
    INSERT INTO listening_history (case_id, duration_listened, completion_percentage, last_position)
    VALUES (?, ?, ?, ?)
  `);
  // Featured continue listening case: Kesavananda Bharati
  insertHistory.run('kesavananda-bharati', 525, 63.0, 525);
  insertHistory.run('maneka-gandhi', 860, 100.0, 860);
  insertHistory.run('puttaswamy', 1005, 75.0, 1005);
  insertHistory.run('shreya-singhal', 675, 100.0, 675);
  insertHistory.run('vishaka', 920, 85.0, 920);
  insertHistory.run('indian-young-lawyers', 860, 90.0, 860);
  insertHistory.run('olga-tellis', 780, 60.0, 780);
  insertHistory.run('golaknath', 820, 70.0, 820);
  console.log('[Seed] Seeded listening history entries.');

  // 6. Seed Notes (14 notes count for profile metrics)
  db.prepare('DELETE FROM notes').run();
  const insertNote = db.prepare(`
    INSERT INTO notes (title, case_id, content)
    VALUES (?, ?, ?)
  `);
  insertNote.run('Basic Structure Limits on Art 368', 'kesavananda-bharati', 'Parliament cannot abrogate the constitutional core identity.');
  insertNote.run('Three-fold Proportionality Test', 'puttaswamy', 'State encroachment on privacy requires Legality, Legitimate State Aim, and Proportionality.');
  insertNote.run('Golden Triangle Interdependence', 'maneka-gandhi', 'Articles 14, 19, and 21 form a composite code ensuring fair and just procedure.');
  insertNote.run('Vishaka Guidelines & ICC Mandate', 'vishaka', 'Workplace sexual harassment is an infringement of Articles 14, 19(1)(g), and 21.');
  console.log('[Seed] Seeded research notes.');

  // 7. Seed Recent Searches
  db.prepare('DELETE FROM recent_searches').run();
  const insertSearch = db.prepare('INSERT INTO recent_searches (query) VALUES (?)');
  insertSearch.run('Basic Structure Doctrine');
  insertSearch.run('Article 21 Right to Privacy');
  insertSearch.run('Section 66A IT Act');
  insertSearch.run('Golden Triangle');
  console.log('[Seed] Seeded recent searches.');

  console.log('[Seed] Database seeding completed successfully for LAWVOX.');
}

// If run directly via ts-node
if (require.main === module) {
  try {
    seedDatabase();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Seeding failed:', error);
    process.exit(1);
  }
}
