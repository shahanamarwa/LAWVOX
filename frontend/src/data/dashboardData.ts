import {
  Clock,
  Headphones,
  Bookmark,
  TrendingUp,
  Shield,
  FileCode,
  EyeOff,
  MessageSquare,
  Scale,
  Gavel,
} from 'lucide-react';
import { PrecedentCase, StatItem, CategoryItem } from '../types/dashboard';

// 1. Featured Continue Listening Case
export const CONTINUE_LISTENING_CASE: PrecedentCase = {
  id: 'kesavananda-bharati',
  name: 'Kesavananda Bharati v. State of Kerala',
  citation: '(1973) 4 SCC 225 | AIR 1973 SC 1461',
  year: 1973,
  court: 'Supreme Court of India',
  judgmentDate: '24 April 1973',
  benchSize: '13-Judge Constitutional Bench (Largest Bench in SC History)',
  coram: [
    'Chief Justice S.M. Sikri',
    'Justice J.M. Shelat',
    'Justice K.S. Hegde',
    'Justice A.N. Grover',
    'Justice A.N. Ray',
    'Justice P. Jaganmohan Reddy',
    'Justice D.G. Palekar',
    'Justice H.R. Khanna',
    'Justice K.K. Mathew',
    'Justice M.H. Beg',
    'Justice S.N. Dwivedi',
    'Justice A.K. Mukherjea',
    'Justice Y.V. Chandrachud',
  ],
  leadJudge: 'Chief Justice S.M. Sikri & Justice H.R. Khanna',
  doctrine: 'Basic Structure Doctrine',
  articleReference: 'Article 368 • Amending Power of Parliament',
  duration: '13:30',
  currentTime: '08:45',
  progressPercent: 63,
  summary:
    'Historic 13-Judge Constitutional Bench ruling by a 7:6 majority establishing that while Parliament has wide powers to amend the Constitution under Article 368, it cannot alter, destroy, or emasculate its Basic Structure.',
  ratioDecidendi:
    'The power of amendment under Article 368 does not include the power to abrogate the Constitution nor does it include the power to alter the basic structure or framework of the Constitution. Fundamental rights, democracy, secularism, separation of powers, and judicial review form the bedrock of the basic structure.',
  facts:
    'His Holiness Sri Kesavananda Bharati Sripadagalvaru, head of the Edneer Mutt in Kasaragod, Kerala, challenged the Kerala Land Reforms Amendment Acts of 1969 and 1971 under Article 26 (Freedom to manage religious affairs). While the petition was pending, Parliament enacted the 24th, 25th, and 29th Constitutional Amendments to bypass earlier judicial decisions limiting amendments to Fundamental Rights.',
  petitionerArguments: [
    'Nani Palkhivala argued that Article 368 gives only the power to modify or improve within existing constitutional contours, not the power to rewrite or destroy the identity of the Constitution.',
    'If Parliament had unlimited amending power, a transient legislative majority could turn India into a dictatorship or eliminate fundamental liberties entirely.',
    'Fundamental Rights in Part III represent inalienable human rights that no legislative majority can extinguish.',
  ],
  respondentArguments: [
    'Attorney General Niren De and H.M. Seervai argued that Parliament represents the sovereign will of the people and has plenary constituent power without implied limitations.',
    'Socio-economic transformation through Directive Principles of State Policy must take precedence over property rights.',
    'Courts cannot read implied limitations into clear textual constitutional provisions.',
  ],
  keyExcerpts: [
    '"The Constitution was written for all time and not for an hour. The power of amendment cannot be used to emasculate the basic elements of the constitutional system." — Chief Justice S.M. Sikri',
    '"A power to amend is not a power to destroy. The word \'amendment\' implies that the old Constitution continues in existence in its basic form and structure." — Justice H.R. Khanna',
  ],
  impact:
    'Preserved the democratic and constitutional framework of India. Saved judicial review and prevented totalitarian legislative amendments during subsequent constitutional crises.',
  audioNarrationText:
    'Kesavananda Bharati versus State of Kerala, delivered on April 24, 1973, by the Supreme Court of India. This historic decision was rendered by the largest Constitutional Bench in Indian judicial history, comprising thirteen judges. By a seven to six majority, the Supreme Court established the celebrated Basic Structure Doctrine. The Court ruled that although Parliament has extensive amending powers under Article 368, it possesses no constitutional authority to destroy, alter, or damage the essential core and basic structure of the Constitution. Chief Justice Sikri and Justice H. R. Khanna affirmed that democracy, the rule of law, secularism, federalism, and the power of judicial review are permanent pillars of the Republic.',
  tags: ['Landmark', 'Basic Structure', '13-Judge Bench', 'Art 368', 'Judicial Review'],
  isBookmarked: true,
};

