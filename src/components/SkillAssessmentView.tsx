import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Sparkles,
  Bookmark,
  Share2,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { AssessmentQuestion, AppView } from '../types';
import { assessmentQuestions } from '../data/mockData';

interface SkillAssessmentViewProps {
  setActiveView: (view: AppView) => void;
  onUpdateCompetencyScore: (score: number) => void;
}

export const SkillAssessmentView: React.FC<SkillAssessmentViewProps> = ({
  setActiveView,
  onUpdateCompetencyScore
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({
    0: 1, // sample pre-filled answer for demonstration
    1: 0
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(480); // 8 mins
  const [flagged, setFlagged] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = assessmentQuestions[currentIdx];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentIdx]: optIdx
    }));
  };

  const toggleFlag = () => {
    setFlagged(prev => 
      prev.includes(currentIdx) ? prev.filter(x => x !== currentIdx) : [...prev, currentIdx]
    );
  };

  const calculateScore = () => {
    let correct = 0;
    assessmentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });
    return Math.round((correct / assessmentQuestions.length) * 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    onUpdateCompetencyScore(score);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback if canvas not available
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setTimerSeconds(480);
    setShowExplanation(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Diagnostic & Evaluation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Standardized MoSPI Cadre Test</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Official Statistical Competency Assessment
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Timed evaluation measuring survey methodology, microdata computation, price index aggregation, and National Indicator Framework principles.
          </p>
        </div>

        {!isSubmitted && (
          <div className="flex items-center gap-3 bg-[#F5F2ED] border border-[#1A1A1A] px-4 py-2 text-xs font-mono font-bold">
            <Clock className="w-4 h-4 text-[#8C7851]" />
            <span>Time Remaining: {formatTime(timerSeconds)}</span>
          </div>
        )}
      </div>

      {!isSubmitted ? (
        /* Assessment Active Mode */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Question Card (Left 8 cols) */}
          <div className="lg:col-span-8 p-6 md:p-8 bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A] space-y-6">
            {/* Question Meta Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-[#1A1A1A]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-mono uppercase font-bold">
                  Question {currentIdx + 1} of {assessmentQuestions.length}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-[#8C7851] font-mono font-bold">
                  • {currentQ.topic}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase font-mono px-2 py-0.5 bg-[#F5F2ED] border border-[#DCD6CC]">
                  {currentQ.difficulty}
                </span>
                <button
                  onClick={toggleFlag}
                  className={`p-1.5 border transition-colors ${
                    flagged.includes(currentIdx)
                      ? 'bg-amber-100 border-amber-500 text-amber-800'
                      : 'border-[#DCD6CC] text-[#5A554E] hover:border-[#1A1A1A]'
                  }`}
                  title="Flag for review"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Question Text in Editorial Serif */}
            <div className="py-2">
              <h2 className="text-xl md:text-2xl font-serif text-[#1A1A1A] leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = selectedAnswers[currentIdx] === optIdx;
                const letter = String.fromCharCode(65 + optIdx);

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 border transition-all flex items-start gap-4 ${
                      isSelected
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A] shadow-sm font-medium'
                        : 'bg-[#FDFCFB] text-[#1A1A1A] border-[#1A1A1A] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 flex items-center justify-center font-mono text-xs font-bold shrink-0 border ${
                        isSelected
                          ? 'bg-[#8C7851] text-[#FDFCFB] border-[#8C7851]'
                          : 'bg-[#F5F2ED] text-[#1A1A1A] border-[#1A1A1A]'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-xs md:text-sm font-editorial leading-relaxed">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-6 border-t border-[#1A1A1A] flex justify-between items-center">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                className="px-4 py-2 bg-[#F5F2ED] hover:bg-[#EAE6DF] disabled:opacity-40 disabled:hover:bg-[#F5F2ED] text-[#1A1A1A] text-xs font-medium border border-[#1A1A1A] flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-3">
                {currentIdx < assessmentQuestions.length - 1 ? (
                  <button
                    onClick={() => setCurrentIdx(prev => Math.min(assessmentQuestions.length - 1, prev + 1))}
                    className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center gap-2 transition-all"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
                  </button>
                ) : (
                  <button
                    id="btn-submit-assessment"
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[#8C7851] hover:bg-[#1A1A1A] text-[#FDFCFB] text-xs uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] flex items-center gap-2 transition-all shadow-md"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>Submit Evaluation</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Navigation Pallet (Right 4 cols) */}
          <div className="lg:col-span-4 p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-6">
            <div className="pb-3 border-b border-[#1A1A1A]">
              <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                Test Progress
              </div>
              <h3 className="text-lg font-serif italic text-[#1A1A1A] font-semibold">
                Question Index
              </h3>
            </div>

            {/* Matrix of question buttons */}
            <div className="grid grid-cols-5 gap-2">
              {assessmentQuestions.map((q, idx) => {
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isCurrent = currentIdx === idx;
                const isFlagged = flagged.includes(idx);

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={`aspect-square text-xs font-mono font-bold flex flex-col items-center justify-center border transition-all relative ${
                      isCurrent
                        ? 'ring-2 ring-[#8C7851] bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                        : isAnswered
                        ? 'bg-[#F5F2ED] border-[#1A1A1A] text-[#1A1A1A]'
                        : 'bg-[#FDFCFB] border-[#DCD6CC] text-[#5A554E] hover:border-[#1A1A1A]'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isFlagged && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-[#E2DDD5] space-y-2 text-[11px] font-mono text-[#5A554E]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#F5F2ED] border border-[#1A1A1A] inline-block" />
                <span>Answered ({Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#FDFCFB] border border-[#DCD6CC] inline-block" />
                <span>Unanswered ({assessmentQuestions.length - Object.keys(selectedAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-amber-200 border border-amber-500 inline-block" />
                <span>Flagged for Review ({flagged.length})</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A]">
              <button
                onClick={handleSubmit}
                className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs uppercase tracking-[0.18em] font-bold border border-[#1A1A1A] transition-all"
              >
                Complete Diagnostic
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Assessment Results & AI Feedback Mode */
        <div className="space-y-8">
          <div className="p-8 bg-[#F5F2ED] border-2 border-[#1A1A1A] shadow-[4px_4px_0px_#1A1A1A]">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] uppercase tracking-[0.25em] font-bold">
                <Award className="w-4 h-4 text-[#8C7851]" />
                <span>Diagnostic Evaluation Completed</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
                <h2 className="text-4xl md:text-5xl font-serif italic text-[#1A1A1A] font-bold">
                  Score: {calculateScore()}%
                </h2>
                <span className="text-sm uppercase font-mono font-bold px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Level 4 Qualification Maintained
                </span>
              </div>

              <p className="text-xs md:text-sm font-editorial text-[#5A554E] leading-relaxed">
                StatLearn AI has updated your competency matrix. You demonstrated high mastery in <strong>Survey Methodology (100%)</strong> and <strong>Official Statistics Frameworks</strong>. We recommend completing the Python data cleaning module in Phase II.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] transition-all flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4 text-[#8C7851]" />
                  <span>{showExplanation ? 'Hide Detailed Explanations' : 'Review Answers & Explanations'}</span>
                </button>
                <button
                  onClick={() => setActiveView('competencies')}
                  className="px-4 py-2.5 bg-[#FDFCFB] hover:bg-[#EAE6DF] text-[#1A1A1A] text-xs font-medium border border-[#1A1A1A] transition-colors flex items-center gap-1.5"
                >
                  <span>View Updated Competency Radar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8C7851]" />
                </button>
                <button
                  onClick={handleRetake}
                  className="px-3.5 py-2.5 bg-transparent hover:bg-[#EAE6DF] text-[#5A554E] text-xs font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Question Review List */}
          {showExplanation && (
            <div className="space-y-4">
              <h3 className="text-xl font-serif italic text-[#1A1A1A] font-bold">
                Item-by-Item Review & Official Explanations
              </h3>

              {assessmentQuestions.map((q, idx) => {
                const userAns = selectedAnswers[idx];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 border-2 bg-[#FDFCFB] space-y-4 ${
                      isCorrect ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB]">
                          Q{idx + 1}
                        </span>
                        <span className="text-[10px] uppercase font-mono text-[#8C7851] font-bold">
                          {q.competencyArea}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs font-bold font-mono">
                        {isCorrect ? (
                          <span className="text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct (+1.0)
                          </span>
                        ) : (
                          <span className="text-rose-700 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> Incorrect (0.0)
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-base font-serif text-[#1A1A1A]">{q.question}</p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userAns === oIdx;
                        const isAnswer = q.correctIndex === oIdx;

                        return (
                          <div
                            key={oIdx}
                            className={`p-3 border text-xs flex items-center justify-between ${
                              isAnswer
                                ? 'bg-emerald-50 border-emerald-600 font-bold text-emerald-950'
                                : isChosen
                                ? 'bg-rose-50 border-rose-600 text-rose-950'
                                : 'bg-[#FDFCFB] border-[#DCD6CC] text-[#5A554E]'
                            }`}
                          >
                            <span>
                              <strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}
                            </span>
                            {isAnswer && <span className="text-[10px] uppercase font-mono text-emerald-800">Correct Answer</span>}
                            {!isAnswer && isChosen && <span className="text-[10px] uppercase font-mono text-rose-800">Your Selection</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] text-xs">
                      <div className="text-[10px] uppercase font-mono font-bold text-[#8C7851] mb-1">
                        Official MoSPI Technical Note & Explanation
                      </div>
                      <p className="text-[#5A554E] leading-relaxed font-editorial">
                        {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
