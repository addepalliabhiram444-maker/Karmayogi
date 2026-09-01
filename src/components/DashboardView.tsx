import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  Play, 
  Bookmark, 
  Award,
  ChevronRight,
  Flame,
  FileCheck,
  Compass,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { UserProfile, AppView } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  setActiveView: (view: AppView) => void;
  onOpenAiAssistant: () => void;
  onOpenRecommendationsModal: () => void;
  onResumeCourse: (courseId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  setActiveView,
  onOpenAiAssistant,
  onOpenRecommendationsModal,
  onResumeCourse
}) => {
  const [bookmarkedList, setBookmarkedList] = useState<string[]>(['rec_1', 'rec_2']);

  const toggleBookmark = (id: string) => {
    setBookmarkedList(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Editorial Greeting Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Executive Briefing</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Good Morning, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Welcome back to your personalized learning desk. Your overall competency score has advanced by <strong className="text-[#1A1A1A] underline decoration-[#8C7851] font-bold">+{user.competencyChange}%</strong> following your recent evaluation in National Accounts & Sampling.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-dash-start-diagnostic"
            onClick={() => setActiveView('assessment')}
            className="px-4 py-2.5 bg-[#1A1A1A] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] hover:bg-[#8C7851] transition-all flex items-center gap-2 shadow-[2px_2px_0px_#8C7851]"
          >
            <FileCheck className="w-4 h-4 text-[#8C7851]" />
            <span>Take 5-Min Diagnostic</span>
          </button>
          <button
            id="btn-dash-view-roadmap"
            onClick={() => setActiveView('learning_path')}
            className="px-4 py-2.5 bg-[#F5F2ED] text-[#1A1A1A] text-xs font-medium border border-[#1A1A1A] hover:bg-[#EAE6DF] transition-all flex items-center gap-1.5"
          >
            <span>Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid - Editorial Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Competency */}
        <div 
          onClick={() => setActiveView('competencies')}
          className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Overall Competency
              </span>
              <div className="p-1 bg-[#F5F2ED] border border-[#DCD6CC] group-hover:border-[#1A1A1A] transition-colors">
                <TrendingUp className="w-3.5 h-3.5 text-[#1A1A1A]" />
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#1A1A1A]">{user.overallCompetency}%</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                +{user.competencyChange}%
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-[11px] text-[#5A554E] flex justify-between items-center">
            <span>Target Benchmark: 85%</span>
            <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">View Matrix →</span>
          </div>
        </div>

        {/* KPI 2: Priority Gaps */}
        <div 
          onClick={() => setActiveView('competencies')}
          className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Competency Gaps
              </span>
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
                High Priority
              </span>
            </div>
            <div className="text-4xl font-serif font-bold text-[#1A1A1A] mt-1">4 Modules</div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-[11px] text-[#5A554E] flex justify-between items-center">
            <span>Python & Weighting</span>
            <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">Review Gaps →</span>
          </div>
        </div>

        {/* KPI 3: Learning Progress */}
        <div 
          onClick={() => setActiveView('learning_path')}
          className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Curriculum Progress
              </span>
              <span className="text-xs font-mono font-bold text-[#8C7851]">
                {user.completedModules}/{user.totalModules}
              </span>
            </div>
            <div className="flex items-center gap-3 mt-1">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#E2DDD5"
                    strokeWidth="4"
                    fill="transparent"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#1A1A1A"
                    strokeWidth="4"
                    strokeDasharray={125.6}
                    strokeDashoffset={125.6 * (1 - 0.64)}
                    strokeLinecap="square"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-xs font-mono font-bold">64%</span>
              </div>
              <div>
                <div className="text-sm font-serif italic font-bold text-[#1A1A1A]">Phase II Active</div>
                <div className="text-[10px] text-[#5A554E]">Data Analysis Track</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-[11px] text-[#5A554E] flex justify-between items-center">
            <span>Next: Advanced Excel</span>
            <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">Roadmap →</span>
          </div>
        </div>

        {/* KPI 4: Avg Quiz Score */}
        <div 
          onClick={() => setActiveView('analytics')}
          className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Diagnostic Score
              </span>
              <div className="flex items-center gap-1 text-[9px] uppercase font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-600" />
                <span>{user.streakDays}d Streak</span>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#1A1A1A]">{user.avgQuizScore}%</span>
              <span className="text-xs font-serif italic text-[#5A554E]">Average</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-[11px] text-[#5A554E] flex justify-between items-center">
            <span className="text-emerald-700 font-bold">Top 15% in Cadre</span>
            <span className="text-[10px] uppercase font-mono text-[#8C7851] group-hover:underline">Analytics →</span>
          </div>
        </div>
      </div>

      {/* Featured AI Learning Insight Card - Editorial Showcase */}
      <div className="bg-[#F5F2ED] border-2 border-[#1A1A1A] p-6 md:p-8 relative overflow-hidden shadow-[4px_4px_0px_#1A1A1A]">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] uppercase tracking-[0.25em] font-bold">
            <Sparkles className="w-3 h-3 text-[#8C7851]" />
            <span>AI Learning Insight & Cadre Diagnostic</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif italic text-[#1A1A1A] leading-snug">
            "Your strongest competency is <span className="font-bold underline decoration-[#8C7851]">Statistical Reporting</span> (85%). Data Analysis and Python are your highest-priority improvement vectors."
          </h2>

          <p className="text-xs md:text-sm font-editorial text-[#5A554E] leading-relaxed">
            StatLearn AI analyzed your latest survey methodology assessment. Completing the 2 high-match modules in Phase II will elevate your overall composite index from Level 4 to Level 5 Senior Specialist.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="btn-view-ai-recommendations"
              onClick={onOpenRecommendationsModal}
              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] transition-all flex items-center gap-2"
            >
              <span>View Personalized Recommendations</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
            <button
              onClick={() => setActiveView('tutor')}
              className="px-4 py-2 bg-[#FDFCFB] hover:bg-[#EAE6DF] text-[#1A1A1A] text-xs font-medium border border-[#1A1A1A] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
              <span>Discuss with AI Tutor</span>
            </button>
          </div>
        </div>

        {/* Subtle Decorative Background Seal */}
        <div className="absolute right-4 bottom-4 opacity-10 pointer-events-none hidden md:block">
          <div className="w-48 h-48 border-4 border-[#1A1A1A] rounded-full flex items-center justify-center font-serif text-8xl italic font-bold">
            SL
          </div>
        </div>
      </div>

      {/* Split Section: Next Goal & Recently Visited */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Next Goal Card (Left 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A] mb-4">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Active Learning Goal
              </div>
              <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 bg-[#F5F2ED] border border-[#DCD6CC]">
                80% Completed
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#5A554E] font-medium">
                Phase II • Module 4
              </span>
              <h3 className="text-xl font-serif italic text-[#1A1A1A] font-semibold leading-tight">
                Advanced Data Sampling & Sample Weight Calibration
              </h3>
              <p className="text-xs text-[#5A554E] leading-relaxed">
                Learn multiplier calibration techniques, sub-sample weighting, and variance estimation across NSSO multi-stage stratified clusters.
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-5 space-y-1.5">
              <div className="flex justify-between text-[10px] font-mono text-[#5A554E]">
                <span>2 of 3 Exercises Done</span>
                <span className="font-bold text-[#1A1A1A]">15 Mins Left</span>
              </div>
              <div className="w-full h-2 bg-[#F5F2ED] border border-[#1A1A1A] overflow-hidden">
                <div className="h-full bg-[#1A1A1A]" style={{ width: '80%' }} />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#E2DDD5] flex items-center justify-between">
            <button
              id="btn-resume-next-goal"
              onClick={() => onResumeCourse('igot_01')}
              className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center justify-center gap-2 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-[#8C7851] text-[#8C7851]" />
              <span>Resume Active Lesson</span>
            </button>
          </div>
        </div>

        {/* Recently Visited Modules (Right 7 Cols) */}
        <div className="lg:col-span-7 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A] mb-4">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Recently Visited Learning Material
              </div>
              <button
                onClick={() => setActiveView('materials')}
                className="text-[10px] uppercase font-mono text-[#8C7851] hover:underline font-bold"
              >
                View Repository →
              </button>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="p-3.5 bg-[#F5F2ED] border border-[#DCD6CC] hover:border-[#1A1A1A] transition-all flex items-center justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FDFCFB] border border-[#1A1A1A] text-[#1A1A1A] shrink-0 mt-0.5">
                    <Play className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] uppercase font-mono font-bold text-[#8C7851]">Interactive Video</span>
                      <span className="text-[9px] text-[#5A554E]">• 45 mins left</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] transition-colors">
                      Python for Statistical Analysis: Pandas DataFrames & Coercion Rules
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBookmark('rec_1')}
                    className="p-1.5 text-[#5A554E] hover:text-[#1A1A1A] transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedList.includes('rec_1') ? 'fill-[#8C7851] text-[#8C7851]' : ''}`} />
                  </button>
                  <button
                    onClick={() => onResumeCourse('igot_01')}
                    className="px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCFB] hover:bg-[#8C7851] text-[10px] font-mono uppercase font-bold transition-colors"
                  >
                    Resume
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 bg-[#F5F2ED] border border-[#DCD6CC] hover:border-[#1A1A1A] transition-all flex items-center justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FDFCFB] border border-[#1A1A1A] text-[#1A1A1A] shrink-0 mt-0.5">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] uppercase font-mono font-bold text-emerald-800">Reading Completed</span>
                      <span className="text-[9px] text-[#5A554E]">• 100% Complete</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] transition-colors">
                      Guidelines for Official Statistical Reporting & NIF Disclosures
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBookmark('rec_2')}
                    className="p-1.5 text-[#5A554E] hover:text-[#1A1A1A] transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedList.includes('rec_2') ? 'fill-[#8C7851] text-[#8C7851]' : ''}`} />
                  </button>
                  <button
                    onClick={() => onResumeCourse('igot_02')}
                    className="px-2.5 py-1 bg-[#FDFCFB] text-[#1A1A1A] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold transition-colors"
                  >
                    Review
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 bg-[#F5F2ED] border border-[#DCD6CC] hover:border-[#1A1A1A] transition-all flex items-center justify-between gap-4 group">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#FDFCFB] border border-[#1A1A1A] text-[#1A1A1A] shrink-0 mt-0.5">
                    <FileCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[9px] uppercase font-mono font-bold text-[#8C7851]">Diagnostic Quiz</span>
                      <span className="text-[9px] text-[#5A554E]">• Score: 92%</span>
                    </div>
                    <div className="text-xs font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] transition-colors">
                      NSSO 78th Round Household Listing & Schedule 0.0 Protocol
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleBookmark('rec_3')}
                    className="p-1.5 text-[#5A554E] hover:text-[#1A1A1A] transition-colors"
                    title="Bookmark"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${bookmarkedList.includes('rec_3') ? 'fill-[#8C7851] text-[#8C7851]' : ''}`} />
                  </button>
                  <button
                    onClick={() => setActiveView('quiz_generator')}
                    className="px-2.5 py-1 bg-[#FDFCFB] text-[#1A1A1A] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold transition-colors"
                  >
                    Retake
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-right">
            <button
              onClick={() => setActiveView('courses')}
              className="text-xs font-serif italic text-[#1A1A1A] hover:text-[#8C7851] inline-flex items-center gap-1 font-bold"
            >
              <span>Explore all enrolled iGOT courses</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
