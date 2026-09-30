export interface MetricCardData {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  comparedTo: string;
  colorScheme: 'green' | 'red' | 'blue' | 'purple' | 'orange' | 'cyan';
  sparklinePoints: number[];
}

export interface MyWorkItem {
  id: string;
  count: number;
  label: string;
  color: string;
  badgeBg: string;
  badgeText: string;
}

export interface NeedsAttentionItem {
  id: string;
  title: string;
  module: string;
  moduleColor: string;
  timeRemaining: string;
  severity: 'urgent' | 'warning' | 'info';
  iconType: 'invoice' | 'contract' | 'compliance' | 'project' | 'ticket';
}

export interface RecentActivityItem {
  id: string;
  userInitials: string;
  userColor: string;
  action: string;
  module: string;
  moduleColor: string;
  timeAgo: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  iconBg: string;
}

export interface AIInsightItem {
  id: string;
  text: string;
  highlightText?: string;
  type: 'finance' | 'contract' | 'support' | 'project';
  iconColor: string;
  bgLight: string;
}
