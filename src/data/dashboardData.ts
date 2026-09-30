import {
  MetricCardData,
  MyWorkItem,
  NeedsAttentionItem,
  RecentActivityItem,
  QuickActionItem,
  AIInsightItem,
} from '../types/dashboard';

export const executiveMetrics: MetricCardData[] = [
  {
    id: 'revenue',
    title: 'Total Revenue',
    value: '£542,320',
    change: '12%',
    isPositive: true,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'green',
    sparklinePoints: [20, 24, 22, 28, 26, 32, 35, 33, 40, 44, 42, 48],
  },
  {
    id: 'expenses',
    title: 'Total Expenses',
    value: '£318,450',
    change: '8%',
    isPositive: false,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'red',
    sparklinePoints: [45, 42, 44, 38, 36, 35, 32, 34, 30, 28, 29, 25],
  },
  {
    id: 'profit',
    title: 'Net Profit',
    value: '£223,870',
    change: '18%',
    isPositive: true,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'blue',
    sparklinePoints: [18, 20, 25, 24, 28, 30, 32, 38, 36, 42, 46, 50],
  },
  {
    id: 'customers',
    title: 'Active Customers',
    value: '156',
    change: '6%',
    isPositive: true,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'purple',
    sparklinePoints: [120, 125, 128, 132, 136, 140, 142, 145, 148, 150, 152, 156],
  },
  {
    id: 'projects',
    title: 'Active Projects',
    value: '24',
    change: '4%',
    isPositive: true,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'orange',
    sparklinePoints: [16, 17, 18, 18, 20, 21, 20, 22, 21, 23, 23, 24],
  },
  {
    id: 'employees',
    title: 'Total Employees',
    value: '48',
    change: '2%',
    isPositive: true,
    comparedTo: 'vs. Mar 2025',
    colorScheme: 'cyan',
    sparklinePoints: [40, 41, 42, 42, 43, 44, 45, 46, 46, 47, 47, 48],
  },
];

