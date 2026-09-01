import React, { useState } from 'react';
import { 
  Milestone, 
  CheckCircle2, 
  Lock, 
  Play, 
  Award, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  BookOpen,
  FileCheck
} from 'lucide-react';
import { LearningPhase, AppView } from '../types';
import { learningPhases } from '../data/mockData';

interface LearningPathViewProps {
  setActiveView: (view: AppView) => void;
  onResumeCourse: (courseId: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  setActiveView,
  onResumeCourse
}) => {
  const [selectedPhase, setSelectedPhase] = useState<string>('phase_2');

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Adaptive Roadmap</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Cadre Progression Track</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Personalized Learning Path
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Curated 3-phase progression synthesized by StatLearn AI to advance your capabilities from Level 4 Analyst to Level 5 Senior Statistical Specialist.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F5F2ED] border border-[#1A1A1A] text-xs font-mono">
            <span className="text-[#5A554E]">Overall Roadmap: </span>
            <strong className="text-[#1A1A1A]">64% Completed</strong>
          </div>
        </div>
      </div>

      {/* 3-Phase Roadmap Timeline */}
      <div className="space-y-6">
        {learningPhases.map((phase) => {
          const isCompleted = phase.status === 'Completed';
          const isInProgress = phase.status === 'In Progress';
          const isLocked = phase.status === 'Locked';

          return (
            <div
              key={phase.id}
              className={`border-2 transition-all p-6 md:p-8 relative ${
                isInProgress
                  ? 'border-[#1A1A1A] bg-[#FDFCFB] shadow-[6px_6px_0px_#1A1A1A]'
                  : isCompleted
                  ? 'border-[#1A1A1A] bg-[#F5F2ED]'
                  : 'border-[#DCD6CC] bg-[#FAF8F5] opacity-75'
              }`}
            >
              {/* Phase Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1A1A1A] gap-4 mb-6">
                <div className="flex items-start md:items-center gap-4">
                  <div className={`w-10 h-10 flex items-center justify-center font-serif text-lg font-bold border shrink-0 ${
                    isCompleted
                      ? 'bg-emerald-900 text-[#FDFCFB] border-emerald-900'
                      : isInProgress
                      ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                      : 'bg-[#EAE6DF] text-[#5A554E] border-[#DCD6CC]'
                  }`}>
                    0{phase.phaseNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C7851] font-bold">
                        Phase {phase.phaseNumber}
                      </span>
                      <span className={`text-[9px] uppercase font-mono font-bold px-2 py-0.5 border ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : isInProgress
                          ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                          : 'bg-[#EAE6DF] text-[#5A554E] border-[#DCD6CC]'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-serif italic text-[#1A1A1A] font-semibold mt-0.5">
                      {phase.title}
                    </h2>
                    <p className="text-xs text-[#5A554E] font-editorial mt-0.5">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-32 space-y-1">
                    <div className="flex justify-between text-[10px] font-mono">
                      <span>Phase Progress</span>
                      <span className="font-bold">{phase.progressPercentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E2DDD5] border border-[#1A1A1A] overflow-hidden">
                      <div
                        className={`h-full ${isCompleted ? 'bg-emerald-700' : 'bg-[#1A1A1A]'}`}
                        style={{ width: `${phase.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Courses in Phase */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {phase.courses.map((course) => {
                  const courseCompleted = course.status === 'Completed';
                  const courseInProgress = course.status === 'In Progress';
                  const courseUpNext = course.status === 'Up Next';
                  const courseLocked = course.status === 'Locked';

                  return (
                    <div
                      key={course.id}
                      className={`p-5 border flex flex-col justify-between transition-all ${
                        courseInProgress
                          ? 'bg-[#FDFCFB] border-[#1A1A1A] shadow-md ring-1 ring-[#8C7851]'
                          : courseCompleted
                          ? 'bg-[#FDFCFB] border-[#1A1A1A]'
                          : 'bg-[#F5F2ED] border-[#DCD6CC]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-[#8C7851] font-bold uppercase">{course.level}</span>
                          <span className="text-[#5A554E] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </span>
                        </div>

                        <h3 className="text-sm font-serif font-bold text-[#1A1A1A] leading-snug">
                          {course.title}
                        </h3>

                        {/* Skill Tags */}
                        <div className="flex flex-wrap gap-1 pt-1">
                          {course.skills.map((skill, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[9px] uppercase tracking-wider font-mono px-1.5 py-0.5 bg-[#F5F2ED] border border-[#DCD6CC] text-[#5A554E]"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#E2DDD5] flex items-center justify-between">
                        <span className={`text-[9px] uppercase font-mono font-bold ${
                          courseCompleted
                            ? 'text-emerald-800'
                            : courseInProgress
                            ? 'text-[#1A1A1A]'
                            : 'text-[#5A554E]'
                        }`}>
                          {course.status}
                        </span>

                        {courseCompleted ? (
                          <button
                            onClick={() => alert(`Certificate for ${course.title} verified by MoSPI NSSTA.`)}
                            className="px-2.5 py-1 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-colors"
                          >
                            <Award className="w-3 h-3 text-[#8C7851]" />
                            <span>Certificate</span>
                          </button>
                        ) : courseInProgress ? (
                          <button
                            onClick={() => onResumeCourse('igot_01')}
                            className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-colors"
                          >
                            <Play className="w-3 h-3 fill-[#8C7851] text-[#8C7851]" />
                            <span>Resume</span>
                          </button>
                        ) : courseUpNext ? (
                          <button
                            onClick={() => {
                              setActiveView('courses');
                            }}
                            className="px-2.5 py-1 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] uppercase font-mono font-bold flex items-center gap-1 transition-colors"
                          >
                            <span>Start Next</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <div className="flex items-center gap-1 text-[10px] font-mono text-[#5A554E]">
                            <Lock className="w-3 h-3" />
                            <span>Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
