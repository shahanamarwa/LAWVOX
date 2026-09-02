import { PrecedentCase } from '../types/dashboard';
import { ALL_CASES } from './dashboardData';

export interface LegalNote {
  id: string;
  caseId: string;
  caseName: string;
  citation: string;
  timestamp: string;
  audioTimestamp: string;
  title: string;
  content: string;
  tags: string[];
  lastEdited: string;
}

export interface LibraryCategory {
  id: string;
  title: string;
  description: string;
  count: string;
  iconName: string;
  badge: string;
}

export interface LibraryDocument {
  id: string;
  title: string;
  category: string;
  year: number | string;
  jurisdiction: string;
  duration: string;
  readTime: string;
  fileSize: string;
  description: string;
  tags: string[];
  audioNarrationText: string;
}

export interface HistoryEntry {
  id: string;
  caseId: string;
  caseName: string;
  citation: string;
  court: string;
  listenedAt: string;
  duration: string;
  progressPercent: number;
  completed: boolean;
  doctrine: string;
}

// 12 Comprehensive Constitutional Landmark Cases
export const EXTENDED_CASES: PrecedentCase[] = [
  ...ALL_CASES,
  {
    id: 'minerva-mills',
    name: 'Minerva Mills Ltd. v. Union of India',
    citation: '(1980) 3 SCC 625 | AIR 1980 SC 1789',
    year: 1980,
    court: 'Supreme Court of India',
    judgmentDate: '31 July 1980',
    benchSize: '5-Judge Constitutional Bench',
    coram: [
      'Chief Justice Y.V. Chandrachud',
      'Justice P.N. Bhagwati',
      'Justice A.C. Gupta',
      'Justice N.L. Untwalia',
      'Justice P.S. Kailasam',
    ],
    leadJudge: 'Chief Justice Y.V. Chandrachud',
    doctrine: 'Balance between Fundamental Rights & Directive Principles',
    articleReference: 'Articles 368(4), 368(5) & 31C',
    duration: '14:50',
    summary:
      'Struck down Sections 4 and 55 of the 42nd Amendment Act. Held that the harmony and balance between Fundamental Rights (Part III) and Directive Principles (Part IV) is an essential feature of the Basic Structure.',
    ratioDecidendi:
      'Parliament cannot, under the guise of amending the Constitution, expand its amending power into absolute, unreviewable sovereignty. A limited amending power is one of the basic features of the Indian Constitution.',
    facts:
      'Minerva Mills, a textile undertaking in Karnataka, was nationalized by the Central Government under the Sick Textile Undertakings Act, 1974. The company challenged the validity of Section 4 and 55 of the 42nd Constitutional Amendment Act, which sought to bar judicial review of amendments.',
    petitionerArguments: [
      'Sections 4 and 55 of the 42nd Amendment destroyed the basic structure by ousting judicial review and granting unlimited amending powers to Parliament.',
      'Subordinating Part III entirely to Part IV destroyed the foundational core of fundamental freedoms.',
    ],
    respondentArguments: [
      'Socialist transformation and Directive Principles represent the collective welfare of the nation and should override individual rights.',
    ],
    keyExcerpts: [
      '"The Indian Constitution is founded on the bedrock of the balance between Parts III and IV. To give absolute primacy to one over the other is to disturb the harmony of the Constitution." — Chief Justice Y.V. Chandrachud',
    ],
    impact:
      'Reinforced the Kesavananda Bharati basic structure doctrine and invalidated legislative attempts to establish parliamentary supremacy over the Constitution.',
    audioNarrationText:
      'Minerva Mills versus Union of India, decided on July 31, 1980, by a five-judge bench led by Chief Justice Chandrachud. The Supreme Court struck down clauses (4) and (5) of Article 368 introduced by the 42nd Amendment. The Court held that a limited amending power and the golden balance between Fundamental Rights and Directive Principles are integral parts of the Basic Structure of the Indian Constitution.',
    tags: ['Basic Structure', '42nd Amendment', 'Part III vs Part IV', 'Judicial Review'],
    isBookmarked: true,
    category: 'Constitutional Amendments',
  },
  {
    id: 'indira-sawhney',
    name: 'Indra Sawhney v. Union of India',
    citation: '(1992) Supp (3) SCC 217 | (Mandal Commission Case)',
    year: 1992,
    court: 'Supreme Court of India',
    judgmentDate: '16 November 1992',
    benchSize: '9-Judge Constitutional Bench',
    coram: [
      'Chief Justice M.H. Kania',
      'Justice M.N. Venkatachaliah',
      'Justice S. Ratnavel Pandian',
      'Justice T.K. Thommen',
      'Justice A.M. Ahmadi',
      'Justice Kuldip Singh',
      'Justice P.B. Sawant',
      'Justice R.M. Sahai',
      'Justice B.P. Jeevan Reddy',
    ],
    leadJudge: 'Justice B.P. Jeevan Reddy',
    doctrine: '50% Cap on Reservations & Creamy Layer Exclusion',
    articleReference: 'Articles 14, 15(4), 16(1) & 16(4)',
    duration: '16:30',
    summary:
      'Historic 9-Judge Bench upholding 27% reservation for Other Backward Classes (OBCs) subject to the exclusion of the "Creamy Layer" and enforcing an overarching 50% ceiling limit on total reservations.',
    ratioDecidendi:
      'Article 16(4) is not an exception to Article 16(1) but an emphatic facet of equality of opportunity. Backward classes must be socially and educationally backward; economic criteria alone cannot define backwardness under Article 16(4).',
    facts:
      'The V.P. Singh government issued an office memorandum in 1990 implementing the Mandal Commission recommendations granting 27% reservation to Socially and Educationally Backward Classes (SEBCs) in central public services.',
    petitionerArguments: [
      'Reservations based primarily on caste violate Article 16(2) and undermine merit and administrative efficiency under Article 335.',
      'Reservations must be strictly limited to exceptional situations.',
    ],
    respondentArguments: [
      'Caste in the Indian context represents a distinct social class with historical institutional deprivation that requires affirmative state action under Article 16(4).',
    ],
    keyExcerpts: [
      '"Equality of opportunity is not mere formal equality between unequals. Real equality requires affirmative steps to lift the disadvantaged." — Justice B.P. Jeevan Reddy',
    ],
    impact:
      'Established the permanent institutional framework for affirmative action, caste-based reservations, and creamy layer exclusion in Indian public law.',
    audioNarrationText:
      'Indra Sawhney versus Union of India, November 16, 1992. A landmark nine-judge Constitutional Bench upheld twenty-seven percent reservation for Other Backward Classes in central government employment. The Court mandated the exclusion of the socially and economically advanced Creamy Layer and imposed a fifty percent cap on total affirmative reservations.',
    tags: ['Affirmative Action', 'Article 16(4)', 'Mandal Commission', 'Creamy Layer', '9-Judge Bench'],
    isBookmarked: false,
    category: 'Equality',
  },
  {
    id: 'anuradha-bhasin',
    name: 'Anuradha Bhasin v. Union of India',
    citation: '(2020) 3 SCC 637 | 2020 INSC 22',
    year: 2020,
    court: 'Supreme Court of India',
    judgmentDate: '10 January 2020',
    benchSize: '3-Judge Bench',
    coram: ['Justice N.V. Ramana', 'Justice R. Subhash Reddy', 'Justice B.R. Gavai'],
    leadJudge: 'Justice N.V. Ramana',
    doctrine: 'Internet Access as Free Speech & Proportionality of Communications Shutdowns',
    articleReference: 'Articles 19(1)(a), 19(1)(g) & 21',
    duration: '11:45',
    summary:
      'Held that the freedom of speech and expression and the right to practice any profession over the medium of internet are constitutionally protected under Articles 19(1)(a) and 19(1)(g). Indefinite internet suspensions are impermissible under law.',
    ratioDecidendi:
      'An order suspending internet services indefinitely violates the principle of proportionality. All shutdown orders under the Telecom Suspension Rules must be published and are subject to judicial review.',
    facts:
      'Following the abrogation of Article 370 in Jammu and Kashmir in August 2019, the government imposed total mobile and broadband internet shutdowns and movement restrictions across the region.',
    petitionerArguments: [
      'Journalists and medical professionals were completely paralyzed without internet access, crippling press freedom and essential emergency services.',
      'No state justification could warrant an indefinite blanket blackout across an entire population.',
    ],
    respondentArguments: [
      'Restrictions were imperative to preempt terrorism, cross-border infiltration, and incitement to public disorder.',
    ],
    keyExcerpts: [
      '"Freedom of speech and expression through the medium of internet is an integral part of Article 19(1)(a) and must be protected against arbitrary executive overreach." — Justice N.V. Ramana',
    ],
    impact:
      'Established strict procedural safeguards, periodic review mandates, and proportionality requirements for internet suspensions across India.',
    audioNarrationText:
      'Anuradha Bhasin versus Union of India, delivered on January 10, 2020. The Supreme Court declared that freedom of speech and expression and the freedom to practice trade or commerce over the internet are protected under Article 19. The Court ruled that indefinite internet suspensions are unlawful and must satisfy the four-pronged test of proportionality.',
    tags: ['Internet Freedom', 'Article 19(1)(a)', 'Proportionality', 'Digital Rights'],
    isBookmarked: false,
    category: 'Freedom of Speech',
  },
  {
    id: 'shayara-bano',
    name: 'Shayara Bano v. Union of India',
    citation: '(2017) 9 SCC 1 | (Triple Talaq Case)',
    year: 2017,
    court: 'Supreme Court of India',
    judgmentDate: '22 August 2017',
    benchSize: '5-Judge Constitutional Bench',
    coram: [
      'Chief Justice J.S. Khehar',
      'Justice Kurian Joseph',
      'Justice Rohinton F. Nariman',
      'Justice U.U. Lalit',
      'Justice S. Abdul Nazeer',
    ],
    leadJudge: 'Justice Rohinton F. Nariman & Justice Kurian Joseph',
    doctrine: 'Manifest Arbitrariness Doctrine under Article 14',
    articleReference: 'Articles 14, 15, 21 & 25',
    duration: '13:10',
    summary:
      'Held by a 3:2 majority that the practice of Talaq-e-Biddat (instant triple talaq) is unconstitutional, arbitrary, and violates fundamental rights of Muslim women under Article 14.',
    ratioDecidendi:
      'An arbitrary rule or practice with no institutional determining principle violates Article 14. What is held bad in theology cannot be good in constitutional law.',
    facts:
      'Shayara Bano, after 15 years of marriage, was unilaterally divorced through instant triple talaq via a speed post letter. She challenged the practice before the Supreme Court as a violation of gender equality and dignity.',
    petitionerArguments: [
      'Instant triple talaq left women destitute overnight without opportunity for reconciliation or due process.',
      'Personal laws must conform to Fundamental Rights and human dignity.',
    ],
    respondentArguments: [
      'Muslim personal law is protected under Article 25 and cannot be tested against Part III rights by secular courts.',
    ],
    keyExcerpts: [
      '"Manifest arbitrariness is a distinct ground to strike down legislation and state action under Article 14 of the Constitution." — Justice R.F. Nariman',
    ],
    impact:
      'Strengthened the "Manifest Arbitrariness" standard under Article 14 and advanced gender justice protections within personal law spheres.',
    audioNarrationText:
      'Shayara Bano versus Union of India, August 22, 2017. A five-judge bench ruled by three to two that instant triple talaq is unconstitutional. Justices Nariman and Lalit held that the practice was manifestly arbitrary under Article 14, affirming equal constitutional status and dignity for women.',
    tags: ['Gender Justice', 'Article 14', 'Manifest Arbitrariness', '5-Judge Bench'],
    isBookmarked: true,
    category: 'Equality',
  },
];

