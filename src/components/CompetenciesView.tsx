import React, { useState } from 'react';
import { 
  Target, 
  Sparkles, 
  Download, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Filter,
  BarChart2,
  ChevronDown,
  ChevronUp,
  FileCheck
} from 'lucide-react';
import { CompetencyItem, RadarDataPoint, AppView } from '../types';
import { radarData, competencyItems } from '../data/mockData';

interface CompetenciesViewProps {
  setActiveView: (view: AppView) => void;
  onOpenGeneratePlan: () => void;
  onSelectCourse: (courseTitle: string) => void;
}

export const CompetenciesView: React.FC<CompetenciesViewProps> = ({
  setActiveView,
  onOpenGeneratePlan,
  onSelectCourse
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'Action Needed' | 'Developing' | 'Strong'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('comp_1');
  const [activeRadarSubject, setActiveRadarSubject] = useState<string | null>(null);

  const filteredCompetencies = competencyItems.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  // Calculate SVG Radar coordinates
  const size = 320;
  const center = size / 2;
  const radius = center - 45;
  const numPoints = radarData.length;

  const getCoordinates = (index: number, value: number, maxVal = 100) => {
    const angle = (Math.PI * 2 / numPoints) * index - Math.PI / 2;
    const dist = (value / maxVal) * radius;
    const x = center + dist * Math.cos(angle);
    const y = center + dist * Math.sin(angle);
    return { x, y };
  };

  // Polygon points
  const currentPoints = radarData.map((d, i) => {
    const { x, y } = getCoordinates(i, d.current);
    return `${x},${y}`;
  }).join(' ');

  const targetPoints = radarData.map((d, i) => {
    const { x, y } = getCoordinates(i, d.target);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Competency Assessment Directorate</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Cadre Framework 2024</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            My Competencies & Skill Matrix
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Multi-dimensional evaluation across official survey methodology, national accounting, statistical computing, and computational governance standards.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-generate-learning-plan"
            onClick={onOpenGeneratePlan}
            className="px-4 py-2.5 bg-[#1A1A1A] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] hover:bg-[#8C7851] transition-all flex items-center gap-2 shadow-[2px_2px_0px_#8C7851]"
          >
            <Sparkles className="w-4 h-4 text-[#8C7851]" />
            <span>Generate My Learning Plan</span>
          </button>
          <button
            onClick={() => alert("Competency Matrix Report (PDF) generated with official MoSPI seal.")}
            className="px-3.5 py-2.5 bg-[#F5F2ED] text-[#1A1A1A] text-xs font-medium border border-[#1A1A1A] hover:bg-[#EAE6DF] transition-all flex items-center gap-1.5"
            title="Download PDF"
          >
            <Download className="w-4 h-4 text-[#8C7851]" />
            <span className="hidden sm:inline">Export PDF</span>
          </button>
        </div>
      </div>

      {/* Top Grid: Radar Chart + Priority Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 cols: Radar Chart */}
        <div className="lg:col-span-6 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col items-center">
          <div className="w-full flex justify-between items-center pb-3 border-b border-[#1A1A1A] mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Competency Distribution
              </div>
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold">
                Cadre Hexagon Radar
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#1A1A1A] inline-block border border-[#1A1A1A]" />
                <span>Current</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-transparent border border-dashed border-[#8C7851] inline-block" />
                <span className="text-[#8C7851] font-bold">Target</span>
              </div>
            </div>
          </div>

          {/* SVG Radar */}
          <div className="relative my-2">
            <svg width={size} height={size} className="overflow-visible">
              {/* Concentric rings */}
              {[0.25, 0.5, 0.75, 1].map((level, i) => {
                const ringPoints = radarData.map((_, idx) => {
                  const { x, y } = getCoordinates(idx, level * 100);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <g key={i}>
                    <polygon
                      points={ringPoints}
                      fill={i === 3 ? '#F5F2ED' : 'transparent'}
                      stroke="#DCD6CC"
                      strokeWidth="1"
                    />
                    <text
                      x={center + 4}
                      y={center - (level * radius) + 10}
                      fontSize="8"
                      fill="#8C7851"
                      fontFamily="monospace"
                    >
                      {level * 100}%
                    </text>
                  </g>
                );
              })}

              {/* Axis lines */}
              {radarData.map((_, i) => {
                const { x, y } = getCoordinates(i, 100);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="#DCD6CC"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Target Polygon */}
              <polygon
                points={targetPoints}
                fill="transparent"
                stroke="#8C7851"
                strokeWidth="2"
                strokeDasharray="4 3"
              />

              {/* Current Polygon */}
              <polygon
                points={currentPoints}
                fill="#1A1A1A"
                fillOpacity="0.2"
                stroke="#1A1A1A"
                strokeWidth="2"
              />

              {/* Nodes and Labels */}
              {radarData.map((d, i) => {
                const currentCoord = getCoordinates(i, d.current);
                const targetCoord = getCoordinates(i, d.target);
                const labelCoord = getCoordinates(i, 120);
                const isHovered = activeRadarSubject === d.subject;

                return (
                  <g
                    key={i}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveRadarSubject(d.subject)}
                    onMouseLeave={() => setActiveRadarSubject(null)}
                  >
                    {/* Target Node */}
                    <circle
                      cx={targetCoord.x}
                      cy={targetCoord.y}
                      r="3.5"
                      fill="#8C7851"
                    />

                    {/* Current Node */}
                    <circle
                      cx={currentCoord.x}
                      cy={currentCoord.y}
                      r={isHovered ? "6" : "4.5"}
                      fill="#1A1A1A"
                      stroke="#FDFCFB"
                      strokeWidth="1.5"
                    />

                    {/* Label */}
                    <text
                      x={labelCoord.x}
                      y={labelCoord.y}
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight={isHovered ? "bold" : "normal"}
                      fill={isHovered ? "#8C7851" : "#1A1A1A"}
                      fontFamily="inherit"
                      className="transition-colors uppercase tracking-wider"
                    >
                      {d.subject}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Radar Highlight Info */}
          <div className="w-full mt-4 p-3 bg-[#F5F2ED] border border-[#DCD6CC] text-xs flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono font-bold text-[#8C7851]">Active Metric:</span>
              <span className="font-serif font-bold text-[#1A1A1A]">
                {activeRadarSubject || 'Hover any node on hexagon'}
              </span>
            </div>
            {activeRadarSubject && (
              <span className="font-mono text-xs font-bold text-[#1A1A1A]">
                {radarData.find(r => r.subject === activeRadarSubject)?.current}% / {radarData.find(r => r.subject === activeRadarSubject)?.target}% Target
              </span>
            )}
          </div>
        </div>

        {/* Right 6 cols: Competency Gaps Analysis */}
        <div className="lg:col-span-6 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A] mb-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                  Disparity Analysis
                </div>
                <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold">
                  Identified Competency Gaps
                </h3>
              </div>
              <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 bg-rose-100 text-rose-900 border border-rose-300">
                Action Required
              </span>
            </div>

            <p className="text-xs font-editorial text-[#5A554E] leading-relaxed mb-4">
              The AI assessment engine identified 3 primary technical vectors where your current benchmark deviates from the Level 5 Cadre standard.
            </p>

            <div className="space-y-4">
              {/* Gap 1 */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 bg-rose-200 text-rose-900 border border-rose-400">
                      High Priority Gap (-33%)
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#1A1A1A] mt-1.5">
                      Python for Statistical Analysis
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-serif font-bold text-[#1A1A1A]">42% <span className="text-xs text-[#5A554E] font-normal">/ 75%</span></div>
                  </div>
                </div>

                <p className="text-[11px] text-[#5A554E] leading-relaxed">
                  Focus: Pandas data manipulation, fixed-width microdata ingestion, and automated data cleaning pipelines.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#E2DDD5]">
                  <span className="text-[10px] text-[#8C7851] font-mono font-bold">Recommended: iGOT Python L1</span>
                  <button
                    onClick={() => {
                      onSelectCourse('Python for Data Analysis & Statistical Visualization');
                      setActiveView('courses');
                    }}
                    className="text-[10px] uppercase font-mono font-bold text-[#1A1A1A] hover:text-[#8C7851] flex items-center gap-1"
                  >
                    <span>Start Module</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Gap 2 */}
              <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.5 bg-rose-200 text-rose-900 border border-rose-400">
                      High Priority Gap (-27%)
                    </span>
                    <h4 className="text-sm font-serif font-bold text-[#1A1A1A] mt-1.5">
                      Statistical Computing & Sampling Calibration
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-serif font-bold text-[#1A1A1A]">48% <span className="text-xs text-[#5A554E] font-normal">/ 75%</span></div>
                  </div>
                </div>

                <p className="text-[11px] text-[#5A554E] leading-relaxed">
                  Focus: Multi-stage stratified cluster sampling, survey weight calculation, and non-sampling error control.
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-[#E2DDD5]">
                  <span className="text-[10px] text-[#8C7851] font-mono font-bold">Recommended: SDRD Sampling Handbook</span>
                  <button
                    onClick={() => setActiveView('materials')}
                    className="text-[10px] uppercase font-mono font-bold text-[#1A1A1A] hover:text-[#8C7851] flex items-center gap-1"
                  >
                    <span>Review Manual</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2DDD5] text-right">
            <button
              onClick={() => setActiveView('assessment')}
              className="text-xs font-serif italic font-bold text-[#1A1A1A] hover:text-[#8C7851] inline-flex items-center gap-1.5"
            >
              <span>Launch Competency Diagnostic Test</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Skill Matrix Table / Breakdown */}
      <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1A1A1A] mb-6 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
              Detailed Breakdown
            </div>
            <h3 className="text-xl font-serif italic text-[#1A1A1A] font-semibold">
              Competency Directory & Module Progress
            </h3>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#F5F2ED] p-1 border border-[#DCD6CC]">
            {(['all', 'Action Needed', 'Developing', 'Strong'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold transition-all ${
                  filterStatus === st
                    ? 'bg-[#1A1A1A] text-[#FDFCFB] border border-[#1A1A1A]'
                    : 'text-[#5A554E] hover:text-[#1A1A1A]'
                }`}
              >
                {st === 'all' ? 'All (5)' : st}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredCompetencies.map((comp) => {
            const isExpanded = expandedId === comp.id;
            return (
              <div
                key={comp.id}
                className="border border-[#1A1A1A] bg-[#FDFCFB] transition-all"
              >
                {/* Collapsed Header */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : comp.id)}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-[#F5F2ED] transition-colors"
                >
                  <div className="flex items-start md:items-center gap-3">
                    <div className={`p-1.5 border shrink-0 ${
                      comp.status === 'Strong' 
                        ? 'bg-emerald-100 border-emerald-400 text-emerald-900' 
                        : comp.status === 'Developing'
                        ? 'bg-amber-100 border-amber-400 text-amber-900'
                        : 'bg-rose-100 border-rose-400 text-rose-900'
                    }`}>
                      {comp.status === 'Strong' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-serif font-bold text-[#1A1A1A]">{comp.name}</span>
                        <span className="text-[9px] uppercase font-mono text-[#8C7851]">• {comp.category}</span>
                      </div>
                      <p className="text-[11px] text-[#5A554E] line-clamp-1 mt-0.5">
                        {comp.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 shrink-0">
                    {/* Score Bar */}
                    <div className="w-36 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono">
                        <span className="font-bold">{comp.currentScore}%</span>
                        <span className="text-[#5A554E]">Target: {comp.targetScore}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#F5F2ED] border border-[#1A1A1A] overflow-hidden">
                        <div
                          className={`h-full ${
                            comp.status === 'Strong' ? 'bg-emerald-700' : comp.status === 'Developing' ? 'bg-[#8C7851]' : 'bg-rose-700'
                          }`}
                          style={{ width: `${comp.currentScore}%` }}
                        />
                      </div>
                    </div>

                    <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 border ${
                      comp.status === 'Strong' 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300' 
                        : comp.status === 'Developing'
                        ? 'bg-amber-50 text-amber-900 border-amber-300'
                        : 'bg-rose-50 text-rose-900 border-rose-300'
                    }`}>
                      {comp.status}
                    </span>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-[#5A554E]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5A554E]" />
                    )}
                  </div>
                </div>

                {/* Expanded Detail Panel */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#E2DDD5] bg-[#F5F2ED] space-y-3 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-mono font-bold text-[#8C7851] mb-1">
                          Curriculum Scope & Standards
                        </div>
                        <p className="text-[11px] text-[#5A554E] leading-relaxed">
                          {comp.description} This competency maps directly to MoSPI cadre classification criteria and UN-SDMX data exchange protocols.
                        </p>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase font-mono font-bold text-[#8C7851] mb-1">
                          Recommended iGOT Learning Module
                        </div>
                        <div className="p-3 bg-[#FDFCFB] border border-[#1A1A1A] flex items-center justify-between">
                          <span className="font-serif font-bold text-[#1A1A1A] text-xs">
                            {comp.recommendedModule}
                          </span>
                          <button
                            onClick={() => {
                              onSelectCourse(comp.recommendedModule);
                              setActiveView('courses');
                            }}
                            className="px-2.5 py-1 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-[10px] uppercase font-mono font-bold transition-colors"
                          >
                            Enroll
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
