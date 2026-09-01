import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Award, 
  Download, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ArrowRight,
  Flame,
  FileText
} from 'lucide-react';
import { UserProfile, AppView } from '../types';

interface AnalyticsViewProps {
  user: UserProfile;
  setActiveView: (view: AppView) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user, setActiveView }) => {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | 'ytd'>('30d');

  const weeklyGrowth = [
    { week: 'W1', score: 58, hours: 2.5 },
    { week: 'W2', score: 62, hours: 3.8 },
    { week: 'W3', score: 65, hours: 4.2 },
    { week: 'W4', score: 68, hours: 3.0 },
    { week: 'W5', score: 70, hours: 5.5 },
    { week: 'W6', score: 72, hours: 4.8 },
  ];

  const quizScores = [
    { name: 'NSSO Listing', score: 78, date: '12 Aug' },
    { name: 'National Accounts', score: 84, date: '18 Aug' },
    { name: 'CPI Deflator', score: 92, date: '22 Aug' },
    { name: 'PLFS Status', score: 88, date: '27 Aug' },
    { name: 'Python L1 Test', score: 90, date: '30 Aug' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Statistical Telemetry & Reporting</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Cadre Benchmarking</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Learning Progress & Analytics
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Longitudinal competency trajectory, weekly learning velocity, and comparative assessment performance across MoSPI statistical cadres.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 border border-[#DCD6CC]">
            {(['30d', '90d', 'ytd'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 text-[10px] uppercase font-mono font-bold transition-all ${
                  timeRange === r
                    ? 'bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A]'
                    : 'text-[#5A554E] hover:text-[#1A1A1A]'
                }`}
              >
                {r === '30d' ? 'Last 30 Days' : r === '90d' ? 'Quarter' : 'YTD'}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert("Official Competency Transcript PDF generated and stamped.")}
            className="px-3.5 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5 text-[#8C7851]" />
            <span>Export Transcript</span>
          </button>
        </div>
      </div>

      {/* KPI Trio */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Weekly Learning Hours
              </span>
              <Clock className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#1A1A1A]">14.5 hrs</span>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 border border-emerald-200">
                +12% vs last cycle
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-xs text-[#5A554E]">
            Target: 10 hrs / week (Cadre Mandate Met)
          </div>
        </div>

        <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Completed Modules
              </span>
              <Award className="w-4 h-4 text-[#1A1A1A]" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#1A1A1A]">18 Modules</span>
              <span className="text-xs font-mono font-bold text-[#8C7851]">
                (2 New this month)
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-xs text-[#5A554E]">
            10 Remaining to reach Level 5 Senior Specialist
          </div>
        </div>

        <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Active Learning Streak
              </span>
              <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
            </div>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-4xl font-serif font-bold text-[#1A1A1A]">12 Days</span>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-200">
                Top 5% Consistency
              </span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-xs text-[#5A554E]">
            Keep learning daily to maintain cadence badge
          </div>
        </div>
      </div>

      {/* Outstanding Progress Banner */}
      <div className="p-6 bg-[#F5F2ED] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
            <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
            <span>Outstanding Progress Detected</span>
          </div>
          <h3 className="text-xl font-serif italic text-[#1A1A1A] font-bold">
            Your Data Analysis competency improved by 18% over the last month.
          </h3>
          <p className="text-xs font-editorial text-[#5A554E]">
            Your assessment scores place you ahead of 85% of statistical officers in the North Zone Cadre.
          </p>
        </div>

        <button
          onClick={() => setActiveView('learning_path')}
          className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] shrink-0 transition-all flex items-center gap-2"
        >
          <span>View Next Milestone</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
        </button>
      </div>

      {/* SVG Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Competency Trajectory (Left 7 cols) */}
        <div className="lg:col-span-7 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Trajectory Timeline
              </div>
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold">
                Competency Composite Growth (W1 - W6)
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-300">
              +14 pts total gain
            </span>
          </div>

          {/* SVG Line & Bar Chart */}
          <div className="h-64 relative pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
              {/* Horizontal Gridlines */}
              {[40, 60, 80, 100].map((val, idx) => {
                const y = 200 - (val / 100) * 180;
                return (
                  <g key={idx}>
                    <line x1="30" y1={y} x2="490" y2={y} stroke="#E2DDD5" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="5" y={y + 4} fontSize="9" fill="#5A554E" fontFamily="monospace">{val}%</text>
                  </g>
                );
              })}

              {/* Area fill */}
              <polygon
                points={`
                  50,${200 - (weeklyGrowth[0].score / 100) * 180}
                  130,${200 - (weeklyGrowth[1].score / 100) * 180}
                  210,${200 - (weeklyGrowth[2].score / 100) * 180}
                  290,${200 - (weeklyGrowth[3].score / 100) * 180}
                  370,${200 - (weeklyGrowth[4].score / 100) * 180}
                  450,${200 - (weeklyGrowth[5].score / 100) * 180}
                  450,200 50,200
                `}
                fill="#8C7851"
                fillOpacity="0.15"
              />

              {/* Trajectory Polyline */}
              <polyline
                points={`
                  50,${200 - (weeklyGrowth[0].score / 100) * 180}
                  130,${200 - (weeklyGrowth[1].score / 100) * 180}
                  210,${200 - (weeklyGrowth[2].score / 100) * 180}
                  290,${200 - (weeklyGrowth[3].score / 100) * 180}
                  370,${200 - (weeklyGrowth[4].score / 100) * 180}
                  450,${200 - (weeklyGrowth[5].score / 100) * 180}
                `}
                fill="none"
                stroke="#1A1A1A"
                strokeWidth="2.5"
              />

              {/* Data points */}
              {weeklyGrowth.map((d, i) => {
                const cx = 50 + i * 80;
                const cy = 200 - (d.score / 100) * 180;
                return (
                  <g key={i}>
                    <circle cx={cx} cy={cy} r="4.5" fill="#8C7851" stroke="#1A1A1A" strokeWidth="1.5" />
                    <text x={cx} y={cy - 10} textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace" fill="#1A1A1A">
                      {d.score}%
                    </text>
                    <text x={cx} y="215" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="#5A554E">
                      {d.week}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Quiz Scores Trend (Right 5 cols) */}
        <div className="lg:col-span-5 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Assessment Log
              </div>
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold">
                Recent Diagnostic Scores
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#8C7851]">
              Avg: 86.4%
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {quizScores.map((q, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="font-serif font-bold text-[#1A1A1A]">{q.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5A554E] text-[10px]">{q.date}</span>
                    <span className="font-bold text-[#1A1A1A]">{q.score}%</span>
                  </div>
                </div>
                <div className="w-full h-2 bg-[#F5F2ED] border border-[#1A1A1A] overflow-hidden">
                  <div
                    className="h-full bg-[#1A1A1A]"
                    style={{ width: `${q.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-right">
            <button
              onClick={() => setActiveView('assessment')}
              className="text-xs font-serif italic font-bold text-[#1A1A1A] hover:text-[#8C7851] inline-flex items-center gap-1"
            >
              <span>Take New Assessment Test</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
