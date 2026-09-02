# LAWVOX Frontend Documentation

## 1. Frontend Overview

LAWVOX is a Legal AudioBook web and mobile application frontend designed
for lawyers, law students, and legal researchers.

The frontend provides a clean interface for searching legal cases,
viewing case information, listening to legal content, managing
bookmarks, checking listening history, maintaining a personal library,
writing notes, and managing user settings.

The frontend should follow the provided LAWVOX UI reference.

### Design Requirement

**LAWVOX must use Light Mode only.**

Do not implement dark mode in the current version.

The visual design should use:

-   Light/white main backgrounds
-   Dark navy sidebar/navigation
-   Purple primary buttons and active states
-   Soft lavender highlight sections
-   White cards
-   Light grey borders
-   Rounded corners
-   Subtle shadows
-   Dark readable text
-   Purple legal/audio icons

------------------------------------------------------------------------

# 2. Frontend Goals

The frontend should:

1.  Provide a professional legal-tech interface.
2.  Make legal case searching simple.
3.  Make long legal content easy to consume through audio.
4.  Provide clear audio controls.
5.  Allow users to continue previously started listening sessions.
6.  Provide easy access to bookmarks and saved cases.
7.  Display listening history and statistics.
8.  Provide a personal library.
9.  Support notes related to legal cases.
10. Provide responsive web and mobile layouts.
11. Maintain a consistent LAWVOX visual identity.

------------------------------------------------------------------------

# 3. Target Frontend Users

### Lawyers

The interface should help lawyers quickly search cases, listen to
judgments, bookmark important sections, and resume unfinished audio.

### Law Students

The interface should support case revision, legal learning, bookmarking,
notes, and audio-based study.

### Legal Researchers

The interface should support searching, organizing, saving, and
revisiting legal content.

------------------------------------------------------------------------

# 4. Frontend Technology

The frontend can be implemented using:

-   React
-   Next.js
-   HTML5
-   CSS3
-   JavaScript / TypeScript
-   Tailwind CSS or CSS Modules
-   Lucide React or another consistent icon library

### Recommended

Use:

**Next.js + TypeScript + Tailwind CSS**

This provides a good structure for building the LAWVOX responsive web
application.

------------------------------------------------------------------------

# 5. Frontend Structure

Recommended frontend structure:

``` text
frontend/
│
├── app/
│   ├── page.tsx
│   ├── login/
│   ├── dashboard/
│   ├── search/
│   ├── cases/
│   ├── library/
│   ├── bookmarks/
│   ├── history/
│   ├── downloads/
│   ├── notes/
│   ├── profile/
│   └── settings/
│
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── dashboard/
│   ├── search/
│   ├── cases/
│   ├── audio/
│   ├── library/
│   ├── bookmarks/
│   ├── history/
│   ├── notes/
│   └── common/
│
├── public/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── styles/
│
├── types/
│
├── data/
│
└── README.md
```

------------------------------------------------------------------------

# 6. Global Layout

The desktop application should use a two-part layout:

``` text
---------------------------------------------------------
| Sidebar |                  Main Content               |
|         |                                              |
|         | Header                                       |
|         |                                              |
|         | Page Content                                 |
|         |                                              |
---------------------------------------------------------
```

### Sidebar

The sidebar contains:

-   LAWVOX logo
-   Dashboard
-   Search Cases
-   Library
-   Bookmarks
-   Listening History
-   Downloads
-   My Notes
-   Profile
-   Settings

The active navigation item should use the purple accent.

### Main Content

The main content area contains:

-   Header
-   Page title
-   Search
-   Content cards
-   Tables/lists where required
-   Audio components
-   Action buttons

------------------------------------------------------------------------

# 7. LAWVOX Branding

The logo should appear consistently throughout the application.

### Brand Name

**LAWVOX**

### Subtitle

**Legal Audiobook App**

### Tagline

**Listen. Understand. Remember.**

### Supporting Message

**Legal Knowledge. Now in Audio.**

