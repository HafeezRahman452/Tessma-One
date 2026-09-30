import React, { useState } from 'react';
import {
  Wallet,
  CreditCard,
  BarChart2,
  Users,
  FolderKanban,
  UserCheck,
  ChevronDown,
} from 'lucide-react';
import { MetricCardData } from '../types/dashboard';

interface ExecutiveSnapshotProps {
  metrics: MetricCardData[];
}

export const ExecutiveSnapshot: React.FC<ExecutiveSnapshotProps> = ({ metrics }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getCardIcon = (id: string) => {
    switch (id) {
      case 'revenue':
        return <Wallet size={18} className="text-[#10b981]" />;
      case 'expenses':
        return <CreditCard size={18} className="text-[#f43f5e]" />;
      case 'profit':
        return <BarChart2 size={18} className="text-[#3b82f6]" />;
      case 'customers':
        return <Users size={18} className="text-[#8b5cf6]" />;
      case 'projects':
        return <FolderKanban size={18} className="text-[#f97316]" />;
      case 'employees':
        return <UserCheck size={18} className="text-[#06b6d4]" />;
      default:
        return <Wallet size={18} className="text-[#10b981]" />;
    }
  };

  const getIconBackground = (id: string) => {
    switch (id) {
      case 'revenue':
        return 'bg-[#ecfdf5] border-emerald-100';
      case 'expenses':
        return 'bg-[#fff1f2] border-rose-100';
      case 'profit':
        return 'bg-[#eff6ff] border-blue-100';
      case 'customers':
        return 'bg-[#f5f3ff] border-purple-100';
      case 'projects':
        return 'bg-[#fff7ed] border-amber-100';
      case 'employees':
        return 'bg-[#ecfeff] border-cyan-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  const getStrokeColor = (scheme: string) => {
    switch (scheme) {
      case 'green':
        return '#10b981';
      case 'red':
        return '#f43f5e';
      case 'blue':
        return '#3b82f6';
      case 'purple':
        return '#8b5cf6';
      case 'orange':
        return '#f97316';
      case 'cyan':
        return '#06b6d4';
      default:
        return '#10b981';
    }
  };

  // Convert sparkline numbers into SVG cubic bezier path
  const renderSparkline = (points: number[], color: string, id: string) => {
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 30;

    const coordinates = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return { x, y };
    });

    let pathD = `M ${coordinates[0].x} ${coordinates[0].y}`;
    for (let i = 0; i < coordinates.length - 1; i++) {
      const p0 = coordinates[i === 0 ? i : i - 1];
      const p1 = coordinates[i];
      const p2 = coordinates[i + 1];
      const p3 = coordinates[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    const areaD = `${pathD} L ${width} ${height} L 0 ${height} Z`;

    return (
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-20 h-8 shrink-0 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.25" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${id})`} />
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="mb-6">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-[13px] font-bold text-slate-900 tracking-tight">
            Executive Snapshot
          </h2>
          <p className="text-[11px] text-slate-500 font-normal">
            Key business metrics across all modules
          </p>
        </div>

        {/* Time Period Filter */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 rounded-md shadow-2xs transition-colors"
          >
            <span>{selectedPeriod}</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-32 bg-white border border-slate-200 rounded-lg shadow-lg z-20 py-1 text-xs">
              {['This Month', 'Last Month', 'This Quarter', 'Year to Date'].map(
                (period) => (
                  <button
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] ${
                      selectedPeriod === period
                        ? 'text-teal-700 font-semibold bg-teal-50/50'
                        : 'text-slate-700'
                    }`}
                  >
                    {period}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {/* 6 Metric Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {metrics.map((item) => {
          const strokeColor = getStrokeColor(item.colorScheme);
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-xs transition-all duration-200 hover:border-slate-300 flex flex-col justify-between"
            >
              <div>
                {/* Icon & Label */}
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${getIconBackground(
                      item.id
                    )}`}
                  >
                    {getCardIcon(item.id)}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 truncate">
                    {item.title}
                  </span>
                </div>

                {/* Big Metric Value */}
                <div className="text-[18px] sm:text-[20px] font-bold text-slate-900 tracking-tight leading-tight">
                  {item.value}
                </div>
              </div>

              {/* Trend & Sparkline footer */}
              <div className="flex items-end justify-between mt-3 pt-1">
                <div className="flex items-center gap-1 text-[11px] leading-none">
                  {item.isPositive ? (
                    <span className="text-emerald-600 font-semibold flex items-center">
                      ↑ {item.change}
                    </span>
                  ) : (
                    <span className="text-rose-500 font-semibold flex items-center">
                      ↓ {item.change}
                    </span>
                  )}
                  <span className="text-slate-400 text-[10px] hidden sm:inline">
                    {item.comparedTo}
                  </span>
                </div>

                {renderSparkline(item.sparklinePoints, strokeColor, item.id)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