// User Notes Mock Data
export const USER_NOTES: LegalNote[] = [
  {
    id: 'note-1',
    caseId: 'kesavananda-bharati',
    caseName: 'Kesavananda Bharati v. State of Kerala',
    citation: '(1973) 4 SCC 225',
    timestamp: '2 hours ago',
    audioTimestamp: '08:45',
    title: 'Basic Structure Scope & Khanna J. Ratio',
    content:
      'Justice H.R. Khanna specifically held that property rights are not part of the basic structure, but democratic governance, separation of powers, and the power of judicial review cannot be amended out. Key citation for upcoming Constitutional Law moot brief.',
    tags: ['Basic Structure', 'Moot Prep', 'Art 368'],
    lastEdited: '31 Aug 2026',
  },
  {
    id: 'note-2',
    caseId: 'puttaswamy-rec',
    caseName: 'Justice K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    timestamp: 'Yesterday',
    audioTimestamp: '05:12',
    title: 'Three-Pronged Proportionality Standard',
    content:
      'Chandrachud J. outlines the proportionality test: 1) Legality (prescribed by law), 2) Legitimate State Aim (public interest), 3) Proportionality (least restrictive means with rational nexus). Crucial for digital privacy petitions.',
    tags: ['Privacy', 'Proportionality', 'Article 21'],
    lastEdited: '30 Aug 2026',
  },
  {
    id: 'note-3',
    caseId: 'maneka-gandhi-bm',
    caseName: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248',
    timestamp: '3 days ago',
    audioTimestamp: '03:40',
    title: 'Golden Triangle & Natural Justice Reading',
    content:
      'Bhagwati J. synthesized Articles 14, 19, and 21 into an indivisible triad. Natural justice is not an unruly horse; it must be read into all statutes affecting civil rights unless explicitly excluded by necessary implication.',
    tags: ['Golden Triangle', 'Natural Justice', 'Article 14 & 21'],
    lastEdited: '28 Aug 2026',
  },
  {
    id: 'note-4',
    caseId: 'shreya-singhal',
    caseName: 'Shreya Singhal v. Union of India',
    citation: '(2015) 5 SCC 1',
    timestamp: '5 days ago',
    audioTimestamp: '07:20',
    title: 'Advocacy vs. Incitement Standard',
    content:
      'Nariman J. adopted the classic Brandenburg doctrine: mere advocacy of an unpopular cause is protected under Art 19(1)(a). State can only penalize when speech amounts to clear and imminent incitement to lawless violence.',
    tags: ['Free Speech', 'IT Act', 'Overbreadth'],
    lastEdited: '26 Aug 2026',
  },
];

