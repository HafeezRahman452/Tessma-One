import React, { useState } from 'react';
import {
  LayoutDashboard,
  Landmark,
  TrendingUp,
  FolderKanban,
  Users,
  FileText,
  ShieldCheck,
  ShoppingCart,
  HardDrive,
  Headphones,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeItem?: string;
  onSelectItem?: (item: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeItem = 'Overview',
  onSelectItem,
}) => {
  const [dashboardExpanded, setDashboardExpanded] = useState(true);

  const menuItems = [
    { id: 'Finance', label: 'Finance', icon: Landmark },
    { id: 'Sales & CRM', label: 'Sales & CRM', icon: TrendingUp },
    { id: 'Projects', label: 'Projects', icon: FolderKanban },
    { id: 'HR', label: 'HR', icon: Users },
    { id: 'Contracts', label: 'Contracts', icon: FileText },
    { id: 'Compliance', label: 'Compliance', icon: ShieldCheck },
    { id: 'Procurement', label: 'Procurement', icon: ShoppingCart },
    { id: 'IT & Assets', label: 'IT & Assets', icon: HardDrive },
    { id: 'Service & Support', label: 'Service & Support', icon: Headphones },
    { id: 'Reports', label: 'Reports', icon: BarChart3 },
    { id: 'Settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-[240px] bg-[#081726] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-r border-[#132438] lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-[#14263b]">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            {/* Logo icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4b2] via-[#00a896] to-[#028090] flex items-center justify-center shadow-lg shadow-teal-500/20">
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-white rounded-xs" />
                <div className="bg-white/80 rounded-xs" />
                <div className="bg-white/80 rounded-xs" />
                <div className="bg-white rounded-xs" />
              </div>
            </div>
            {/* Logo Text */}
            <div className="leading-tight">
              <div className="text-white font-black tracking-widest text-[15px] font-sans">
                TESSMA
              </div>
              <div className="text-[#00d4b2] text-[10px] font-bold tracking-[0.25em] -mt-0.5">
                ONE
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Close Sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Area */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 text-[13px] font-medium custom-sidebar-scroll">
          {/* Dashboard Accordion */}
          <div>
            <button
              onClick={() => setDashboardExpanded(!dashboardExpanded)}
              className="w-full flex items-center justify-between px-2.5 py-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#122336] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard size={17} className="text-[#00d4b2]" />
                <span className="font-semibold text-white">Dashboard</span>
              </div>
              <ChevronDown
                size={15}
                className={`text-slate-400 transition-transform duration-200 ${
                  dashboardExpanded ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </button>

            {dashboardExpanded && (
              <div className="mt-1 space-y-0.5 pl-3">
                {/* Overview (Active) */}
                <button
                  onClick={() => onSelectItem?.('Overview')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-all ${
                    activeItem === 'Overview'
                      ? 'bg-[#0e3b48] text-white font-medium shadow-xs shadow-teal-900/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f2236]'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      activeItem === 'Overview' ? 'bg-[#00d4b2]' : 'bg-slate-500'
                    }`}
                  />
                  <span>Overview</span>
                </button>

                {/* My tasks */}
                <button
                  onClick={() => onSelectItem?.('My tasks')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-all ${
                    activeItem === 'My tasks'
                      ? 'bg-[#0e3b48] text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f2236]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>My tasks</span>
                </button>

                {/* Approvals */}
                <button
                  onClick={() => onSelectItem?.('Approvals')}
                  className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-left transition-all ${
                    activeItem === 'Approvals'
                      ? 'bg-[#0e3b48] text-white font-medium'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#0f2236]'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Approvals</span>
                </button>
              </div>
            )}
          </div>

          {/* Module Links */}
          <div className="pt-1 space-y-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectItem?.(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-left transition-colors ${
                    isSelected
                      ? 'bg-[#0e3b48] text-white'
                      : 'text-slate-300 hover:text-white hover:bg-[#102236]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon size={17} className="text-slate-400 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-slate-500 shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-3 border-t border-[#132438] bg-[#071421]">
          <div className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-[#112338] transition-colors cursor-pointer group">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#1b2e47] border border-[#2b4468] text-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                AP
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-white text-xs font-semibold truncate">
                  Ada Preview
                </div>
                <div className="text-slate-400 text-[11px] truncate">
                  Tenant Administrator
                </div>
              </div>
            </div>
            <Settings
              size={15}
              className="text-slate-400 group-hover:text-white shrink-0 ml-1"
            />
          </div>
        </div>
      </aside>
    </>
  );
};
