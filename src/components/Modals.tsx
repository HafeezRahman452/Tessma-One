import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Search,
  Bell,
  CheckCircle2,
  Calendar,
  Send,
  Loader2,
  FileSpreadsheet,
  UserPlus,
  FolderPlus,
  UploadCloud,
  Headphones,
  FileSignature,
} from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  actionId: string | null;
  actionTitle: string;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  actionId,
  actionTitle,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmit({ actionId, ...formData });
      onClose();
    }, 600);
  };

  const getActionIcon = () => {
    switch (actionId) {
      case 'new-invoice':
        return <FileSpreadsheet className="text-emerald-500" size={20} />;
      case 'new-contact':
        return <UserPlus className="text-blue-500" size={20} />;
      case 'new-project':
        return <FolderPlus className="text-amber-500" size={20} />;
      case 'upload-doc':
        return <UploadCloud className="text-purple-500" size={20} />;
      case 'raise-ticket':
        return <Headphones className="text-teal-500" size={20} />;
      case 'create-contract':
        return <FileSignature className="text-rose-500" size={20} />;
      default:
        return <CheckCircle2 className="text-slate-500" size={20} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              {getActionIcon()}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">{actionTitle}</h3>
              <p className="text-[11px] text-slate-500">
                Complete the details below to proceed
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          {actionId === 'new-invoice' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer / Client
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme Corporation"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  onChange={(e) =>
                    setFormData({ ...formData, client: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Amount (£)
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="12,500"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2025-05-15"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </>
          )}

          {actionId === 'new-contact' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="sarah@example.com"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  onChange={(e) =>
                    setFormData({ ...formData, org: e.target.value })
                  }
                />
              </div>
            </>
          )}

          {actionId === 'new-project' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Project Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Global ERP Modernization"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  onChange={(e) =>
                    setFormData({ ...formData, projectTitle: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lead Owner
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Priority
                  </label>
                  <select className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500">
                    <option>High</option>
                    <option>Medium</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {actionId === 'upload-doc' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select File
              </label>
              <div className="border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-xl p-6 text-center cursor-pointer bg-slate-50/50">
                <UploadCloud className="mx-auto text-purple-500 mb-2" size={28} />
                <p className="text-xs text-slate-700 font-semibold">
                  Drag and drop files here, or browse
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  PDF, DOCX, XLSX up to 25MB
                </p>
              </div>
            </div>
          )}

          {actionId === 'raise-ticket' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Issue Summary
                </label>
                <input
                  required
                  type="text"
                  placeholder="Describe the issue briefly..."
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Severity
                </label>
                <select className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500">
                  <option>Critical (P1)</option>
                  <option>High (P2)</option>
                  <option>Medium (P3)</option>
                  <option>Low (P4)</option>
                </select>
              </div>
            </>
          )}

          {actionId === 'create-contract' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Contract Title
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Master Services Agreement 2025"
                  className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Value (£)
                  </label>
                  <input
                    type="text"
                    placeholder="£75,000"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Term Length
                  </label>
                  <input
                    type="text"
                    defaultValue="12 Months"
                    className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0a4855] hover:bg-[#073943] rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
            >
              {submitting ? (
                <>
                  <Loader2 size={13} className="animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>Confirm & Submit</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Search Dialog
interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  setQuery: (q: string) => void;
  onSelectResult: (title: string) => void;
}

export const SearchDialog: React.FC<SearchDialogProps> = ({
  isOpen,
  onClose,
  query,
  setQuery,
  onSelectResult,
}) => {
  if (!isOpen) return null;

  const mockDatabase = [
    { title: 'Invoice INV-1048 (£42,300)', module: 'Finance', type: 'Invoice' },
    { title: 'Acme Ltd Master Services Agreement', module: 'Contracts', type: 'Contract' },
    { title: 'ISO 27001 Security Audit Q2', module: 'Compliance', type: 'Audit' },
    { title: 'Cloud Infrastructure Upgrade 2025', module: 'Projects', type: 'Project' },
    { title: 'Support Ticket #4213 - High latency', module: 'Support', type: 'Ticket' },
    { title: 'Global Compensation Review', module: 'HR', type: 'Policy' },
  ];

  const filtered = query
    ? mockDatabase.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.module.toLowerCase().includes(query.toLowerCase())
      )
    : mockDatabase;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/40 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center px-4 py-3 border-b border-slate-100">
          <Search size={18} className="text-slate-400 mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search across finance, contracts, CRM, projects..."
            className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            {query ? 'Matching Results' : 'Suggested Modules & Items'}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No matching records found for "{query}"
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectResult(item.title);
                  onClose();
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer group transition-colors"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-800 group-hover:text-teal-700">
                    {item.title}
                  </div>
                  <div className="text-[10px] text-slate-400">{item.type}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">
                  {item.module}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// AI Executive Assistant Drawer
interface AIDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIDrawer: React.FC<AIDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string }[]
  >([
    {
      role: 'assistant',
      text: "Hello John! I'm your TESSMA AI Executive Advisor. I have real-time visibility across all 8 modules (Finance, CRM, HR, Projects, Contracts, Compliance, IT, and Support). How can I assist you with your executive overview today?",
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = (userText: string) => {
    if (!userText.trim()) return;
    const prompt = userText;
    setInputVal('');
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    setLoading(true);

    setTimeout(() => {
      let reply = '';
      const lower = prompt.toLowerCase();

      if (lower.includes('revenue') || lower.includes('profit') || lower.includes('finance')) {
        reply =
          'Revenue for April 2025 reached £542,320, a 12% rise vs March. Net profit stands at £223,870 (+18%), primarily driven by 3 new enterprise contracts in the CRM pipeline.';
      } else if (lower.includes('contract') || lower.includes('expire')) {
        reply =
          'You currently have 62 active contracts. 4 contracts are expiring within the next 30 days, including Acme Ltd renewal. Legal and Procurement have been notified.';
      } else if (lower.includes('urgent') || lower.includes('attention') || lower.includes('overdue')) {
        reply =
          'There are 8 items requiring executive attention: 3 invoices overdue (£42,300), 2 expiring contracts, 4 compliance reviews pending, 2 delayed project milestones, and 3 P1 support tickets.';
      } else {
        reply = `Analyzing query "${prompt}" across live corporate telemetry... The executive KPIs remain positive with a 92% compliance health score and 94% customer satisfaction rating.`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-[#081726] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00d4b2] to-[#028090] flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <div>
              <div className="text-xs font-bold tracking-wide">TESSMA AI Advisor</div>
              <div className="text-[10px] text-[#00d4b2]">
                Active Executive Intelligence
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          {[
            'Summarize Q2 revenue',
            'Expiring contracts',
            'Overdue invoices',
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-teal-400 hover:text-teal-700 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-[#0a4855] text-white rounded-br-xs'
                    : 'bg-slate-100 text-slate-800 rounded-bl-xs border border-slate-200/70'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-600 rounded-2xl p-3 rounded-bl-xs flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-teal-600" />
                <span>Consulting modules...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-200 bg-white">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputVal);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything about business performance..."
              className="flex-1 text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || loading}
              className="p-2 rounded-lg bg-[#0a4855] hover:bg-[#073943] text-white disabled:opacity-50 transition-colors"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Notifications Drawer
export const NotificationsDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifications = [
    {
      title: 'Invoice INV-1048 approved by Finance',
      time: '2 hours ago',
      unread: true,
    },
    {
      title: 'Contract with Acme Ltd ready for review',
      time: '4 hours ago',
      unread: true,
    },
    {
      title: 'Quarterly compliance audit checklist generated',
      time: '6 hours ago',
      unread: true,
    },
    {
      title: 'Server migration milestone reached 100%',
      time: 'Yesterday',
      unread: false,
    },
    {
      title: 'New customer onboarding completed',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-slate-700" />
            <span className="text-xs font-bold text-slate-800">Notifications</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500 text-white">
              5
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notifications.map((item, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border transition-colors ${
                item.unread
                  ? 'bg-teal-50/40 border-teal-200/60'
                  : 'bg-white border-slate-100 hover:bg-slate-50'
              }`}
            >
              <div className="text-xs font-semibold text-slate-800">
                {item.title}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{item.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
