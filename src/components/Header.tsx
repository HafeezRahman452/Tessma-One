import React from 'react';
import { Search, Sparkles, Bell, HelpCircle, Menu } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onOpenSearch: () => void;
  onOpenAI: () => void;
  onOpenNotifications: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  notificationCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenSearch,
  onOpenAI,
  onOpenNotifications,
  searchQuery,
  setSearchQuery,
  notificationCount = 5,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200/90 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      {/* Left Area: Mobile hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="hover:text-slate-800 cursor-pointer">Dashboard</span>
          <span className="text-slate-400">›</span>
          <span className="text-slate-800 font-semibold">Overview</span>
        </div>
      </div>

      {/* Middle: Search Across All Modules */}
      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div
          onClick={onOpenSearch}
          className="relative flex items-center w-full bg-[#f8fafc] hover:bg-slate-100/80 border border-slate-200 rounded-lg px-3 py-1.5 transition-all shadow-xs cursor-pointer group"
        >
          <Search size={15} className="text-slate-400 group-hover:text-slate-600 mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search across all modules..."
            className="w-full bg-transparent text-xs text-slate-700 placeholder-slate-400 focus:outline-hidden"
          />
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 bg-white border border-slate-200 rounded shadow-2xs">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Area: Ask AI, Notifications, Help, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Ask TESSMA AI Button */}
        <button
          onClick={onOpenAI}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a4855] hover:bg-[#073943] text-white text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer"
        >
          <Sparkles size={14} className="text-[#00d4b2]" />
          <span className="hidden sm:inline">Ask TESSMA AI</span>
          <span className="sm:hidden">AI</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={onOpenNotifications}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {notificationCount > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#ef4444] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Help Circle */}
        <button
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors hidden sm:flex"
          aria-label="Help & Documentation"
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </button>

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* User Badge: John Doe */}
        <div className="flex items-center gap-2.5 pl-1 cursor-pointer select-none">
          <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white font-bold text-xs flex items-center justify-center shadow-xs">
            JD
          </div>
          <div className="hidden lg:block leading-tight text-left">
            <div className="text-xs font-bold text-slate-800">John Doe</div>
            <div className="text-[11px] text-slate-500">Managing Director</div>
          </div>
        </div>
      </div>
    </header>
  );
};