// Listening History Mock Data
export const LISTENING_HISTORY: HistoryEntry[] = [
  {
    id: 'hist-1',
    caseId: 'kesavananda-bharati',
    caseName: 'Kesavananda Bharati v. State of Kerala',
    citation: '(1973) 4 SCC 225',
    court: 'Supreme Court of India',
    listenedAt: 'Today, 02:15 PM',
    duration: '13:30',
    progressPercent: 63,
    completed: false,
    doctrine: 'Basic Structure Doctrine',
  },
  {
    id: 'hist-2',
    caseId: 'puttaswamy-rec',
    caseName: 'Justice K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1',
    court: 'Supreme Court of India',
    listenedAt: 'Today, 11:30 AM',
    duration: '18:40',
    progressPercent: 100,
    completed: true,
    doctrine: 'Fundamental Right to Privacy',
  },
  {
    id: 'hist-3',
    caseId: 'shreya-singhal',
    caseName: 'Shreya Singhal v. Union of India',
    citation: '(2015) 5 SCC 1',
    court: 'Supreme Court of India',
    listenedAt: 'Yesterday, 04:45 PM',
    duration: '11:15',
    progressPercent: 100,
    completed: true,
    doctrine: 'Chilling Effect & Overbreadth',
  },
  {
    id: 'hist-4',
    caseId: 'maneka-gandhi-bm',
    caseName: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248',
    court: 'Supreme Court of India',
    listenedAt: 'Yesterday, 09:10 AM',
    duration: '12:10',
    progressPercent: 100,
    completed: true,
    doctrine: 'Procedure Established by Law (Golden Triangle)',
  },
  {
    id: 'hist-5',
    caseId: 'olga-tellis',
    caseName: 'Olga Tellis v. Bombay Municipal Corporation',
    citation: '(1985) 3 SCC 545',
    court: 'Supreme Court of India',
    listenedAt: '28 Aug 2026',
    duration: '09:40',
    progressPercent: 85,
    completed: false,
    doctrine: 'Right to Livelihood in Article 21',
  },
  {
    id: 'hist-6',
    caseId: 'minerva-mills',
    caseName: 'Minerva Mills Ltd. v. Union of India',
    citation: '(1980) 3 SCC 625',
    court: 'Supreme Court of India',
    listenedAt: '27 Aug 2026',
    duration: '14:50',
    progressPercent: 100,
    completed: true,
    doctrine: 'Harmony of Part III & Part IV',
  },
];

