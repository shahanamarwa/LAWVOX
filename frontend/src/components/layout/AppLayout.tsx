'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { DashboardView } from '../dashboard/DashboardView';
import { SearchCasesView } from '../views/SearchCasesView';
import { LibraryView } from '../views/LibraryView';
import { BookmarksView } from '../views/BookmarksView';
import { ListeningHistoryView } from '../views/ListeningHistoryView';
import { NotesView } from '../views/NotesView';
import { ProfileView } from '../views/ProfileView';
import { SettingsView } from '../views/SettingsView';
import { AudioPlayerDock } from '../audio/AudioPlayerDock';
import { AudioPlayerProvider, useAudioPlayer } from '../../context/AudioPlayerContext';
import { CaseDetailsModal } from '../modals/CaseDetailsModal';
import { NavItemId } from '../../types/navigation';
import { PrecedentCase } from '../../types/dashboard';
import { MAIN_NAV_ITEMS, SYSTEM_NAV_ITEMS } from '../../data/navigation';

interface AppLayoutProps {
  children?: React.ReactNode;
}

const AppLayoutInner: React.FC<AppLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { currentCase } = useAudioPlayer();
  const [activeItem, setActiveItem] = useState<NavItemId>('dashboard');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCaseDetailsOpen, setIsCaseDetailsOpen] = useState(false);
  const [modalCase, setModalCase] = useState<PrecedentCase | null>(null);

  const allItems = [...MAIN_NAV_ITEMS, ...SYSTEM_NAV_ITEMS];

  // Sync active state from URL pathname
  useEffect(() => {
    if (!pathname) return;
    const cleanPath = pathname.toLowerCase();

    if (cleanPath.includes('search')) {
      setActiveItem('search-cases');
    } else if (cleanPath.includes('library')) {
      setActiveItem('library');
    } else if (cleanPath.includes('bookmark')) {
      setActiveItem('bookmarks');
    } else if (cleanPath.includes('history') || cleanPath.includes('listening')) {
      setActiveItem('listening-history');
    } else if (cleanPath.includes('note')) {
      setActiveItem('my-notes');
    } else if (cleanPath.includes('profile')) {
      setActiveItem('profile');
    } else if (cleanPath.includes('setting')) {
      setActiveItem('settings');
    } else if (cleanPath.includes('logout')) {
      setActiveItem('logout');
    } else {
      setActiveItem('dashboard');
    }
  }, [pathname]);

  const currentItem = allItems.find((item) => item.id === activeItem) || allItems[0];

  const handleNavigate = (itemId: NavItemId) => {
    setActiveItem(itemId);
    const targetItem = allItems.find((item) => item.id === itemId);
    if (targetItem && router) {
      router.push(targetItem.href);
    }
  };

  const handleOpenCaseModal = (caseItem: PrecedentCase) => {
    setModalCase(caseItem);
    setIsCaseDetailsOpen(true);
  };

  const renderContent = () => {
    if (children) return children;

    switch (activeItem) {
      case 'dashboard':
        return <DashboardView />;
      case 'search-cases':
        return <SearchCasesView onSelectCase={handleOpenCaseModal} />;
      case 'library':
        return <LibraryView onSelectCase={handleOpenCaseModal} />;
      case 'bookmarks':
        return <BookmarksView onSelectCase={handleOpenCaseModal} />;
      case 'listening-history':
        return <ListeningHistoryView onSelectCase={handleOpenCaseModal} />;
      case 'my-notes':
        return <NotesView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsView />;
      case 'logout':
        return <DashboardView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans antialiased selection:bg-purple-500/20 selection:text-purple-900 pb-20 sm:pb-16">
      {/* Desktop Left Sidebar Navigation */}
      <Sidebar
        activeItem={activeItem}
        onNavigate={handleNavigate}
        className="hidden lg:flex"
      />

      {/* Responsive Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        activeItem={activeItem}
        onNavigate={handleNavigate}
      />

      {/* Main Column (Top Header + Content Area) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          activeItem={activeItem}
          activeItemLabel={currentItem.label}
          onOpenMobileNav={() => setIsMobileNavOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col" id="main-content">
          {renderContent()}
        </main>
      </div>

      {/* Persistent Audio Player Dock at the Bottom */}
      <AudioPlayerDock
        onOpenCaseDetails={() => {
          if (currentCase) {
            setModalCase(currentCase);
            setIsCaseDetailsOpen(true);
          }
        }}
      />

      {/* Modal opened from Audio Player Dock or Case Cards */}
      <CaseDetailsModal
        caseItem={modalCase || currentCase}
        isOpen={isCaseDetailsOpen}
        onClose={() => setIsCaseDetailsOpen(false)}
      />
    </div>
  );
};

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <AudioPlayerProvider>
      <AppLayoutInner>{children}</AppLayoutInner>
    </AudioPlayerProvider>
  );
};