The branding should communicate:

-   Law
-   Audio
-   Knowledge
-   Professionalism
-   Accessibility

------------------------------------------------------------------------

# 8. Color System

Use a consistent light-mode color system.

### Primary Color

Purple should be used for:

-   Primary buttons
-   Active navigation
-   Play buttons
-   Progress indicators
-   Links
-   Important icons
-   Selected filters

### Background

Use:

-   White
-   Very light grey
-   Soft lavender

### Sidebar

Use a dark navy background.

### Text

Use:

-   Dark navy/black for headings
-   Dark grey for normal text
-   Medium grey for secondary text

### Borders

Use subtle light-grey borders.

Do not use excessive colors.

------------------------------------------------------------------------

# 9. Typography

Use a clean modern sans-serif font.

### Typography hierarchy

``` text
Page Title
    ↓
Section Heading
    ↓
Card Title
    ↓
Body Text
    ↓
Secondary Text
```

Headings should be bold and easy to scan.

Legal descriptions should use comfortable line spacing and readable font
sizes.

------------------------------------------------------------------------

# 10. Login Page

The login page is the first frontend screen.

### Layout

The page should contain:

-   LAWVOX logo
-   Legal Audiobook App subtitle
-   Illustration/icon
-   Login message
-   Google login button
-   Terms of Service
-   Privacy Policy

### Example

``` text
LAWVOX

Listen. Understand. Remember.

Sign in with your Google account

[ Continue with Google ]

By continuing, you agree to our
Terms of Service and Privacy Policy
```

The page should use a clean white/light background.

------------------------------------------------------------------------

# 11. Dashboard Page

The dashboard is the primary frontend screen after login.

### Header

The header should contain:

-   Personalized greeting
-   Welcome message
-   Global search
-   Notification icon
-   Profile image
-   User name
-   User role
-   Dropdown menu

Example:

``` text
Good morning, Advocate! 👋
Welcome back to LAWVOX

[ Search cases, judges, keywords... ] [🔔] [Profile]
```

------------------------------------------------------------------------

# 12. Dashboard Hero Section

The hero section should be visually prominent.

### Content

``` text
What would you
like to hear today?

Search any case, judgment,
legal term or topic and start listening.

[ Search for cases, judgments, courts, judges... ] [Search]
```

The hero section should include a legal illustration such as:

-   Scales of justice
-   Law books
-   Audio waveform
-   Headphones

Use a soft lavender background.

------------------------------------------------------------------------

# 13. Continue Listening Component

The Continue Listening card shows the user's unfinished audio.

### Information

-   Case image
-   Case title
-   Content type
-   Completion percentage
-   Progress bar
-   Current time
-   Total duration
-   Continue button
-   Bookmark button

Example:

``` text
Kesavananda Bharati
v. State of Kerala

Judgment • 63% Completed

████████████░░░

08:45 / 13:30

[▶ Continue Listening] [Bookmark]
```

------------------------------------------------------------------------

# 14. Recently Added Component

Display recently added cases as a list or card section.

Each case card should contain:

-   Case image
-   Case title
-   Citation
-   Date added
-   Play button

Example:

``` text
Shreya Singhal v. Union of India
(2015) 5 SCC 1

12 Aug 2026
```

------------------------------------------------------------------------

# 15. Your Bookmarks Component

Display important bookmarked cases or sections.

Each item should contain:

-   Bookmark icon
-   Case title
-   Chapter/section
-   Date
-   Quick play button

Example:

``` text
Kesavananda Bharati v. State of Kerala
Judgment – Pg. 45 (Part 3)
12 Aug 2026                         ▶
```

------------------------------------------------------------------------

# 16. Listening Summary Component

Display user listening statistics.

### Metrics

-   Total Listening Time
-   Cases Listened
-   Bookmarks
-   Daily Average

Example:

``` text
Total Listening Time
18h 45m

Cases Listened
28

Bookmarks
36

Daily Average
42m
```