// 2. Recently Added Cases (3 cases)
export const RECENTLY_ADDED_CASES: PrecedentCase[] = [
  {
    id: 'shreya-singhal',
    name: 'Shreya Singhal v. Union of India',
    citation: '(2015) 5 SCC 1 | 2015 INSC 244',
    year: 2015,
    court: 'Supreme Court of India',
    judgmentDate: '24 March 2015',
    benchSize: '2-Judge Division Bench',
    coram: ['Justice J. Chelameswar', 'Justice Rohinton F. Nariman'],
    leadJudge: 'Justice Rohinton F. Nariman',
    doctrine: 'Chilling Effect, Overbreadth & Vagueness Doctrine',
    articleReference: 'Article 19(1)(a) • Section 66A Information Technology Act',
    duration: '11:15',
    summary:
      'Struck down Section 66A of the Information Technology Act in its entirety as unconstitutional for creating a severe chilling effect on free speech and failing the reasonable restrictions test under Article 19(2).',
    ratioDecidendi:
      'Discussion or advocacy of an unpopular cause cannot be restricted; only incitement to imminent lawless action can be penalized. Section 66A was unconstitutionally vague and overbroad, penalizing annoyance and causing self-censorship in digital speech.',
    facts:
      'Following the arrest of two young women in Maharashtra under Section 66A for posting a harmless comment on Facebook questioning a city-wide shutdown, law student Shreya Singhal filed a Public Interest Litigation challenging the validity of Section 66A.',
    petitionerArguments: [
      'Section 66A did not specify clear standards of guilt and criminalized legitimate discourse, satire, and criticism.',
      'Terms like "offensive", "menacing", and "annoyance" were open-ended and subjective, leaving room for arbitrary police enforcement.',
    ],
    respondentArguments: [
      'The internet requires different regulatory standards due to viral reach and potential to cause public disorder.',
      'Section 66A was necessary to curb online harassment and inflammatory cyber content.',
    ],
    keyExcerpts: [
      '"Under our constitutional scheme, speech cannot be suppressed simply because it causes discomfort, annoyance, or differs from the mainstream opinion." — Justice R.F. Nariman',
    ],
    impact:
      'Solidified modern digital free speech protections in India, setting strict thresholds distinguishing permissible advocacy from unlawful incitement.',
    audioNarrationText:
      'Shreya Singhal versus Union of India, decided on March 24, 2015, by Justices J. Chelameswar and Rohinton F. Nariman. The Supreme Court struck down Section 66A of the Information Technology Act for violating Article 19(1)(a). The Court held that terms like "grossly offensive" and "annoyance" are impermissibly vague, leading to a chilling effect on free online expression. The Court drew a vital constitutional line between mere discussion, advocacy, and incitement.',
    tags: ['Free Speech', 'IT Act § 66A', 'Article 19(1)(a)', 'Digital Rights'],
    isBookmarked: false,
  },
  {
    id: 'indian-young-lawyers',
    name: 'Indian Young Lawyers Association v. State of Kerala',
    citation: '(2019) 11 SCC 1 | (Sabarimala Temple Case)',
    year: 2018,
    court: 'Supreme Court of India',
    judgmentDate: '28 September 2018',
    benchSize: '5-Judge Constitutional Bench',
    coram: [
      'Chief Justice Dipak Misra',
      'Justice A.M. Khanwilkar',
      'Justice Rohinton F. Nariman',
      'Justice D.Y. Chandrachud',
      'Justice Indu Malhotra',
    ],
    leadJudge: 'Chief Justice Dipak Misra & Justice D.Y. Chandrachud',
    doctrine: 'Constitutional Morality, Anti-Exclusion & Dignity Principle',
    articleReference: 'Articles 14, 15, 17, 21, 25 & 26',
    duration: '14:20',
    summary:
      'Held by a 4:1 majority that the custom barring women aged 10 to 50 from entering the Sabarimala shrine was unconstitutional and violated women\'s right to equality, religious freedom, and human dignity.',
    ratioDecidendi:
      'Devotion cannot be subjected to gender-based biological exclusion. Rule 3(b) of the Kerala Places of Worship Rules was ultra vires. Biological factors like menstruation do not render a person impure or unfit to exercise fundamental freedoms under Article 25.',
    facts:
      'The Indian Young Lawyers Association challenged the age-old customary practice and state statutory rule preventing women between ages 10 and 50 from worshipping at the Sabarimala Ayyappa Temple in Kerala.',
    petitionerArguments: [
      'Exclusion of women based on biological traits violates fundamental rights to equality (Art 14), non-discrimination (Art 15), and freedom of religion (Art 25).',
      'The exclusion stigmatized women and perpetuated notions of untouchability prohibited under Article 17.',
    ],
    respondentArguments: [
      'Lord Ayyappa at Sabarimala is a Naishtika Brahmachari (eternal celibate), and the restriction is an integral part of the denomination\'s faith protected under Article 26.',
      'Courts should not interfere in internal matters of religious faith and deeply held devotee traditions.',
    ],
    keyExcerpts: [
      '"Patriarchy cannot be permitted to masquerade as religion. Religion is a personal quest for truth and cannot be subordinated to gender bias." — Justice D.Y. Chandrachud',
    ],
    impact:
      'Advanced the jurisprudence of Constitutional Morality over traditional social customs and affirmed that gender equality applies to places of public worship.',
    audioNarrationText:
      'Indian Young Lawyers Association versus State of Kerala, commonly known as the Sabarimala case, delivered on September 28, 2018. A five-judge Constitutional Bench ruled by four to one that excluding women between the ages of ten and fifty from the Sabarimala Temple violated Articles 14, 15, 21, and 25. The Supreme Court declared that constitutional morality takes precedence over customary exclusions and affirmed equal rights to religious worship.',
    tags: ['Sabarimala', 'Gender Equality', 'Article 25', '5-Judge Bench', 'Constitutional Morality'],
    isBookmarked: false,
  },
  {
    id: 'olga-tellis',
    name: 'Olga Tellis v. Bombay Municipal Corporation',
    citation: '(1985) 3 SCC 545 | 1985 INSC 155',
    year: 1985,
    court: 'Supreme Court of India',
    judgmentDate: '10 July 1985',
    benchSize: '5-Judge Constitutional Bench',
    coram: [
      'Chief Justice Y.V. Chandrachud',
      'Justice D.A. Desai',
      'Justice O. Chinnappa Reddy',
      'Justice E.S. Venkataramiah',
      'Justice R.B. Misra',
    ],
    leadJudge: 'Chief Justice Y.V. Chandrachud',
    doctrine: 'Right to Livelihood as an Integral Facet of Right to Life',
    articleReference: 'Articles 21, 19(1)(e), 19(1)(g) & 39(a)',
    duration: '09:40',
    summary:
      'Unanimous 5-Judge Bench held that the Right to Livelihood is an indispensable facet of the Right to Life under Article 21, establishing procedural fairness before evicting pavement and slum dwellers.',
    ratioDecidendi:
      'Deprivation of livelihood leads to the deprivation of life itself. If the right to livelihood is not treated as part of the constitutional right to life, the easiest way of depriving a person of his life would be to deprive him of his means of livelihood.',
    facts:
      'In 1981, the State of Maharashtra and BMC decided to forcibly evict and deport thousands of pavement and slum dwellers from Mumbai without providing alternative accommodation or hearing their representations.',
    petitionerArguments: [
      'Pavement dwellers live on sidewalks not by choice but because of extreme poverty and economic compulsion to earn daily wages in the city.',
      'Evicting them without rehabilitation directly deprives them of their means of livelihood and right to exist under Article 21.',
    ],
    respondentArguments: [
      'Pedestrians have a right to use sidewalks and public streets, and encroachments pose serious sanitation, safety, and health hazards.',
      'The municipal corporation has statutory duty to remove obstructions without mandatory prior notice in emergencies.',
    ],
    keyExcerpts: [
      '"The sweep of the right to life conferred by Article 21 is wide and far reaching. Life means something more than mere animal existence." — Chief Justice Y.V. Chandrachud',
    ],
    impact:
      'Foundational precedent for socio-economic human rights, natural justice, and procedural safeguards in administrative evictions across India.',
    audioNarrationText:
      'Olga Tellis versus Bombay Municipal Corporation, decided on July 10, 1985, by a five-judge Constitutional Bench led by Chief Justice Chandrachud. The Supreme Court expanded Article 21 to include the Right to Livelihood. The Court held that human life cannot be reduced to animal existence, and state authorities cannot evict pavement dwellers without adhering to principles of natural justice and procedural fairness.',
    tags: ['Pavement Dwellers', 'Right to Livelihood', 'Article 21', 'Human Dignity'],
    isBookmarked: true,
  },
];