export const myWorkItems: MyWorkItem[] = [
  { id: '1', count: 12, label: 'Tasks assigned to me', color: 'emerald', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', badgeText: '12' },
  { id: '2', count: 5, label: 'Approvals pending', color: 'blue', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', badgeText: '5' },
  { id: '3', count: 8, label: '@ Mentions (comments)', color: 'amber', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200', badgeText: '8' },
  { id: '4', count: 4, label: 'Documents to review', color: 'orange', badgeBg: 'bg-orange-50 text-orange-700 border-orange-200', badgeText: '4' },
  { id: '5', count: 3, label: 'Training actions', color: 'indigo', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200', badgeText: '3' },
  { id: '6', count: 2, label: 'Overdue items', color: 'red', badgeBg: 'bg-red-50 text-red-700 border-red-200', badgeText: '2' },
];

export const needsAttentionItems: NeedsAttentionItem[] = [
  { id: '1', title: '3 invoices overdue', module: 'Finance', moduleColor: 'bg-blue-50 text-blue-700 border-blue-200', timeRemaining: '2 days', severity: 'urgent', iconType: 'invoice' },
  { id: '2', title: '2 contracts expiring', module: 'Contracts', moduleColor: 'bg-indigo-50 text-indigo-700 border-indigo-200', timeRemaining: '5 days', severity: 'warning', iconType: 'contract' },
  { id: '3', title: '4 compliance actions pending', module: 'Compliance', moduleColor: 'bg-purple-50 text-purple-700 border-purple-200', timeRemaining: '7 days', severity: 'warning', iconType: 'compliance' },
  { id: '4', title: '2 project milestones delayed', module: 'Projects', moduleColor: 'bg-sky-50 text-sky-700 border-sky-200', timeRemaining: '8 days', severity: 'warning', iconType: 'project' },
  { id: '5', title: '3 high-priority tickets', module: 'Support', moduleColor: 'bg-cyan-50 text-cyan-700 border-cyan-200', timeRemaining: '1 day', severity: 'urgent', iconType: 'ticket' },
];

export const recentActivityItems: RecentActivityItem[] = [
  { id: '1', userInitials: 'JD', userColor: 'bg-blue-600 text-white', action: 'Invoice INV-1048 approved', module: 'Finance', moduleColor: 'bg-blue-50 text-blue-700 border-blue-200', timeAgo: '2 hours ago' },
  { id: '2', userInitials: 'SC', userColor: 'bg-indigo-600 text-white', action: 'New customer Acme Ltd added', module: 'CRM', moduleColor: 'bg-sky-50 text-sky-700 border-sky-200', timeAgo: '4 hours ago' },
  { id: '3', userInitials: 'LT', userColor: 'bg-teal-600 text-white', action: 'Project milestone updated', module: 'Projects', moduleColor: 'bg-cyan-50 text-cyan-700 border-cyan-200', timeAgo: '5 hours ago' },
  { id: '4', userInitials: 'AP', userColor: 'bg-slate-700 text-white', action: 'Policy document updated', module: 'Compliance', moduleColor: 'bg-purple-50 text-purple-700 border-purple-200', timeAgo: '6 hours ago' },
  { id: '5', userInitials: 'MK', userColor: 'bg-emerald-600 text-white', action: 'Support ticket #4213 resolved', module: 'Support', moduleColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', timeAgo: '7 hours ago' },
];

export const quickActionItems: QuickActionItem[] = [
  { id: 'new-invoice', title: 'New Invoice', icon: 'FileSpreadsheet', bgColor: 'bg-emerald-50/80 hover:bg-emerald-100/90', textColor: 'text-emerald-950', borderColor: 'border-emerald-200/70', iconBg: 'bg-emerald-500 text-white' },
  { id: 'new-contact', title: 'New Contact', icon: 'UserPlus', bgColor: 'bg-blue-50/80 hover:bg-blue-100/90', textColor: 'text-blue-950', borderColor: 'border-blue-200/70', iconBg: 'bg-blue-500 text-white' },
  { id: 'new-project', title: 'New Project', icon: 'FolderPlus', bgColor: 'bg-amber-50/80 hover:bg-amber-100/90', textColor: 'text-amber-950', borderColor: 'border-amber-200/70', iconBg: 'bg-amber-500 text-white' },
  { id: 'upload-doc', title: 'Upload Document', icon: 'UploadCloud', bgColor: 'bg-purple-50/80 hover:bg-purple-100/90', textColor: 'text-purple-950', borderColor: 'border-purple-200/70', iconBg: 'bg-purple-500 text-white' },
  { id: 'raise-ticket', title: 'Raise Support Ticket', icon: 'Headphones', bgColor: 'bg-teal-50/80 hover:bg-teal-100/90', textColor: 'text-teal-950', borderColor: 'border-teal-200/70', iconBg: 'bg-teal-500 text-white' },
  { id: 'create-contract', title: 'Create Contract', icon: 'FileSignature', bgColor: 'bg-rose-50/80 hover:bg-rose-100/90', textColor: 'text-rose-950', borderColor: 'border-rose-200/70', iconBg: 'bg-rose-500 text-white' },
];

export const aiInsights: AIInsightItem[] = [
  {
    id: '1',
    text: 'Revenue is 12% higher than last month, driven by 3 new enterprise customers.',
    type: 'finance',
    iconColor: 'text-emerald-600',
    bgLight: 'bg-emerald-50 border-emerald-100',
  },
  {
    id: '2',
    text: '4 contracts are due to expire in the next 30 days. Consider renewal discussions.',
    type: 'contract',
    iconColor: 'text-amber-600',
    bgLight: 'bg-amber-50 border-amber-100',
  },
  {
    id: '3',
    text: 'Support ticket volume is down 18% with improved response times.',
    type: 'support',
    iconColor: 'text-blue-600',
    bgLight: 'bg-blue-50 border-blue-100',
  },
  {
    id: '4',
    text: 'Project delivery is on track with 67% of milestones completed this quarter.',
    type: 'project',
    iconColor: 'text-indigo-600',
    bgLight: 'bg-indigo-50 border-indigo-100',
  },
];