Use small icons and clean statistic cards.

------------------------------------------------------------------------

# 17. Categories Section

Display legal categories as clickable cards.

### Categories

-   Constitutional Law
-   Criminal Law
-   Civil Law
-   Corporate Law
-   Tax Law
-   More Categories

Each category should have:

-   Icon
-   Category name
-   Hover state
-   Click interaction

------------------------------------------------------------------------

# 18. Recommended for You

Display recommended legal cases.

Each card should contain:

-   Case image
-   Case title
-   Year
-   Citation
-   Play button

Example:

``` text
Maneka Gandhi
v. Union of India

(1978) 1 SCC 248

[▶]
```

The frontend can initially use mock recommendations.

------------------------------------------------------------------------

# 19. Recent Searches

Display recently searched queries.

Each search item should contain:

-   Search icon
-   Search text
-   Relative date/time

Example:

``` text
⌕ Kesavananda Bharati v. State of Kerala     Today
⌕ Right to Privacy                            Yesterday
⌕ Maneka Gandhi v. Union of India             2 days ago
⌕ Article 21 of Constitution                   3 days ago
```

Include a **Clear All** action.

------------------------------------------------------------------------

# 20. Search Cases Page

The Search Cases page should provide a dedicated legal search
experience.

### Search Bar

``` text
[ Search by case name, keyword, judge, court... ] [Search]
```

### Filters

Provide:

-   All
-   Supreme Court
-   High Court
-   Year

Additional frontend filters can include:

-   Judge
-   Category
-   Date
-   Court

### Search Result Card

Each result should display:

-   Case title
-   Court
-   Year
-   Citation
-   Short description
-   Play button
-   Bookmark button

------------------------------------------------------------------------

# 21. Case Details Page

The Case Details page provides complete case information.

### Header

Include:

-   Back button
-   Case image
-   Case title
-   Citation
-   Court
-   Date
-   Share button
-   Bookmark button

### Tabs

Use:

``` text
About Case | Chapters
```

### About Case

Display a short case description.

### Chapters

Display chapter list with:

-   Chapter number
-   Chapter title
-   Duration
-   Play button

Example:

``` text
1. Introduction                  02:45
2. Facts of the Case             08:30
3. Issues                         06:40
4. Arguments                     12:15
5. Judgment                      15:20
6. Important Principles           05:10
```

------------------------------------------------------------------------

# 22. Audio Player

The audio player is a major frontend component.

It can appear as:

1.  Persistent bottom player on desktop.
2.  Dedicated full-screen/player page on mobile.

### Controls

-   Play
-   Pause
-   Previous
-   Next
-   15-second rewind
-   15-second forward
-   Volume
-   Progress slider
-   Playback speed
-   Chapters
-   Bookmark

### Desktop Player

The bottom player should contain:

``` text
[Case Image]
Case Title
Chapter
Current Time / Duration

[Speed] [↶15] [▶] [15↷] [Volume] [Progress]

[Chapters]
```

------------------------------------------------------------------------

# 23. Playback Speed UI

Provide a speed selector.

Example:

``` text
0.75x
1.0x
1.25x
1.5x
1.75x
2.0x
```

The selected speed should be visually highlighted.

------------------------------------------------------------------------

# 24. Chapter Navigation

The chapter interface should allow users to jump directly to a specific
section.

Example:

``` text
Chapters

▶ Introduction
   02:45

▶ Facts of the Case
   08:30

▶ Issues
   06:40

▶ Arguments
   12:15

▶ Judgment
   15:20

▶ Important Principles
   05:10
```

Clicking a chapter should update the audio player.

------------------------------------------------------------------------

# 25. Bookmarks Page

The Bookmarks page should provide access to saved content.

### Tabs

``` text
All | Cases | Chapters
```

### Bookmark Card

Display:

-   Case image
-   Case title
-   Chapter
-   Date
-   Bookmark icon
-   Play button

Provide search/filter functionality.

------------------------------------------------------------------------

