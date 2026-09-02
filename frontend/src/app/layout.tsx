import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LAWVOX — Constitutional Precedent Research & Legal Audio Platform',
  description:
    'Advanced constitutional precedent research, AI audio briefings, and synchronized case analysis for lawyers, judges, law students, and legal researchers.',
  keywords: [
    'Constitutional Law',
    'Legal Audio',
    'Precedent Research',
    'Supreme Court Citations',
    'Law Student Research',
    'Legal Case Briefs',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0F172A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full antialiased text-slate-900 bg-slate-50 selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