// Library Corpus Documents
export const LIBRARY_DOCUMENTS: LibraryDocument[] = [
  {
    id: 'lib-1',
    title: 'The Constitution of India (Bare Act with 106 Amendments)',
    category: 'Statutes & Constitutional Texts',
    year: '1950 - 2026',
    jurisdiction: 'Republic of India',
    duration: '45:00',
    readTime: 'Complete Code',
    fileSize: '4.8 MB',
    description:
      'Official text of the Constitution of India incorporating the latest 106th Constitutional Amendment Act (Nari Shakti Vandan Adhiniyam) with chapter-by-chapter audio recitations.',
    tags: ['Bare Act', 'Part III', 'Part IV', 'Article 368', 'Schedules'],
    audioNarrationText:
      'The Constitution of India, enacted on twenty-sixth November 1949 and in force since twenty-sixth January 1950. Comprising three hundred and ninety-five original articles across twenty-two parts and twelve schedules. The foundational organic law of the Republic.',
  },
  {
    id: 'lib-2',
    title: 'Constituent Assembly Debates: Fundamental Rights (Vols. I – XII)',
    category: 'Historical Transcripts & CAD',
    year: '1946 - 1949',
    jurisdiction: 'Constituent Assembly of India',
    duration: '32:15',
    readTime: '12 Volumes',
    fileSize: '18.2 MB',
    description:
      'Verbatim transcripts and audio dramatizations of Dr. B.R. Ambedkar, Sardar Patel, and Sir Alladi Krishnaswamy Iyer debating Draft Articles 13, 14, 15, and 21.',
    tags: ['CAD', 'Dr. B.R. Ambedkar', 'Original Intent', 'Draft Article 15'],
    audioNarrationText:
      'Constituent Assembly Debates on Fundamental Rights. Dr. Bhimrao Ramji Ambedkar addressing the Assembly on the indispensability of Article thirty-two, declaring it the very soul and heart of the Constitution without which the entire charter of liberty would be rendered nugatory.',
  },
  {
    id: 'lib-3',
    title: 'Oral Arguments Archive: Kesavananda Bharati (Day 1 – Day 68)',
    category: 'Supreme Court Oral Argument Recordings',
    year: '1972 - 1973',
    jurisdiction: 'Supreme Court of India (Chief Justice Court)',
    duration: '28:40',
    readTime: '68 Court Days',
    fileSize: '12.4 MB',
    description:
      'Restored audio summaries of Nani Palkhivala, Attorney General Niren De, and H.M. Seervai presenting arguments before the 13-Judge Bench across 68 historical hearings.',
    tags: ['Palkhivala', 'Niren De', 'Oral Arguments', '68 Days'],
    audioNarrationText:
      'Oral arguments in Kesavananda Bharati versus State of Kerala. Senior Advocate Nani Palkhivala opening the petition before Chief Justice Sikri, arguing that Parliament is a creature of the Constitution and cannot arrogate to itself the power to dismantle its creator.',
  },
  {
    id: 'lib-4',
    title: 'Supreme Court Constitutional Bench Compendium (1950 – 2026)',
    category: 'Judicial Compendiums',
    year: '2026 Edition',
    jurisdiction: 'Supreme Court of India',
    duration: '54:20',
    readTime: '5-Judge, 7-Judge, 9-Judge Rulings',
    fileSize: '24.6 MB',
    description:
      'Classified digest of all 5-Judge, 7-Judge, 9-Judge, 11-Judge, and 13-Judge benches of the Supreme Court with ratio decidendi headnotes and audio summaries.',
    tags: ['Bench Compendium', 'Coram Index', 'Precedent Headnotes'],
    audioNarrationText:
      'Supreme Court Constitutional Bench Compendium. Indexed compilation of landmark constitutional decisions from AK Gopalan to the latest seven-judge bench rulings on legislative immunity and arbitration.',
  },
];
