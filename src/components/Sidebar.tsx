import React from 'react';
import { 
  LayoutDashboard, 
  Target, 
  CheckSquare, 
  Milestone, 
  BookOpen, 
  Sparkles, 
  Bot, 
  BarChart3, 
  FolderArchive, 
  UserCog,
  Compass,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AppView } from '../types';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onOpenAiAssistant: () => void;
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenAiAssistant,
  mobileMenuOpen = false,
  setMobileMenuOpen
}) => {
  const navSections = [
    {
      volume: 'Volume I',
      category: 'Core Competency',
      items: [
        { id: 'dashboard' as AppView, label: 'Dashboard', num: '01', icon: LayoutDashboard },
        { id: 'competencies' as AppView, label: 'My Competencies', num: '02', icon: Target },
        { id: 'assessment' as AppView, label: 'Skill Assessment', num: '03', icon: CheckSquare },
        { id: 'learning_path' as AppView, label: 'Learning Path', num: '04', icon: Milestone },
        { id: 'courses' as AppView, label: 'iGOT Courses', num: '05', icon: BookOpen },
      ]
    },
    {
      volume: 'Volume II',
      category: 'AI & Diagnostics',
      items: [
        { id: 'quiz_generator' as AppView, label: 'AI Quiz Generator', num: '06', icon: Sparkles },
        { id: 'tutor' as AppView, label: 'StatLearn AI Tutor', num: '07', icon: Bot },
        { id: 'analytics' as AppView, label: 'Progress & Analytics', num: '08', icon: BarChart3 },
      ]
    },
    {
      volume: 'Volume III',
      category: 'Archive & Record',
      items: [
        { id: 'materials' as AppView, label: 'Learning Materials', num: '09', icon: FolderArchive },
        { id: 'profile' as AppView, label: 'Profile & Settings', num: '10', icon: UserCog },
      ]
    }
  ];

  const handleSelect = (view: AppView) => {
    setActiveView(view);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <aside
      className={`fixed lg:sticky top-0 lg:top-[85px] left-0 h-full lg:h-[calc(100vh-85px)] w-64 md:w-72 bg-[#FDFCFB] border-r border-[#1A1A1A] flex flex-col justify-between p-5 overflow-y-auto z-40 transition-transform duration-200 ${
        mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      <div>
        {/* Editorial Section Header */}
        <div className="pb-4 mb-5 border-b border-[#1A1A1A]">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold">
            Table of Contents
          </div>
          <div className="font-serif italic text-lg text-[#1A1A1A] font-semibold mt-0.5">
            Cadre Curriculum Index
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-6">
          {navSections.map((section, sIdx) => (
            <div key={section.volume} className="space-y-1.5">
              <div className="flex items-baseline justify-between px-2 pb-1 border-b border-[#E2DDD5]">
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono text-[#8C7851] font-bold">
                  {section.volume}
                </span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-[#5A554E] font-medium">
                  {section.category}
                </span>
              </div>

              <div className="space-y-0.5 pt-1">
                {section.items.map((item) => {
                  const isActive = activeView === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      id={`nav-link-${item.id}`}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-all border group text-left ${
                        isActive
                          ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A] font-medium shadow-[2px_2px_0px_#8C7851]'
                          : 'bg-transparent text-[#1A1A1A] border-transparent hover:border-[#DCD6CC] hover:bg-[#F5F2ED]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`text-[9px] font-mono tracking-tight ${
                            isActive ? 'text-[#8C7851]' : 'text-[#5A554E] group-hover:text-[#1A1A1A]'
                          }`}
                        >
                          {item.num}
                        </span>
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#8C7851]' : 'text-[#5A554E]'}`} />
                        <span className={`tracking-tight ${isActive ? 'font-serif font-bold' : ''}`}>
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Editorial Quote / AI Assistant CTA Card */}
      <div className="mt-8 pt-4 border-t border-[#1A1A1A] space-y-3">
        <div className="p-4 bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#8C7851] font-bold">
              AI Statistical Companion
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-xs font-serif italic leading-snug text-[#F5F2ED]/90 mb-3">
            "Official statistics are an indispensable element in the information system of a democratic society."
          </p>
          <button
            id="btn-sidebar-launch-ai"
            onClick={onOpenAiAssistant}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-[#FDFCFB] text-[#1A1A1A] text-xs font-serif italic font-bold hover:bg-[#8C7851] hover:text-[#FDFCFB] transition-all border border-[#1A1A1A]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C7851] group-hover:text-[#FDFCFB]" />
            <span>Launch AI Assistant</span>
          </button>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-[#5A554E] px-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#8C7851]" />
            Secured MoSPI Network
          </span>
          <span>v4.2.0</span>
        </div>
      </div>
    </aside>
  );
};
