import React, { useState } from 'react';
import { 
  Sparkles, 
  Upload, 
  FileText, 
  Sliders, 
  CheckCircle2, 
  Play, 
  Download, 
  Clock, 
  HelpCircle, 
  ArrowRight,
  RefreshCw,
  Layers,
  FileCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GeneratedQuiz, UploadedMaterial, AssessmentQuestion } from '../types';
import { uploadedMaterials, sampleGeneratedQuizzes } from '../data/mockData';

export const AiQuizGeneratorView: React.FC = () => {
  const [selectedDocId, setSelectedDocId] = useState<string>(uploadedMaterials[0].id);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Mixed'>('Medium');
  const [questionType, setQuestionType] = useState<'Multiple Choice' | 'True / False' | 'Case Study MCQs'>('Multiple Choice');
  const [language, setLanguage] = useState<'English' | 'Hindi'>('English');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  
  const [quizzesList, setQuizzesList] = useState<GeneratedQuiz[]>(sampleGeneratedQuizzes);
  const [activeTakingQuiz, setActiveTakingQuiz] = useState<GeneratedQuiz | null>(null);
  const [takingIdx, setTakingIdx] = useState(0);
  const [takingAnswers, setTakingAnswers] = useState<Record<number, number>>({});
  const [takingSubmitted, setTakingSubmitted] = useState(false);

  const selectedDoc = uploadedMaterials.find(m => m.id === selectedDocId) || uploadedMaterials[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStep('Ingesting document schema & official classifications...');
    
    setTimeout(() => {
      setGenerationStep('Extracting key statistical methodologies and formulae...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('Synthesizing high-discrimination distractors & explanations...');
    }, 1600);

    setTimeout(() => {
      const newQuiz: GeneratedQuiz = {
        id: `quiz_gen_${Date.now()}`,
        title: `${selectedDoc.topic} AI Verification Quiz`,
        sourceDocName: selectedDoc.name,
        createdAt: 'Just now',
        questionsCount: questionCount,
        difficulty: difficulty,
        status: 'Ready',
        questions: [
          {
            id: 301,
            topic: selectedDoc.topic,
            difficulty: 'Intermediate',
            question: `In reference to "${selectedDoc.name}", what is the mandated protocol for verifying non-sampling errors during district sample audits?`,
            options: [
              'Re-interviewing a 10% random sub-sample of households using supervisory schedules.',
              'Discarding all rural questionnaires without verification.',
              'Applying a fixed 5% arbitrary correction factor across all blocks.',
              'Replacing non-responding households with arbitrary neighbors without logging.'
            ],
            correctIndex: 0,
            explanation: 'Official MoSPI audit standards mandate an independent re-interview of a 10% sub-sample by supervisory officers to evaluate response consistency and enumerator variance.',
            competencyArea: selectedDoc.topic
          },
          {
            id: 302,
            topic: selectedDoc.topic,
            difficulty: 'Advanced',
            question: 'When calibrating sample weights against external census totals, which mathematical technique ensures non-negative calibrated weights?',
            options: [
              'Linear logit distance function or truncated calibration weighting.',
              'Simple unweighted sum interpolation.',
              'Arithmetic mean substitution without constraints.',
              'Random deletion of primary sampling units.'
            ],
            correctIndex: 0,
            explanation: 'The logit distance function bounds the calibration adjustment factors, preventing negative or unrealistically high sample weights in official survey tables.',
            competencyArea: selectedDoc.topic
          }
        ]
      };

      setQuizzesList([newQuiz, ...quizzesList]);
      setIsGenerating(false);
      try {
        confetti({ particleCount: 50, spread: 60 });
      } catch {}
    }, 2400);
  };

  const handleStartTakingQuiz = (quiz: GeneratedQuiz) => {
    setActiveTakingQuiz(quiz);
    setTakingIdx(0);
    setTakingAnswers({});
    setTakingSubmitted(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Automated Question Generator</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>LLM Cadre Evaluator</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            AI Quiz Generator
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Generate rigorous competency quizzes from official MoSPI survey handbooks, methodological notes, and administrative circulars in seconds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F5F2ED] border border-[#1A1A1A] text-xs font-mono">
            <span>Model: </span>
            <strong className="text-[#1A1A1A]">Gemini 2.5 Flash (Statistical Fine-Tuned)</strong>
          </div>
        </div>
      </div>

      {/* Main Grid: Upload & Config (Left 6 cols) + Generations List (Right 6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Upload & Parameters */}
        <div className="lg:col-span-6 space-y-6">
          {/* Document Selection Card */}
          <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
              Step 01 • Select Reference Document
            </div>

            {/* Drag Drop Area */}
            <div className="p-6 border-2 border-dashed border-[#1A1A1A] bg-[#F5F2ED] text-center space-y-2">
              <Upload className="w-6 h-6 text-[#8C7851] mx-auto" />
              <div className="text-xs font-serif font-bold text-[#1A1A1A]">
                Drag & Drop official circular or handbook (PDF / DOCX)
              </div>
              <p className="text-[10px] text-[#5A554E]">or select from pre-loaded official repository:</p>
            </div>

            {/* Quick Sample Selector */}
            <div className="space-y-2 pt-1">
              <label className="text-[11px] uppercase font-mono font-bold text-[#1A1A1A]">
                Pre-Loaded Official Documents:
              </label>
              <div className="space-y-2">
                {uploadedMaterials.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-3 border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      selectedDocId === doc.id
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A] shadow-sm'
                        : 'bg-[#FDFCFB] text-[#1A1A1A] border-[#DCD6CC] hover:bg-[#F5F2ED]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className={`w-4 h-4 ${selectedDocId === doc.id ? 'text-[#8C7851]' : 'text-[#5A554E]'}`} />
                      <div>
                        <div className="font-serif font-bold leading-tight">{doc.name}</div>
                        <div className={`text-[9px] uppercase font-mono mt-0.5 ${selectedDocId === doc.id ? 'text-[#C8C2B7]' : 'text-[#8C7851]'}`}>
                          {doc.topic} • {doc.size}
                        </div>
                      </div>
                    </div>
                    {selectedDocId === doc.id && (
                      <CheckCircle2 className="w-4 h-4 text-[#8C7851]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz Configuration Card */}
          <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-5">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
              Step 02 • Configure Diagnostic Parameters
            </div>

            {/* Question Count Slider */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-2">
                <label className="uppercase font-bold text-[#1A1A1A]">Question Count</label>
                <span className="font-bold text-[#8C7851]">{questionCount} Questions</span>
              </div>
              <input
                type="range"
                min={5}
                max={25}
                step={5}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-[#1A1A1A] cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-[#5A554E] mt-1">
                <span>5 Quick</span>
                <span>10 Standard</span>
                <span>15 Extended</span>
                <span>25 Comprehensive</span>
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                Difficulty Standard
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['Easy', 'Medium', 'Hard', 'Mixed'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 text-[10px] uppercase font-mono font-bold border transition-colors ${
                      difficulty === diff
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                        : 'bg-[#F5F2ED] text-[#5A554E] border-[#DCD6CC] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Type & Language */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-1.5">
                  Format
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value as any)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] px-2.5 py-2 text-xs text-[#1A1A1A] focus:outline-none"
                >
                  <option value="Multiple Choice">Multiple Choice (4 Options)</option>
                  <option value="True / False">True / False Statements</option>
                  <option value="Case Study MCQs">Case Study Field Scenarios</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-1.5">
                  Medium of Examination
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] px-2.5 py-2 text-xs text-[#1A1A1A] focus:outline-none"
                >
                  <option value="English">English (Official Standard)</option>
                  <option value="Hindi">Hindi (राजभाषा)</option>
                </select>
              </div>
            </div>

            {/* Action Button */}
            <button
              id="btn-generate-ai-quiz"
              disabled={isGenerating}
              onClick={handleGenerate}
              className="w-full py-3.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs uppercase tracking-[0.2em] font-bold border border-[#1A1A1A] flex items-center justify-center gap-2 transition-all shadow-md"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#8C7851]" />
                  <span>Synthesizing ({generationStep})</span>
                </div>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#8C7851]" />
                  <span>Generate Quiz with AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Generated Quizzes Archive or Active Quiz Taking */}
        <div className="lg:col-span-6 space-y-6">
          {!activeTakingQuiz ? (
            <div className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-6">
              <div className="flex justify-between items-center pb-3 border-b border-[#1A1A1A]">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
                    Archive & Ready Tests
                  </div>
                  <h3 className="text-xl font-serif italic text-[#1A1A1A] font-semibold">
                    Generated Quiz Repository
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#5A554E]">
                  {quizzesList.length} Quizzes Available
                </span>
              </div>

              <div className="space-y-4">
                {quizzesList.map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-5 bg-[#F5F2ED] border border-[#1A1A1A] space-y-3 hover:shadow-md transition-all group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase font-mono font-bold px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB]">
                          {quiz.difficulty} • {quiz.questionsCount} MCQs
                        </span>
                        <h4 className="text-base font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] transition-colors">
                          {quiz.title}
                        </h4>
                        <div className="text-[10px] font-mono text-[#5A554E]">
                          Source: {quiz.sourceDocName} ({quiz.createdAt})
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2DDD5] flex items-center justify-between">
                      <button
                        onClick={() => alert(`Exporting ${quiz.title} as MoSPI standard PDF assessment sheet...`)}
                        className="text-[10px] uppercase font-mono text-[#5A554E] hover:text-[#1A1A1A] flex items-center gap-1"
                      >
                        <Download className="w-3 h-3" />
                        <span>Export PDF</span>
                      </button>

                      <button
                        onClick={() => handleStartTakingQuiz(quiz)}
                        className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-[#8C7851] text-[#8C7851]" />
                        <span>Take Quiz</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Active Interactive Quiz Taker Modal / Card */
            <div className="p-6 bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] space-y-6">
              <div className="flex justify-between items-start pb-3 border-b border-[#1A1A1A]">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C7851] font-bold">
                    Active Test Taker
                  </span>
                  <h3 className="text-xl font-serif italic text-[#1A1A1A] font-bold">
                    {activeTakingQuiz.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTakingQuiz(null)}
                  className="text-xs font-mono text-[#5A554E] hover:underline"
                >
                  Exit Test
                </button>
              </div>

              {!takingSubmitted ? (
                <div className="space-y-4">
                  {/* Current Question */}
                  {(() => {
                    const q = activeTakingQuiz.questions[takingIdx] || activeTakingQuiz.questions[0];
                    return (
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="font-bold text-[#8C7851]">
                            Item {takingIdx + 1} of {activeTakingQuiz.questions.length}
                          </span>
                          <span>{q.topic}</span>
                        </div>

                        <p className="text-base font-serif text-[#1A1A1A]">{q.question}</p>

                        <div className="space-y-2 pt-1">
                          {q.options.map((opt, oIdx) => {
                            const isChosen = takingAnswers[takingIdx] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => setTakingAnswers({ ...takingAnswers, [takingIdx]: oIdx })}
                                className={`w-full text-left p-3 border text-xs flex items-center gap-3 transition-all ${
                                  isChosen
                                    ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A] font-bold'
                                    : 'bg-[#F5F2ED] text-[#1A1A1A] border-[#DCD6CC] hover:border-[#1A1A1A]'
                                }`}
                              >
                                <span className={`w-5 h-5 flex items-center justify-center font-mono text-[10px] border ${
                                  isChosen ? 'bg-[#8C7851] text-[#FDFCFB]' : 'bg-[#FDFCFB]'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        <div className="pt-4 border-t border-[#E2DDD5] flex justify-between">
                          <button
                            disabled={takingIdx === 0}
                            onClick={() => setTakingIdx(takingIdx - 1)}
                            className="px-3 py-1.5 bg-[#F5F2ED] disabled:opacity-40 border border-[#1A1A1A] text-xs"
                          >
                            Back
                          </button>

                          {takingIdx < activeTakingQuiz.questions.length - 1 ? (
                            <button
                              onClick={() => setTakingIdx(takingIdx + 1)}
                              className="px-4 py-1.5 bg-[#1A1A1A] text-[#FDFCFB] text-xs font-serif italic font-bold"
                            >
                              Next
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                setTakingSubmitted(true);
                                try { confetti(); } catch {}
                              }}
                              className="px-4 py-1.5 bg-[#8C7851] text-[#FDFCFB] text-xs uppercase font-mono font-bold"
                            >
                              Submit Evaluation
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <div className="space-y-4 text-center py-4">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="text-2xl font-serif italic text-[#1A1A1A] font-bold">
                    Test Completed!
                  </h4>
                  <p className="text-xs font-editorial text-[#5A554E]">
                    Your answers for <strong>{activeTakingQuiz.title}</strong> have been verified and added to your competency tracking record.
                  </p>
                  <button
                    onClick={() => setActiveTakingQuiz(null)}
                    className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A]"
                  >
                    Return to Quiz Repository
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