# 26. Library Page

The Library page should organize personal content.

### Tabs

``` text
Saved Cases | Downloaded | Notes
```

### Saved Cases

Show all saved cases.

### Downloaded

Show downloaded/available offline content.

### Notes

Show cases with personal notes.

Each item should have clear actions.

------------------------------------------------------------------------

# 27. Listening History Page

The history page should display previously listened content.

Each item should include:

-   Case image
-   Case title
-   Content type
-   Completion percentage
-   Progress bar
-   Last listened date
-   Continue button

Example:

``` text
Kesavananda Bharati v. State of Kerala
Judgment • 63% Completed
Listened on 12 Aug 2026
████████████░░
```

------------------------------------------------------------------------

# 28. Downloads Page

The Downloads page should display locally available permitted audio
content.

Each item can show:

-   Case title
-   Chapter
-   Download status
-   File size
-   Play button
-   Delete/download management action

Possible states:

``` text
Downloaded
Downloading
Paused
Failed
```

------------------------------------------------------------------------

# 29. My Notes Page

The Notes page should provide a clean note-taking interface.

### Notes List

Each note should display:

-   Case title
-   Chapter
-   Note preview
-   Timestamp
-   Date
-   Edit
-   Delete

### Note Editor

``` text
Case
Chapter
Timestamp

[ Write your note here... ]

[Save Note]
```

------------------------------------------------------------------------

# 30. Profile Page

The Profile page should contain:

-   Profile image
-   User name
-   Role
-   Email
-   Edit Profile button

Example:

``` text
Aarav Sharma
Lawyer
aarav.sharma@gmail.com

[ Edit Profile ]
```

The frontend should use the authenticated user's information in the
actual application.

------------------------------------------------------------------------

# 31. Settings Page

Settings should contain separate sections.

### Profile

-   Edit Profile

### Playback

-   Default speed
-   Auto-play
-   Audio preferences

### Notifications

-   New case notifications
-   Listening reminders
-   Recommendations

### Language

-   Language selection

### About

-   About LAWVOX
-   Terms of Service
-   Privacy Policy

### Account

-   Logout

------------------------------------------------------------------------

# 32. Mobile Frontend

The mobile design should be responsive and optimized for touch.

### Bottom Navigation

Use:

``` text
Home
Search
Library
Bookmarks
Profile
```

### Mobile Dashboard

The dashboard should contain:

1.  Header
2.  Search
3.  Continue Listening
4.  Bookmarks
5.  Recently Added
6.  Recommended Cases
7.  Audio player

Use a single-column layout.

------------------------------------------------------------------------

# 33. Responsive Breakpoints

The frontend should support:

### Mobile

Approximately:

``` text
320px – 767px
```

### Tablet

Approximately:

``` text
768px – 1023px
```

### Desktop

Approximately:

``` text
1024px+
```

The layout should adapt automatically.

------------------------------------------------------------------------

# 34. Reusable Components

Create reusable components instead of duplicating UI.

Recommended components:

``` text
Navbar
Sidebar
MobileBottomNav
SearchBar
CaseCard
CaseList
CaseImage
BookmarkButton
PlayButton
ProgressBar
AudioPlayer
ChapterList
ChapterItem
StatCard
CategoryCard
RecommendationCard
RecentSearchItem
ProfileMenu
NotificationButton
Modal
Toast
LoadingSpinner
EmptyState
```

------------------------------------------------------------------------

# 35. Frontend State Management

The frontend should maintain state for:

-   Logged-in user
-   Current route
-   Search query
-   Search filters
-   Selected case
-   Current chapter
-   Audio playing/paused state
-   Current playback position
-   Playback speed
-   Volume
-   Bookmarks
-   Listening history
-   Saved cases
-   Notes
-   Downloads

For the first prototype, local/mock state can be used.

------------------------------------------------------------------------

# 36. Frontend Mock Data

Before connecting a backend, use mock data.

Example case object:

