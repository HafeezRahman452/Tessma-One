import React from 'react';
import {
  ChevronRight,
  AlertTriangle,
  Clock,
  Zap,
  FileSpreadsheet,
  UserPlus,
  FolderPlus,
  UploadCloud,
  Headphones,
  FileSignature,
  FileCheck2,
  CheckCircle2,
  AtSign,
  GraduationCap,
  AlertCircle,
  FileText,
  ShieldAlert,
  CalendarClock,
  Ticket,
} from 'lucide-react';
import {
  MyWorkItem,
  NeedsAttentionItem,
  RecentActivityItem,
  QuickActionItem,
} from '../types/dashboard';

interface MiddleRowProps {
  myWork: MyWorkItem[];
  needsAttention: NeedsAttentionItem[];
  recentActivity: RecentActivityItem[];
  quickActions: QuickActionItem[];
  onActionClick: (actionId: string, title: string) => void;
  onViewAllClick: (section: string) => void;
}

export const MiddleRow: React.FC<MiddleRowProps> = ({
  myWork,
  needsAttention,
  recentActivity,
  quickActions,
  onActionClick,
  onViewAllClick,
}) => {
  const getWorkIcon = (index: number) => {
    switch (index) {
      case 0:
        return <FileCheck2 size={13} className="text-emerald-600" />;
      case 1:
        return <CheckCircle2 size={13} className="text-blue-600" />;
      case 2:
        return <AtSign size={13} className="text-amber-600" />;
      case 3:
        return <FileText size={13} className="text-orange-600" />;
      case 4:
        return <GraduationCap size={13} className="text-indigo-600" />;
      case 5:
        return <AlertCircle size={13} className="text-rose-600" />;
      default:
        return <FileCheck2 size={13} className="text-emerald-600" />;
    }
  };

  const getNeedsAttentionIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <AlertTriangle size={14} className="text-rose-500" />;
      case 'contract':
        return <AlertTriangle size={14} className="text-amber-500" />;
      case 'compliance':
        return <ShieldAlert size={14} className="text-purple-500" />;
      case 'project':
        return <CalendarClock size={14} className="text-amber-500" />;
      case 'ticket':
        return <Ticket size={14} className="text-blue-500" />;
      default:
        return <AlertTriangle size={14} className="text-amber-500" />;
    }
  };

  const getQuickActionIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileSpreadsheet':
        return <FileSpreadsheet size={18} />;
      case 'UserPlus':
        return <UserPlus size={18} />;
      case 'FolderPlus':
        return <FolderPlus size={18} />;
      case 'UploadCloud':
        return <UploadCloud size={18} />;
      case 'Headphones':
        return <Headphones size={18} />;
      case 'FileSignature':
        return <FileSignature size={18} />;
      default:
        return <FileSpreadsheet size={18} />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {/* 1. My Work Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-emerald-500 rounded-full inline-block" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                My Work
              </h3>
            </div>
            <button
              onClick={() => onViewAllClick('My Work')}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-900 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-1.5">
            {myWork.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => onViewAllClick(`Task: ${item.label}`)}
                className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border ${item.badgeBg}`}
                  >
                    {getWorkIcon(idx)}
                  </div>
                  <span className="text-xs font-bold text-slate-800 w-4 text-center">
                    {item.count}
                  </span>
                  <span className="text-xs text-slate-600 font-medium truncate group-hover:text-slate-900">
                    {item.label}
                  </span>
                </div>
                <ChevronRight
                  size={13}
                  className="text-slate-300 group-hover:text-slate-600 shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Needs Attention Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-rose-500 fill-rose-100" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Needs Attention
              </h3>
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                8
              </span>
            </div>
            <button
              onClick={() => onViewAllClick('Needs Attention')}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-900 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-2">
            {needsAttention.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewAllClick(`Alert: ${item.title}`)}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="shrink-0">{getNeedsAttentionIcon(item.iconType)}</div>
                  <span className="text-xs text-slate-700 font-medium truncate group-hover:text-slate-900">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${item.moduleColor}`}
                  >
                    {item.module}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                    {item.timeRemaining}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Recent Activity Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Clock size={15} className="text-slate-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Recent Activity
              </h3>
            </div>
            <button
              onClick={() => onViewAllClick('Recent Activity')}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-900 flex items-center gap-0.5 transition-colors cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="space-y-2">
            {recentActivity.map((item) => (
              <div
                key={item.id}
                onClick={() => onViewAllClick(`Activity: ${item.action}`)}
                className="flex items-center justify-between py-1 px-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 shadow-2xs ${item.userColor}`}
                  >
                    {item.userInitials}
                  </div>
                  <span className="text-xs text-slate-700 font-medium truncate group-hover:text-slate-900">
                    {item.action}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold border ${item.moduleColor}`}
                  >
                    {item.module}
                  </span>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    {item.timeAgo}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Quick Actions Card */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3.5">
            <Zap size={15} className="text-emerald-500 fill-emerald-500" />
            <h3 className="text-xs font-bold text-slate-900 tracking-tight">
              Quick Actions
            </h3>
          </div>

          {/* 2 x 3 Grid of action tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => onActionClick(action.id, action.title)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 group active:scale-97 cursor-pointer ${action.bgColor} ${action.borderColor}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-xs mb-2 transition-transform group-hover:scale-105 ${action.iconBg}`}
                >
                  {getQuickActionIcon(action.icon)}
                </div>
                <span
                  className={`text-[11px] font-semibold leading-tight line-clamp-2 ${action.textColor}`}
                >
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