// 3. Your Bookmarks (3 cases)
export const BOOKMARKED_CASES: PrecedentCase[] = [
  CONTINUE_LISTENING_CASE,
  {
    id: 'maneka-gandhi-bm',
    name: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248 | AIR 1978 SC 597',
    year: 1978,
    court: 'Supreme Court of India',
    judgmentDate: '25 January 1978',
    benchSize: '7-Judge Constitutional Bench',
    coram: [
      'Chief Justice M.H. Beg',
      'Justice Y.V. Chandrachud',
      'Justice P.N. Bhagwati',
      'Justice V.R. Krishna Iyer',
      'Justice N.L. Untwalia',
      'Justice S. Murtaza Fazal Ali',
      'Justice P.S. Kailasam',
    ],
    leadJudge: 'Justice P.N. Bhagwati & Justice V.R. Krishna Iyer',
    doctrine: 'Procedure Established by Law is Substantive Due Process (Golden Triangle)',
    articleReference: 'Articles 14, 19 & 21 (Interconnected Trinity)',
    duration: '12:10',
    summary:
      'Groundbreaking 7-Judge Bench ruling holding that any procedure depriving a person of life or personal liberty must be right, just, and fair, and not arbitrary, fanciful, or oppressive.',
    ratioDecidendi:
      'Articles 14, 19, and 21 do not operate in isolated silos; they form a seamless, interconnected Golden Triangle. The word "procedure" under Article 21 cannot be any formal statutory mechanism; it must embody natural justice and non-arbitrariness.',
    facts:
      'Maneka Gandhi\'s passport was impounded by the Regional Passport Officer under Section 10(3)(c) of the Passports Act in public interest, without providing reasons or an opportunity to be heard.',
    petitionerArguments: [
      'Right to travel abroad is part of personal liberty under Article 21.',
      'Impounding a passport without giving prior notice or reasons violates natural justice and is arbitrary under Article 14.',
    ],
    respondentArguments: [
      'Article 21 requires only a formal procedure established by legislation, which Section 10 of the Passports Act provided.',
    ],
    keyExcerpts: [
      '"Procedure established by law has to meet the challenge of Article 14. It must be right and just and fair and not arbitrary, fanciful or oppressive." — Justice P.N. Bhagwati',
    ],
    impact:
      'Transformed Indian constitutional jurisprudence from formalistic legality to substantive due process and human rights protection.',
    audioNarrationText:
      'Maneka Gandhi versus Union of India, delivered on January 25, 1978, by a seven-judge bench of the Supreme Court. The Court established the Golden Triangle doctrine, ruling that Articles 14, 19, and 21 are intrinsically linked. Any law depriving personal liberty must be just, fair, and reasonable, incorporating the principles of natural justice.',
    tags: ['Golden Triangle', 'Due Process', 'Passport Act', 'Article 21', '7-Judge Bench'],
    isBookmarked: true,
  },
  {
    id: 'vishaka-rajasthan-bm',
    name: 'Vishaka v. State of Rajasthan',
    citation: '(1997) 6 SCC 241 | AIR 1997 SC 3011',
    year: 1997,
    court: 'Supreme Court of India',
    judgmentDate: '13 August 1997',
    benchSize: '3-Judge Bench',
    coram: ['Chief Justice J.S. Verma', 'Justice Sujata V. Manohar', 'Justice B.N. Kirpal'],
    leadJudge: 'Chief Justice J.S. Verma',
    doctrine: 'Judicial Legislation & International Treaty Incorporation (CEDAW)',
    articleReference: 'Articles 14, 19(1)(g), 21 & 32',
    duration: '10:05',
    summary:
      'Formulated binding judicial guidelines to prevent and redress sexual harassment of working women at workplaces in the absence of enacted legislation.',
    ratioDecidendi:
      'Gender equality includes protection from sexual harassment and right to work with dignity. International conventions like CEDAW can be read into fundamental rights to fill statutory vacuums.',
    facts:
      'Bhanwari Devi, a social worker in Rajasthan, was gang-raped for attempting to stop child marriage. Social action groups filed a writ petition demanding workplace safety and institutional redressal for working women.',
    petitionerArguments: [
      'Sexual harassment at work violates the right to gender equality (Article 14), freedom to practice any profession (Article 19(1)(g)), and the right to life with dignity (Article 21).',
      'The Court had duty under Article 32 to lay down mandatory preventive guidelines.',
    ],
    respondentArguments: [
      'The Union of India accepted the need for workplace safeguards and supported the formulation of binding guidelines.',
    ],
    keyExcerpts: [
      '"Each incident of sexual harassment is a violation of the fundamental rights of gender equality and the right to life and liberty." — Chief Justice J.S. Verma',
    ],
    impact:
      'Pioneered workplace sexual harassment jurisprudence in South Asia, later codified into the POSH Act, 2013.',
    audioNarrationText:
      'Vishaka versus State of Rajasthan, decided on August 13, 1997, by a three-judge bench headed by Chief Justice J. S. Verma. In the absence of domestic legislation, the Supreme Court utilized international human rights treaties, specifically the CEDAW convention, to formulate the Vishaka Guidelines, mandating workplace safety and internal complaints committees for working women.',
    tags: ['Workplace Safety', 'Gender Rights', 'CEDAW', 'POSH Precursor'],
    isBookmarked: true,
  },
];