``` javascript
{
  id: "case-001",
  title: "Kesavananda Bharati v. State of Kerala",
  citation: "(1973) 4 SCC 225",
  court: "Supreme Court of India",
  year: 1973,
  category: "Constitutional Law",
  description: "A landmark constitutional judgment.",
  duration: "13:30",
  progress: 63
}
```

The UI should be built so mock data can later be replaced by API data
without redesigning the components.

------------------------------------------------------------------------

# 37. Frontend Interactions

The following interactions should work in the prototype.

### Sidebar

Clicking a sidebar item should navigate to its page.

### Search

Typing a query and selecting Search should display matching mock cases.

### Case Card

Clicking a case should open Case Details.

### Play

Clicking Play should update the audio player state.

### Continue Listening

Clicking Continue should open the player and restore the mock progress.

### Bookmark

Clicking Bookmark should toggle the bookmark state.

### Chapters

Clicking a chapter should update the current chapter.

### Playback Speed

Changing speed should update the visible speed value.

### Profile

Clicking the profile should open profile/account options.

------------------------------------------------------------------------

# 38. Loading States

Every page that expects data should have a loading state.

Example:

``` text
Loading cases...
```

Use skeleton cards where appropriate.

Avoid blank screens while content is loading.

------------------------------------------------------------------------

# 39. Empty States

Create friendly empty states.

### No Bookmarks

``` text
No bookmarks yet.

Save important cases or chapters
to find them here later.

[ Explore Cases ]
```

### No Listening History

``` text
No listening history yet.

Start listening to a legal case
to see your history here.
```

### No Search Results

``` text
No cases found.

Try another case name,
keyword, judge, or court.
```

------------------------------------------------------------------------

# 40. Error States

Provide clear messages when an action fails.

Example:

``` text
Something went wrong.

We couldn't load the cases.

[ Try Again ]
```

Error messages should be short and understandable.

------------------------------------------------------------------------

# 41. Accessibility

The frontend should follow basic accessibility practices.

Requirements:

-   Use readable font sizes.
-   Maintain sufficient text/background contrast.
-   Provide labels for icon buttons.
-   Make buttons keyboard accessible.
-   Use meaningful HTML elements.
-   Provide alt text for images.
-   Do not rely only on color to communicate status.
-   Provide visible focus states.
-   Make audio controls accessible.

------------------------------------------------------------------------

# 42. UI Consistency

All pages should maintain:

-   Same sidebar
-   Same header structure
-   Same button style
-   Same card radius
-   Same typography
-   Same spacing system
-   Same purple accent
-   Same icon style

Avoid creating unrelated styles for individual pages.

------------------------------------------------------------------------

# 43. Light Mode Requirement

This is a mandatory frontend requirement.

### Required

``` text
Light Mode
White Background
Dark Navy Sidebar
Purple Accent
Lavender Highlight
White Cards
Dark Text
Light Borders
```

### Not Required

``` text
Dark Mode
Dark Cards
Dark Background
Theme Toggle
```

Do not add a dark-mode toggle to the current frontend.

------------------------------------------------------------------------

# 44. Frontend Development Order

Build the frontend in this order:

### Phase 1 -- Foundation

1.  Set up React/Next.js.
2.  Configure styling.
3.  Create global layout.
4.  Create LAWVOX branding.
5.  Create light-mode color system.

### Phase 2 -- Navigation

6.  Create sidebar.
7.  Create mobile bottom navigation.
8.  Create header.
9.  Configure routing.

### Phase 3 -- Main Screens

10. Login page.
11. Dashboard.
12. Search page.
13. Case details.
14. Audio player.

### Phase 4 -- User Features

15. Library.
16. Bookmarks.
17. Listening history.
18. Downloads.
19. Notes.
20. Profile.
21. Settings.

### Phase 5 -- Responsive Design

22. Mobile layout.
23. Tablet layout.
24. Desktop layout.

### Phase 6 -- Polish

