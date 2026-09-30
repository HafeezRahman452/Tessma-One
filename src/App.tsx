/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calendar, ChevronDown, CheckCircle2 } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ExecutiveSnapshot } from './components/ExecutiveSnapshot';
import { MiddleRow } from './components/MiddleRow';
import { SnapshotsGrid } from './components/SnapshotsGrid';
import {
  QuickActionModal,
  SearchDialog,
  AIDrawer,
  NotificationsDrawer,
} from './components/Modals';
import {
  executiveMetrics,
  myWorkItems,
  needsAttentionItems,
  recentActivityItems,
  quickActionItems,
} from './data/dashboardData';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [dateRange, setDateRange] = useState('01 Apr 2025 - 30 Apr 2025');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  // Quick Action Modal state
  const [activeActionId, setActiveActionId] = useState<string | null>(null);
  const [activeActionTitle, setActiveActionTitle] = useState('');
  const [actionModalOpen, setActionModalOpen] = useState(false);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchDialogOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleQuickAction = (id: string, title: string) => {
    setActiveActionId(id);
    setActiveActionTitle(title);
    setActionModalOpen(true);
  };

  const handleActionSubmit = (data: any) => {
    showToast(`Action "${activeActionTitle}" was successfully submitted!`);
  };

  return (
    <div className="min-h-screen bg-[#f4f6f9] text-[#1e293b] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 text-xs animate-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 size={16} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Sidebar Navigation */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeItem={activeModule}
        onSelectItem={(item) => {
          setActiveModule(item);
          setSidebarOpen(false);
          if (item !== 'Overview') {
            showToast(`Navigated to ${item} module view.`);
          }
        }}
      />

      {/* Main Content Area (Offset for lg fixed sidebar) */}
      <div className="lg:pl-[240px] flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onOpenSearch={() => setSearchDialogOpen(true)}
          onOpenAI={() => setAiDrawerOpen(true)}
          onOpenNotifications={() => setNotificationsOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          notificationCount={5}
        />

        {/* Dashboard Main Container */}
        <main className="p-4 sm:p-6 lg:p-7 max-w-[1680px] w-full mx-auto">
          {/* Page Sub-Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Dashboard Overview
              </h1>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-0.5">
                A consolidated view of your business performance across all modules.
              </p>
            </div>

            {/* Date Range Picker Selector */}
            <div className="relative self-start sm:self-auto">
              <button
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs text-xs font-medium text-slate-700 transition-colors cursor-pointer"
              >
                <Calendar size={14} className="text-slate-400" />
                <span>{dateRange}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {dateDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1.5 text-xs animate-in fade-in-50">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Reporting Window
                  </div>
                  {[
                    '01 Apr 2025 - 30 Apr 2025',
                    '01 Jan 2025 - 31 Mar 2025',
                    '01 Nov 2024 - 30 Apr 2025',
                    'Last 30 Days',
                    'Fiscal Year 2025 to Date',
                  ].map((period) => (
                    <button
                      key={period}
                      onClick={() => {
                        setDateRange(period);
                        setDateDropdownOpen(false);
                        showToast(`Reporting window updated to: ${period}`);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs hover:bg-slate-50 transition-colors ${
                        dateRange === period
                          ? 'text-teal-700 font-semibold bg-teal-50/60'
                          : 'text-slate-700'
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Section 1: Executive Snapshot (6 KPI Metric Cards) */}
          <ExecutiveSnapshot metrics={executiveMetrics} />

          {/* Section 2: Middle Row (My Work, Needs Attention, Recent Activity, Quick Actions) */}
          <MiddleRow
            myWork={myWorkItems}
            needsAttention={needsAttentionItems}
            recentActivity={recentActivityItems}
            quickActions={quickActionItems}
            onActionClick={handleQuickAction}
            onViewAllClick={(section) => {
              showToast(`Expanded detailed view for ${section}`);
            }}
          />

          {/* Section 3: Bottom Row (8 Module Snapshot Analytical Cards) */}
          <SnapshotsGrid
            onItemClick={(insightText) => {
              setAiDrawerOpen(true);
            }}
          />
        </main>
      </div>

      {/* Interactive Modals & Drawers */}
      <QuickActionModal
        isOpen={actionModalOpen}
        actionId={activeActionId}
        actionTitle={activeActionTitle}
        onClose={() => setActionModalOpen(false)}
        onSubmit={handleActionSubmit}
      />

      <SearchDialog
        isOpen={searchDialogOpen}
        onClose={() => setSearchDialogOpen(false)}
        query={searchQuery}
        setQuery={setSearchQuery}
        onSelectResult={(item) => {
          showToast(`Opened: ${item}`);
        }}
      />

      <AIDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
      />

      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
    </div>
  );
}