// 4. Listening Summary Stats (4 items)
export const LISTENING_STATS: StatItem[] = [
  {
    id: 'total-time',
    title: 'Total Listening Time',
    value: '18h 45m',
    subtitle: '+2.5h from last week',
    icon: Clock,
    accent: 'blue',
    change: '+14%',
  },
  {
    id: 'cases-listened',
    title: 'Cases Listened',
    value: '28',
    subtitle: 'Across 4 jurisdictions',
    icon: Headphones,
    accent: 'amber',
    change: '+4 new',
  },
  {
    id: 'bookmarks-count',
    title: 'Bookmarks',
    value: '36',
    subtitle: '12 with custom notes',
    icon: Bookmark,
    accent: 'purple',
    change: 'Organized',
  },
  {
    id: 'daily-average',
    title: 'Daily Average',
    value: '42m',
    subtitle: 'Optimal research pace',
    icon: TrendingUp,
    accent: 'emerald',
    change: 'Top 10%',
  },
];

// 5. Constitutional Law Categories (6 categories)
export const CONSTITUTIONAL_CATEGORIES: CategoryItem[] = [
  {
    id: 'fundamental-rights',
    title: 'Fundamental Rights',
    articleRange: 'Articles 12 – 35',
    caseCount: 4200,
    audioCount: 1150,
    icon: Shield,
    colorScheme: 'navy',
    description: 'Enforceable constitutional guarantees, fundamental liberties, and limits on state action.',
    keyPrinciples: [
      'Definition of State (Article 12) & Doctrine of Severability (Article 13)',
      'Right to Equality and Non-Arbitrariness (Articles 14–18)',
      'Six Freedoms and Reasonable Restrictions (Article 19)',
      'Protection of Life, Personal Liberty and Fair Procedure (Articles 20–22)',
      'Constitutional Remedies & Prerogative Writs (Article 32)',
    ],
    leadingCases: [
      'Kesavananda Bharati v. State of Kerala (1973)',
      'Maneka Gandhi v. Union of India (1978)',
      'Justice K.S. Puttaswamy v. Union of India (2017)',
      'Shreya Singhal v. Union of India (2015)',
    ],
  },
  {
    id: 'constitutional-amendments',
    title: 'Constitutional Amendments',
    articleRange: 'Article 368',
    caseCount: 840,
    audioCount: 290,
    icon: FileCode,
    colorScheme: 'amber',
    description: 'Parliamentary amending powers, basic structure doctrine, and constitutional validity rulings.',
    keyPrinciples: [
      'Constituent Power vs Ordinary Legislative Power',
      'Basic Structure Limitations and Inviolable Constitutional Identity',
      'Judicial Review of Constitutional Amendments',
      'Federalism and Special Majority Ratification Procedures',
    ],
    leadingCases: [
      'Shankari Prasad v. Union of India (1951)',
      'Sajjan Singh v. State of Rajasthan (1965)',
      'Golaknath v. State of Punjab (1967)',
      'Kesavananda Bharati v. State of Kerala (1973)',
      'Minerva Mills v. Union of India (1980)',
    ],
  },
  {
    id: 'right-to-privacy',
    title: 'Right to Privacy',
    articleRange: 'Article 21 (Puttaswamy Doctrine)',
    caseCount: 650,
    audioCount: 180,
    icon: EyeOff,
    colorScheme: 'purple',
    description: 'Informational privacy, bodily autonomy, surveillance limits, and digital rights.',
    keyPrinciples: [
      'Three-Fold Test: Legality, Legitimate State Aim, and Proportionality',
      'Informational Privacy and Digital Data Protection',
      'Bodily and Decisional Autonomy (Reproductive & Sexual Orientation Rights)',
      'Overruling of MP Sharma (1954) and Kharak Singh (1962)',
    ],
    leadingCases: [
      'Justice K.S. Puttaswamy v. Union of India (2017)',
      'Navtej Singh Johar v. Union of India (2018)',
      'Joseph Shine v. Union of India (2018)',
      'Aadhaar Judgment (2018)',
    ],
  },
  {
    id: 'freedom-of-speech',
    title: 'Freedom of Speech',
    articleRange: 'Article 19(1)(a) & 19(2)',
    caseCount: 1320,
    audioCount: 410,
    icon: MessageSquare,
    colorScheme: 'blue',
    description: 'Press freedom, digital dissent, censorship limits, and reasonable restrictions.',
    keyPrinciples: [
      'Threshold of Incitement vs Mere Advocacy or Discussion',
      'Prohibition of Pre-Censorship & Press Autonomy',
      'Chilling Effect and Unconstitutional Vagueness in Speech Laws',
      'Exhaustive Grounds of Restriction under Article 19(2)',
    ],
    leadingCases: [
      'Romesh Thappar v. State of Madras (1950)',
      'Indian Express Newspapers v. Union of India (1985)',
      'Shreya Singhal v. Union of India (2015)',
      'Anuradha Bhasin v. Union of India (2020)',
    ],
  },
  {
    id: 'equality',
    title: 'Equality & Non-Discrimination',
    articleRange: 'Articles 14 – 18',
    caseCount: 2100,
    audioCount: 680,
    icon: Scale,
    colorScheme: 'indigo',
    description: 'Manifest arbitrariness, affirmative action, substantive equality, and gender justice.',
    keyPrinciples: [
      'Old Doctrine (Reasonable Classification) vs New Doctrine (Arbitrariness)',
      'Substantive Equality vs Formal Equality',
      'Special Provisions for Women, Children, and Backward Classes (Articles 15 & 16)',
      'Shayara Bano Manifest Arbitrariness Standard',
    ],
    leadingCases: [
      'EP Royappa v. State of Tamil Nadu (1974)',
      'Indra Sawhney v. Union of India (1992)',
      'Shayara Bano v. Union of India (Triple Talaq, 2017)',
      'Sabarimala Temple Case (2018)',
    ],
  },
  {
    id: 'judicial-review',
    title: 'Judicial Review & Writs',
    articleRange: 'Articles 32 & 226',
    caseCount: 3100,
    audioCount: 890,
    icon: Gavel,
    colorScheme: 'emerald',
    description: 'Prerogative writ jurisdiction, PIL locus standi, and fundamental constitutional remedies.',
    keyPrinciples: [
      'Heart and Soul of the Constitution (Dr. B.R. Ambedkar)',
      'Five Prerogative Writs: Habeas Corpus, Mandamus, Prohibition, Quo Warranto, Certiorari',
      'Epistolary Jurisdiction & Public Interest Litigation (PIL)',
      'Judicial Review as an Inviolable Basic Structure Element',
    ],
    leadingCases: [
      'AK Gopalan v. State of Madras (1950)',
      'ADM Jabalpur v. Shivkant Shukla (1976 - Overruled)',
      'SP Gupta v. Union of India (Judges Transfer Case, 1981)',
      'L. Chandra Kumar v. Union of India (1997)',
    ],
  },
];

