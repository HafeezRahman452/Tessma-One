import React, { useState } from 'react';
import {
  Landmark,
  Users,
  FolderKanban,
  FileText,
  ShieldCheck,
  Headphones,
  Sparkles,
  ChevronDown,
  TrendingUp,
  AlertCircle,
  Clock,
  Target,
} from 'lucide-react';
import { aiInsights } from '../data/dashboardData';

interface SnapshotProps {
  onItemClick?: (title: string) => void;
}

export const SnapshotsGrid: React.FC<SnapshotProps> = ({ onItemClick }) => {
  const [filterPeriod, setFilterPeriod] = useState<Record<string, string>>({
    finance: 'This Month',
    crm: 'This Month',
    hr: 'This Month',
    projects: 'This Quarter',
    contracts: 'This Month',
    compliance: 'This Month',
    support: 'This Month',
    insights: 'This Month',
  });

  const toggleFilter = (key: string, val: string) => {
    setFilterPeriod((prev) => ({ ...prev, [key]: val }));
  };

  // Reusable Donut Chart Generator
  const renderDonut = (
    segments: { label: string; value: number; color: string }[],
    centerText: string,
    subText?: string
  ) => {
    const total = segments.reduce((sum, s) => sum + s.value, 0);
    const radius = 38;
    const strokeWidth = 14;
    const circumference = 2 * Math.PI * radius;

    let accumulatedAngle = 0;

    return (
      <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {segments.map((seg, idx) => {
            const strokeDasharray = `${(seg.value / total) * circumference} ${circumference}`;
            const strokeDashoffset = -accumulatedAngle;
            accumulatedAngle += (seg.value / total) * circumference;

            return (
              <circle
                key={idx}
                cx="50"
                cy="50"
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="butt"
                className="transition-all duration-300 hover:opacity-80"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-[12px] font-bold text-slate-800 leading-tight">
            {centerText}
          </span>
          {subText && (
            <span className="text-[9px] text-slate-500 font-medium">
              {subText}
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* 1. Finance Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Landmark size={15} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Finance Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.finance}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-start justify-between gap-3">
            {/* Stats Left */}
            <div className="space-y-2 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Revenue</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">£542,320</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 12%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Expenses</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">£318,450</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 8%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Profit</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">£223,870</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 18%</span>
                </div>
              </div>
            </div>

            {/* Monthly Bar Chart */}
            <div className="flex-1 flex flex-col items-end">
              <div className="text-[9px] font-medium text-slate-600 text-right mb-1">
                Monthly Revenue vs Expenses
              </div>
              <div className="flex items-center gap-2 text-[9px] text-slate-500 mb-2">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Revenue
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Expenses
                </span>
              </div>

              {/* Bar SVG */}
              <div className="w-full flex items-end justify-between h-20 pt-1 border-b border-slate-200 px-1">
                {[
                  { month: 'Nov', rev: 55, exp: 35 },
                  { month: 'Dec', rev: 70, exp: 45 },
                  { month: 'Jan', rev: 60, exp: 40 },
                  { month: 'Feb', rev: 68, exp: 38 },
                  { month: 'Mar', rev: 75, exp: 42 },
                  { month: 'Apr', rev: 85, exp: 48 },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 group">
                    <div className="flex items-end gap-0.5 h-14">
                      {/* Revenue Bar */}
                      <div
                        style={{ height: `${item.rev}%` }}
                        className="w-1.5 bg-emerald-500 rounded-t-xs transition-all group-hover:bg-emerald-600"
                        title={`Revenue: ${item.rev}%`}
                      />
                      {/* Expenses Bar */}
                      <div
                        style={{ height: `${item.exp}%` }}
                        className="w-1.5 bg-rose-400 rounded-t-xs transition-all group-hover:bg-rose-500"
                        title={`Expenses: ${item.exp}%`}
                      />
                    </div>
                    <span className="text-[9px] text-slate-400">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CRM Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                CRM Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.crm}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-start justify-between gap-2">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Total Customers</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">156</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 6%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">New Customers</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">12</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 33%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Opportunities</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">18</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 14%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Conversion Rate</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">28%</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 4%</span>
                </div>
              </div>
            </div>

            {/* Funnel Chart Right */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-[9px] font-bold text-slate-700 text-center mb-1.5">
                Pipeline Value: £1,130,000
              </div>

              {/* Trapezoid Funnel */}
              <div className="flex flex-col items-center w-full max-w-[130px] space-y-1">
                {/* 1. Leads */}
                <div className="w-full bg-[#3b82f6] text-white text-[9px] font-bold py-1 px-2 rounded-xs flex items-center justify-between shadow-2xs">
                  <span>48</span>
                  <span className="font-normal opacity-90 text-[8px]">● Leads</span>
                </div>
                {/* 2. Qualified */}
                <div className="w-[85%] bg-[#8b5cf6] text-white text-[9px] font-bold py-1 px-2 rounded-xs flex items-center justify-between shadow-2xs">
                  <span>32</span>
                  <span className="font-normal opacity-90 text-[8px]">● Qualified</span>
                </div>
                {/* 3. Proposal */}
                <div className="w-[70%] bg-[#f97316] text-white text-[9px] font-bold py-1 px-2 rounded-xs flex items-center justify-between shadow-2xs">
                  <span>18</span>
                  <span className="font-normal opacity-90 text-[8px]">● Proposal</span>
                </div>
                {/* 4. Won */}
                <div className="w-[55%] bg-[#10b981] text-white text-[9px] font-bold py-1 px-2 rounded-xs flex items-center justify-between shadow-2xs">
                  <span>9</span>
                  <span className="font-normal opacity-90 text-[8px]">● Won</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. HR Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                HR Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.hr}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Total Employees</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">48</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 2%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">New Starters</div>
                <div className="text-xs font-bold text-slate-800">4</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">On Leave</div>
                <div className="text-xs font-bold text-slate-800">6</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Open Roles</div>
                <div className="text-xs font-bold text-slate-800">3</div>
              </div>
            </div>

            {/* Donut Chart + Legend */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-medium text-slate-600 mb-1">
                Employee Distribution
              </div>
              <div className="flex items-center gap-2">
                {renderDonut(
                  [
                    { label: 'Full-time', value: 28, color: '#10b981' },
                    { label: 'Part-time', value: 8, color: '#3b82f6' },
                    { label: 'On leave', value: 6, color: '#f97316' },
                    { label: 'Open roles', value: 6, color: '#06b6d4' },
                  ],
                  '48',
                  'Employees'
                )}

                <div className="space-y-1 text-[9px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>28 Full-time</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    <span>8 Part-time</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
                    <span>6 On leave</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4]" />
                    <span>6 Open roles</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Projects Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <FolderKanban size={15} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Projects Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.projects}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0 text-[10px]">
              <div>
                <div className="text-slate-400 font-medium">Total Projects</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">24</span>
                  <span className="font-semibold text-emerald-600">↑ 4%</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> On Track
                </span>
                <span className="font-bold text-slate-800">16</span>
                <span className="text-slate-400 text-[9px]">67%</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> At Risk
                </span>
                <span className="font-bold text-slate-800">4</span>
                <span className="text-slate-400 text-[9px]">17%</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Delayed
                </span>
                <span className="font-bold text-slate-800">2</span>
                <span className="text-slate-400 text-[9px]">8%</span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1 text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Completed
                </span>
                <span className="font-bold text-slate-800">2</span>
                <span className="text-slate-400 text-[9px]">8%</span>
              </div>
            </div>

            {/* Donut Chart Right */}
            <div className="flex justify-center flex-1">
              {renderDonut(
                [
                  { label: 'On Track', value: 16, color: '#10b981' },
                  { label: 'At Risk', value: 4, color: '#f59e0b' },
                  { label: 'Delayed', value: 2, color: '#ef4444' },
                  { label: 'Completed', value: 2, color: '#3b82f6' },
                ],
                '24',
                'Projects'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Documents & Contracts Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <FileText size={15} className="text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Documents & Contracts Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.contracts}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Total Documents</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">1,248</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 8%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Active Contracts</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">62</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 5%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Expiring &lt; 30 days</div>
                <div className="text-xs font-bold text-slate-800">5</div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Pending Approvals</div>
                <div className="text-xs font-bold text-slate-800">3</div>
              </div>
            </div>

            {/* Donut Chart + Legend */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-medium text-slate-600 mb-1">Contract Status</div>
              <div className="flex items-center gap-2">
                {renderDonut(
                  [
                    { label: 'Active', value: 47, color: '#10b981' },
                    { label: 'Expiring', value: 10, color: '#f59e0b' },
                    { label: 'Renewal', value: 4, color: '#f43f5e' },
                    { label: 'Expired', value: 1, color: '#991b1b' },
                  ],
                  '62',
                  'Contracts'
                )}

                <div className="space-y-1 text-[9px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    <span>Active 76% (47)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                    <span>Expiring 16% (10)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e]" />
                    <span>Renewal 6% (4) Due</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#991b1b]" />
                    <span>Expired 2% (1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Compliance & Risk Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Compliance & Risk Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.compliance}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Compliance Score</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">92%</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 3%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Open Actions</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">8</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 20%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Overdue Actions</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">3</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 40%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Upcoming Reviews</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">5</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 25%</span>
                </div>
              </div>
            </div>

            {/* Donut Chart + Legend */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-medium text-slate-600 mb-1">Action Status</div>
              <div className="flex items-center gap-2">
                {renderDonut(
                  [
                    { label: 'Completed', value: 12, color: '#0d9488' },
                    { label: 'In Progress', value: 3, color: '#3b82f6' },
                    { label: 'Overdue', value: 1, color: '#ef4444' },
                  ],
                  '16',
                  'Actions'
                )}

                <div className="space-y-1 text-[9px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]" />
                    <span>Completed 75% (12)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    <span>In Progress 19% (3)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <span>Overdue 6% (1)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Service & Support Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Headphones size={15} className="text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Service & Support Snapshot
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.support}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-1">
            {/* Stats Left */}
            <div className="space-y-1.5 shrink-0">
              <div>
                <div className="text-[10px] text-slate-400 font-medium">Total Tickets</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">36</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 18%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Open Tickets</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">7</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 44%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Avg. Response Time</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">2h 15m</span>
                  <span className="text-[10px] font-semibold text-rose-500">↓ 35%</span>
                </div>
              </div>

              <div>
                <div className="text-[10px] text-slate-400 font-medium">Customer Satisfaction</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs font-bold text-slate-800">94%</span>
                  <span className="text-[10px] font-semibold text-emerald-600">↑ 6%</span>
                </div>
              </div>
            </div>

            {/* Donut Chart + Legend */}
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-medium text-slate-600 mb-1">Tickets by Priority</div>
              <div className="flex items-center gap-2">
                {renderDonut(
                  [
                    { label: 'Low', value: 20, color: '#3b82f6' },
                    { label: 'Medium', value: 10, color: '#f59e0b' },
                    { label: 'High', value: 4, color: '#ef4444' },
                    { label: 'Critical', value: 2, color: '#7f1d1d' },
                  ],
                  '36',
                  'Tickets'
                )}

                <div className="space-y-1 text-[9px] text-slate-600">
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6]" />
                    <span>Low 56% (20)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                    <span>Medium 28% (10)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <span>High 11% (4)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7f1d1d]" />
                    <span>Critical 6% (2)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 8. Intelligence / AI Insights */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <Sparkles size={15} className="text-[#00a896]" />
              <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                Intelligence / AI Insights
              </h3>
            </div>
            <button className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-800">
              <span>{filterPeriod.insights}</span>
              <ChevronDown size={11} />
            </button>
          </div>

          <div className="space-y-2">
            {aiInsights.map((insight) => (
              <div
                key={insight.id}
                onClick={() => onItemClick?.(insight.text)}
                className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50/70 hover:bg-slate-100/80 transition-colors cursor-pointer group"
              >
                <div className="mt-0.5 shrink-0">
                  {insight.type === 'finance' && (
                    <TrendingUp size={14} className="text-emerald-600" />
                  )}
                  {insight.type === 'contract' && (
                    <AlertCircle size={14} className="text-amber-500" />
                  )}
                  {insight.type === 'support' && (
                    <Headphones size={14} className="text-blue-600" />
                  )}
                  {insight.type === 'project' && (
                    <Target size={14} className="text-indigo-600" />
                  )}
                </div>
                <p className="text-[11px] leading-relaxed text-slate-700 group-hover:text-slate-900">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
