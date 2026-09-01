import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  Sparkles, 
  LogOut, 
  User, 
  Settings, 
  BookOpen, 
  CheckCircle2, 
  X,
  FileText,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { UserProfile, NotificationItem, AppView } from '../types';

interface HeaderProps {
  user: UserProfile;
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onOpenAiAssistant: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  setActiveView,
  onOpenAiAssistant,
  notifications = [],
  onMarkNotificationRead,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const unreadCount = (notifications || []).filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSearchResults(true);
  };

  return (
    <header className="bg-[#FDFCFB] border-b border-[#1A1A1A] sticky top-0 z-30 transition-all">
      {/* Top Editorial Issue Ribbon */}
      <div className="bg-[#1A1A1A] text-[#FDFCFB] px-4 md:px-8 py-1.5 flex justify-between items-center text-[10px] uppercase tracking-[0.25em] font-medium">
        <div className="flex items-center gap-3">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8C7851]"></span>
          <span>India Official Statistical System</span>
          <span className="opacity-40 hidden sm:inline">|</span>
          <span className="opacity-75 hidden sm:inline">MoSPI • Capacity Building Platform</span>
        </div>
        <div className="flex items-center gap-4 text-[#C8C2B7]">
          <span>Vol. IV — Issue 2024/25</span>
          <span className="opacity-40">|</span>
          <span className="text-[#FDFCFB] font-bold">iGOT Integrated</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="px-4 md:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Editorial Title */}
        <div className="flex items-baseline gap-4 cursor-pointer" onClick={() => setActiveView('dashboard')}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif text-lg font-bold border border-[#1A1A1A]">
              SL
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-serif italic tracking-tight text-[#1A1A1A] font-semibold leading-none">
                StatLearn <span className="text-[#8C7851] not-italic font-sans text-sm uppercase tracking-[0.2em] font-bold ml-1">AI</span>
              </div>
              <p className="text-[9px] uppercase tracking-[0.18em] text-[#5A554E] mt-0.5 font-medium hidden md:block">
                National Competency & Learning Architecture
              </p>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="relative flex-1 max-w-md hidden lg:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-[#8C7851] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search competencies, NSSO surveys, Python modules (⌘K)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F2ED] border border-[#DCD6CC] text-[#1A1A1A] text-xs pl-10 pr-12 py-2 placeholder:text-[#5A554E]/60 focus:outline-none focus:border-[#1A1A1A] focus:bg-[#FDFCFB] transition-colors"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-mono uppercase bg-[#EAE6DF] px-1.5 py-0.5 border border-[#DCD6CC] text-[#5A554E]">
              ⌘K
            </kbd>
          </form>

          {/* Quick Search Popover Result */}
          {showSearchResults && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#FDFCFB] border border-[#1A1A1A] shadow-xl p-4 z-50 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#E2DDD5] mb-3">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#8C7851]">Search Results for "{searchQuery}"</span>
                <button onClick={() => setShowSearchResults(false)} className="text-[#5A554E] hover:text-[#1A1A1A]">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                <div 
                  onClick={() => { setActiveView('courses'); setShowSearchResults(false); }}
                  className="p-2 hover:bg-[#F5F2ED] cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span className="font-medium text-[#1A1A1A]">Python for Statistical Analysis & Microdata</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">Course →</span>
                </div>
                <div 
                  onClick={() => { setActiveView('competencies'); setShowSearchResults(false); }}
                  className="p-2 hover:bg-[#F5F2ED] cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span className="font-medium text-[#1A1A1A]">Survey Methodology & Sampling Diagnostics</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">Competency →</span>
                </div>
                <div 
                  onClick={() => { setActiveView('tutor'); setShowSearchResults(false); }}
                  className="p-2 hover:bg-[#F5F2ED] cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span className="font-medium text-[#1A1A1A]">Ask StatLearn AI Tutor about "{searchQuery}"</span>
                  </div>
                  <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">AI Tutor →</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* AI Assistant Quick Trigger */}
          <button
            id="btn-launch-header-ai"
            onClick={onOpenAiAssistant}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[#1A1A1A] text-xs font-medium transition-all group shadow-[2px_2px_0px_#1A1A1A] active:translate-x-0.5 active:translate-y-0.5"
            title="Launch AI Statistical Companion"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C7851] group-hover:rotate-12 transition-transform" />
            <span className="font-serif italic font-semibold">Ask AI</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              id="btn-header-notifications"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="p-2 text-[#1A1A1A] hover:bg-[#F5F2ED] border border-transparent hover:border-[#DCD6CC] relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#8C7851] rounded-full ring-2 ring-[#FDFCFB]" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 md:w-96 bg-[#FDFCFB] border border-[#1A1A1A] shadow-2xl p-4 z-50 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-[#1A1A1A] mb-3">
                  <div className="font-serif italic font-semibold text-sm">Dispatches & Alerts</div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#8C7851] font-bold">
                    {unreadCount} Unread
                  </span>
                </div>
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => onMarkNotificationRead(notif.id)}
                      className={`p-2.5 border transition-all cursor-pointer ${
                        notif.read
                          ? 'bg-[#FDFCFB] border-[#E2DDD5] opacity-75'
                          : 'bg-[#F5F2ED] border-[#1A1A1A] shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-[#1A1A1A] leading-tight">{notif.title}</span>
                        <span className="text-[9px] uppercase font-mono text-[#5A554E] shrink-0 ml-2">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5A554E] leading-relaxed">{notif.message}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-[#E2DDD5] text-center">
                  <button
                    onClick={() => {
                      notifications.forEach(n => onMarkNotificationRead(n.id));
                      setShowNotifications(false);
                    }}
                    className="text-[10px] uppercase tracking-wider text-[#8C7851] font-bold hover:underline"
                  >
                    Mark All as Read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar & Dropdown */}
          <div className="relative">
            <button
              id="btn-header-profile"
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-2.5 pl-2 pr-2 md:pr-3 py-1 border border-[#DCD6CC] hover:border-[#1A1A1A] bg-[#F5F2ED] transition-all"
            >
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-6 h-6 object-cover border border-[#1A1A1A]"
              />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold leading-tight text-[#1A1A1A]">{user.name}</div>
                <div className="text-[9px] uppercase tracking-wider text-[#8C7851] font-medium">{user.role}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-[#FDFCFB] border border-[#1A1A1A] shadow-2xl p-4 z-50 text-xs">
                <div className="pb-3 border-b border-[#1A1A1A] mb-3">
                  <div className="font-serif italic font-bold text-sm text-[#1A1A1A]">{user.name}</div>
                  <div className="text-[10px] font-mono text-[#5A554E]">{user.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#F5F2ED] border border-[#DCD6CC] text-[9px] uppercase font-bold text-[#8C7851]">
                    <CheckCircle2 className="w-3 h-3 text-[#8C7851]" />
                    <span>{user.level}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveView('profile');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#F5F2ED] flex items-center gap-2.5 text-[#1A1A1A]"
                  >
                    <User className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span>Officer Profile & Credentials</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('analytics');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#F5F2ED] flex items-center gap-2.5 text-[#1A1A1A]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span>Competency Transcript</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveView('materials');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#F5F2ED] flex items-center gap-2.5 text-[#1A1A1A]"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#8C7851]" />
                    <span>My Learning Repository</span>
                  </button>
                </div>

                <div className="mt-3 pt-3 border-t border-[#E2DDD5]">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-2.5 py-2 hover:bg-[#F5F2ED] text-[#8C7851] hover:text-[#1A1A1A] flex items-center gap-2.5 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out (Session Exit)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