// 6. Recommended for You (3 cases)
export const RECOMMENDED_CASES: PrecedentCase[] = [
  {
    id: 'maneka-gandhi-rec',
    name: 'Maneka Gandhi v. Union of India',
    citation: '(1978) 1 SCC 248 | AIR 1978 SC 597',
    year: 1978,
    court: 'Supreme Court of India',
    judgmentDate: '25 January 1978',
    benchSize: '7-Judge Constitutional Bench',
    coram: ['Chief Justice M.H. Beg', 'Justice P.N. Bhagwati', 'Justice V.R. Krishna Iyer'],
    leadJudge: 'Justice P.N. Bhagwati',
    doctrine: 'Golden Triangle (Articles 14, 19, 21) & Natural Justice',
    articleReference: 'Article 21 • Personal Liberty',
    duration: '12:10',
    matchScore: 98,
    summary:
      'Fundamental landmark expanding the scope of Article 21 from mechanical procedure to substantive fairness, justice, and non-arbitrariness.',
    ratioDecidendi:
      'The law depriving liberty must pass the triple test of Articles 14, 19, and 21. Natural justice principles must be read into statutory enactments unless expressly excluded.',
    facts:
      'The petitioner\'s passport was impounded by the passport authorities under Section 10(3)(c) without granting any pre-decisional hearing or reasons.',
    petitionerArguments: [
      'The right to travel abroad is an integral component of personal liberty under Article 21.',
      'The impoundment order violated Audi Alteram Partem and was arbitrary under Article 14.',
    ],
    respondentArguments: [
      'Article 21 requires only a prescribed statutory procedure, which was enacted by Parliament.',
    ],
    keyExcerpts: [
      '"The principle of reasonableness pervades the entire constitutional structure like a brooding omnipresence." — Justice P.N. Bhagwati',
    ],
    impact:
      'Introduced modern substantive due process in India and catalyzed decades of human rights jurisprudence.',
    audioNarrationText:
      'Maneka Gandhi versus Union of India, 1978. A seven-judge bench of the Supreme Court held that the right to travel abroad is part of personal liberty under Article 21. Justice Bhagwati established that no person can be deprived of liberty without a fair, just, and reasonable procedure that honors natural justice.',
    tags: ['Article 21', 'Due Process', 'Golden Triangle', '7-Judge Bench'],
    category: 'Fundamental Rights',
  },
  {
    id: 'puttaswamy-rec',
    name: 'Justice K.S. Puttaswamy v. Union of India',
    citation: '(2017) 10 SCC 1 | 2017 INSC 752',
    year: 2017,
    court: 'Supreme Court of India',
    judgmentDate: '24 August 2017',
    benchSize: '9-Judge Constitutional Bench',
    coram: [
      'Chief Justice J.S. Khehar',
      'Justice J. Chelameswar',
      'Justice S.A. Bobde',
      'Justice R.K. Agrawal',
      'Justice Rohinton F. Nariman',
      'Justice A.M. Sapre',
      'Justice D.Y. Chandrachud',
      'Justice Sanjay Kishan Kaul',
      'Justice S. Abdul Nazeer',
    ],
    leadJudge: 'Justice D.Y. Chandrachud & Justice R.F. Nariman',
    doctrine: 'Fundamental Right to Privacy & Proportionality Standard',
    articleReference: 'Article 21, Part III & Human Dignity',
    duration: '18:40',
    matchScore: 95,
    summary:
      'Unanimous 9-Judge Bench overruling MP Sharma and Kharak Singh to declare privacy a fundamental right intrinsic to life, liberty, and human dignity under Article 21.',
    ratioDecidendi:
      'Privacy is a natural and foundational human right that inheres in every individual. Any state infringement must satisfy the three-fold proportionality test: Legality, Legitimate State Aim, and Proportionality.',
    facts:
      'Retired High Court Judge K.S. Puttaswamy challenged the mandatory biometric Aadhaar scheme, arguing it created mass government surveillance without data protection.',
    petitionerArguments: [
      'Privacy is essential for individual freedom, bodily autonomy, sexual orientation, and data confidentiality.',
      'Earlier rulings in MP Sharma and Kharak Singh denying privacy were outdated and inconsistent with modern fundamental rights jurisprudence.',
    ],
    respondentArguments: [
      'The Constitution framers intentionally omitted a general right to privacy.',
      'Socio-economic welfare benefits delivery via Aadhaar outweighed individual privacy claims.',
    ],
    keyExcerpts: [
      '"Privacy is the ultimate guarantee against state intrusion into personal life, thought, and intimate human choice." — Justice D.Y. Chandrachud',
    ],
    impact:
      'Laid down the foundation for the Digital Personal Data Protection Act, struck down Section 377 IPC (decriminalizing homosexuality), and struck down Section 497 IPC (adultery).',
    audioNarrationText:
      'Justice K. S. Puttaswamy versus Union of India, August 24, 2017. A unanimous nine-judge Constitutional Bench ruled that the Right to Privacy is a protected Fundamental Right under Article 21. The Court established that state surveillance and data collection must satisfy the strict tests of legality, state necessity, and proportionality.',
    tags: ['Privacy', 'Aadhaar Precedent', '9-Judge Bench', 'Article 21', 'Human Dignity'],
    category: 'Right to Privacy',
  },
  {
    id: 'golaknath-rec',
    name: 'Golaknath v. State of Punjab',
    citation: '(1967) 2 SCR 762 | AIR 1967 SC 1643',
    year: 1967,
    court: 'Supreme Court of India',
    judgmentDate: '27 February 1967',
    benchSize: '11-Judge Constitutional Bench',
    coram: ['Chief Justice K. Subba Rao', 'Justice M. Hidayatullah', 'Justice J.C. Shah', 'Justice S.M. Sikri'],
    leadJudge: 'Chief Justice K. Subba Rao',
    doctrine: 'Prospective Overruling & Sanctity of Fundamental Rights',
    articleReference: 'Articles 13(2) & 368',
    duration: '15:20',
    matchScore: 92,
    summary:
      'Historic 11-Judge Bench holding by a 6:5 majority that Parliament had no power to abridge or take away any Fundamental Right through constitutional amendments under Article 368.',
    ratioDecidendi:
      'An amendment under Article 368 is "law" within the meaning of Article 13(2). Therefore, if a constitutional amendment violates Part III, it is void.',
    facts:
      'The family of Henry and William Golaknath held over 500 acres of land in Jalandhar. Under the Punjab Security of Land Tenures Act, the state declared that they could hold only thirty acres each, prompting a constitutional challenge.',
    petitionerArguments: [
      'Fundamental Rights are transcendental and sacrosanct; Parliament cannot amend Part III using Article 368.',
    ],
    respondentArguments: [
      'Constituent power of Parliament under Article 368 is sovereign and unconstrained by Article 13.',
    ],
    keyExcerpts: [
      '"Fundamental rights are given a transcendental position under our Constitution and are kept beyond the reach of Parliament." — Chief Justice K. Subba Rao',
    ],
    impact:
      'Directly led to the 24th Amendment by Parliament, which culminated in the landmark Kesavananda Bharati verdict of 1973.',
    audioNarrationText:
      'Golaknath versus State of Punjab, delivered on February 27, 1967, by an eleven-judge bench. Chief Justice Subba Rao held by a six to five majority that Parliament had no power to abridge Fundamental Rights, as constitutional amendments constitute law under Article 13(2). This ruling set the stage for Kesavananda Bharati in 1973.',
    tags: ['Article 368', '11-Judge Bench', 'Fundamental Rights', 'Landmark Precedent'],
    category: 'Constitutional Amendments',
  },
];

// All searchable / clickable cases index
export const ALL_CASES: PrecedentCase[] = [
  CONTINUE_LISTENING_CASE,
  ...RECENTLY_ADDED_CASES,
  ...BOOKMARKED_CASES.filter((c) => c.id !== CONTINUE_LISTENING_CASE.id),
  ...RECOMMENDED_CASES.filter(
    (c) =>
      !BOOKMARKED_CASES.some((b) => b.name === c.name) &&
      !RECENTLY_ADDED_CASES.some((r) => r.name === c.name)
  ),
];

// 7. Recent Searches (5 search terms)
export const RECENT_SEARCHES: string[] = [
  'Kesavananda Bharati v. State of Kerala',
  'Right to Privacy',
  'Maneka Gandhi v. Union of India',
  'Article 21',
  'Habeas Corpus',
];
