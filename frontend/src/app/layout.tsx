import type { Metadata } from 'next';
import './globals.css';
import { AudioProvider } from '@/context/AudioContext';
import { ToastProvider } from '@/context/ToastContext';

export const metadata: Metadata = {
  title: 'LAWVOX — Constitutional Precedent & Legal Audio Platform',
  description: 'Research constitutional precedents and listen to important landmark judgments with high quality legal audio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-slate-50">
      <body className="min-h-screen text-slate-900 bg-slate-50 antialiased font-sans">
        <AudioProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AudioProvider>
      </body>
    </html>
  );
}