25. Loading states.
26. Empty states.
27. Error states.
28. Accessibility.
29. Animation/micro-interactions.
30. Final visual testing.

------------------------------------------------------------------------

# 45. Antigravity Prompt / Implementation Specification

Use this documentation as the frontend specification when building
LAWVOX in Antigravity.

### Antigravity Instructions

Build a responsive **LAWVOX Legal Audiobook frontend** based on the
provided LAWVOX dashboard reference image.

The frontend is for lawyers, law students, and legal researchers.

Use a **professional LIGHT MODE design only**.

Match the visual direction of the reference:

-   Dark navy left sidebar
-   White/light main background
-   Purple primary accent
-   Soft lavender hero section
-   White rounded cards
-   Subtle shadows
-   Light borders
-   Modern typography
-   Legal-themed icons
-   Audio-themed visual elements

Do not implement dark mode.

Build these pages:

``` text
/login
/dashboard
/search
/cases/:id
/library
/bookmarks
/history
/downloads
/notes
/profile
/settings
```

Create reusable components for:

``` text
Sidebar
Header
SearchBar
CaseCard
ContinueListeningCard
BookmarkCard
StatCard
CategoryCard
RecommendationCard
AudioPlayer
ChapterList
ProfileMenu
MobileBottomNav
```

The dashboard must contain:

``` text
Greeting
Global Search
Hero Search Section
Continue Listening
Recently Added
Your Bookmarks
Listening Summary
Categories
Recommended for You
Recent Searches
Persistent Audio Player
```

Use mock data initially.

All major buttons must be interactive.

The Search page must support mock search and filtering.

The Case Details page must display case information and chapters.

The Audio Player must support:

``` text
Play/Pause
Progress
15-second Back
15-second Forward
Playback Speed
Volume
Chapter Selection
Bookmark
```

The frontend must be responsive for:

``` text
Mobile
Tablet
Desktop
```

Use clean component architecture and avoid duplicated UI code.

The final result should look like a polished production-ready legal
audiobook application rather than a simple static HTML mockup.

------------------------------------------------------------------------

# 46. Frontend Completion Checklist

-   [ ] LAWVOX logo and branding added
-   [ ] Light mode implemented
-   [ ] Dark mode excluded
-   [ ] Desktop sidebar created
-   [ ] Mobile bottom navigation created
-   [ ] Header created
-   [ ] Dashboard created
-   [ ] Hero search section created
-   [ ] Continue Listening created
-   [ ] Recently Added created
-   [ ] Bookmarks section created
-   [ ] Listening Summary created
-   [ ] Categories created
-   [ ] Recommended Cases created
-   [ ] Recent Searches created
-   [ ] Persistent Audio Player created
-   [ ] Login page created
-   [ ] Search page created
-   [ ] Case Details page created
-   [ ] Chapter list created
-   [ ] Audio Player page created
-   [ ] Library page created
-   [ ] Bookmarks page created
-   [ ] Listening History page created
-   [ ] Downloads page created
-   [ ] Notes page created
-   [ ] Profile page created
-   [ ] Settings page created
-   [ ] Mock data connected
-   [ ] Search interaction implemented
-   [ ] Bookmark interaction implemented
-   [ ] Audio controls implemented
-   [ ] Responsive design completed
-   [ ] Loading states added
-   [ ] Empty states added
-   [ ] Error states added
-   [ ] Accessibility checked
-   [ ] Final UI matches LAWVOX reference

------------------------------------------------------------------------

# 47. Final Frontend Description

LAWVOX frontend is a modern, responsive, light-mode legal audiobook
interface that allows users to discover legal cases, search judgments,
view case details, listen to legal content, manage playback, bookmark
important sections, save cases, review listening history, maintain
notes, and manage their personal library.

The frontend should prioritize:

**Clarity + Accessibility + Professional Legal Design + Audio
Usability + Responsive Experience**

### LAWVOX

**Listen. Understand. Remember.**

**Legal Knowledge. Now in Audio.**
