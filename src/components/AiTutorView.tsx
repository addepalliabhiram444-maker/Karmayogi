import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Paperclip, 
  RotateCcw, 
  Copy, 
  Check, 
  BookOpen, 
  HelpCircle,
  ArrowRight,
  FileText
} from 'lucide-react';
import { TutorMessage } from '../types';
import { initialTutorMessages } from '../data/mockData';

export const AiTutorView: React.FC = () => {
  const [messages, setMessages] = useState<TutorMessage[]>(initialTutorMessages);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: TutorMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseContent = '';
      let calloutData: { title: string; text: string } | undefined;
      let suggestions: string[] = [];

      if (query.toLowerCase().includes('python') || query.toLowerCase().includes('code')) {
        aiResponseContent = `Here is the standardized Python (Pandas) code snippet for processing NSSO / PLFS microdata records with fixed-width layout and applying sample multipliers:\n\n\`\`\`python\nimport pandas as pd\nimport numpy as np\n\n# 1. Read fixed-width microdata\ncol_specs = [(0, 3), (3, 8), (8, 14), (14, 24)]\ncol_names = ['State_Code', 'FSU_Serial', 'Multiplier', 'Income_Expenditure']\n\ndf = pd.read_fwf('plfs_round.txt', colspecs=col_specs, names=col_names)\n\n# 2. Coerce numeric types & compute weighted aggregate\ndf['Multiplier'] = pd.to_numeric(df['Multiplier'], errors='coerce') / 100.0\ndf['Income_Expenditure'] = pd.to_numeric(df['Income_Expenditure'], errors='coerce')\n\n# 3. Compute population total estimate\nweighted_total = (df['Income_Expenditure'] * df['Multiplier']).sum()\nprint(f"Estimated Population Metric: {weighted_total:,.2f}")\n\`\`\``;
        calloutData = {
          title: 'MoSPI Computational Standard',
          text: 'Always divide the integer Multiplier field by 100 (or 200 for sub-samples) in accordance with the NSSO schedule documentation before calculating population aggregates.'
        };
        suggestions = ['How to compute State-wise aggregates?', 'Explain standard error calculation with survey weights', 'Show me how to filter missing values'];
      } else if (query.toLowerCase().includes('sampling') || query.toLowerCase().includes('stratified')) {
        aiResponseContent = `In India's Official Statistical System, **Multi-Stage Stratified Cluster Sampling** is structured as follows:\n\n1. **First Stage Units (FSUs):** The primary sampling units are Census Villages in rural areas and Urban Frame Survey (UFS) blocks in urban areas.\n2. **Stratification Criterion:** Districts are categorized into strata based on population size, crop patterns, or demographic characteristics to ensure geographical balance.\n3. **Second Stage Units (SSUs):** Households selected within the chosen FSUs using circular systematic random sampling after comprehensive on-ground listing (Schedule 0.0).`;
        calloutData = {
          title: 'Key Field Protocol',
          text: 'When an FSU exceeds 1,200 population, it is segmented into hamlet groups (hg) or sub-blocks (sb) to keep listing manageable.'
        };
        suggestions = ['What is circular systematic sampling?', 'Explain Design Effect (DEFF) in NSSO surveys', 'Give me 3 practice MCQs on sampling'];
      } else {
        aiResponseContent = `Thank you for your question on "${query}". Under India's Official Statistical System guidelines, this topic is governed by the standards laid out by the National Statistical Commission (NSC) and the Data Governance Quality Index (DGQI).\n\nKey Principles:\n• **Transparency:** Clear metadata disclosure of base years and sampling errors.\n• **Sound Methodology:** Compliance with UN-SDMX and SNA 2008 accounting rules.\n• **Reliability:** Rigorous validation through supervisory re-interviews and CAPI soft/hard logic gates.`;
        calloutData = {
          title: 'Curriculum Guidance',
          text: 'You can test your understanding of this topic using the AI Quiz Generator or review the official handbook in your Learning Materials repository.'
        };
        suggestions = ['Explain this with a practical case study', 'Create a 5-question test on this', 'Show Python code for this'];
      }

      const aiMsg: TutorMessage = {
        id: `msg_ai_${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: aiResponseContent,
        callout: calloutData,
        suggestedQuestions: suggestions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1400);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClear = () => {
    setMessages(initialTutorMessages);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Specialized AI Dialog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>Official Knowledge Engine</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            StatLearn AI Tutor
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Inquire on official survey schedules, Python data pipelines, national accounts compilation, and cadre examination syllabi in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-2 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-xs font-mono flex items-center gap-1.5 text-[#5A554E] hover:text-[#1A1A1A] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Conversation</span>
          </button>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] shadow-[6px_6px_0px_#1A1A1A] flex flex-col h-[640px]">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif text-sm font-bold border border-[#1A1A1A] shrink-0 mt-1">
                    AI
                  </div>
                )}

                <div className={`max-w-2xl space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`p-5 border text-xs md:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                        : 'bg-[#F5F2ED] text-[#1A1A1A] border-[#1A1A1A]'
                    }`}
                  >
                    <div className="flex justify-between items-center pb-2 mb-2 border-b border-black/10 text-[10px] font-mono opacity-60">
                      <span>{isUser ? 'Officer Inquiry' : 'StatLearn AI Response'}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="whitespace-pre-line font-editorial">
                      {msg.content}
                    </div>

                    {/* Rich Callout Card if present */}
                    {msg.callout && (
                      <div className="mt-4 p-3.5 bg-[#FDFCFB] border border-[#1A1A1A] text-xs">
                        <div className="text-[10px] uppercase font-mono font-bold text-[#8C7851] mb-1">
                          {msg.callout.title}
                        </div>
                        <p className="text-[#5A554E] font-editorial leading-relaxed">
                          {msg.callout.text}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions / Suggested Questions */}
                  {!isUser && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="px-2 py-1 bg-[#FDFCFB] hover:bg-[#EAE6DF] border border-[#DCD6CC] text-[10px] font-mono text-[#5A554E] flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Response</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Suggested Chips */}
                      {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1.5">
                          {msg.suggestedQuestions.map((chip, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => handleSendMessage(chip)}
                              className="px-3 py-1 bg-[#FDFCFB] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] border border-[#1A1A1A] text-[11px] font-serif italic text-[#1A1A1A] transition-colors"
                            >
                              "{chip}" →
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 bg-[#8C7851] text-[#FDFCFB] flex items-center justify-center font-serif text-sm font-bold border border-[#1A1A1A] shrink-0 mt-1">
                    SG
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-4 items-center text-xs font-mono text-[#8C7851] animate-pulse">
              <div className="w-8 h-8 bg-[#1A1A1A] text-[#FDFCFB] flex items-center justify-center font-serif text-sm font-bold border border-[#1A1A1A]">
                AI
              </div>
              <span>Searching MoSPI Knowledge Base & compiling guidance...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#F5F2ED] border-t-2 border-[#1A1A1A]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-3"
          >
            <button
              type="button"
              onClick={() => alert("Upload reference PDF/DOCX to ground AI Tutor's answers.")}
              className="p-2.5 bg-[#FDFCFB] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[#5A554E] hover:text-[#1A1A1A] transition-colors shrink-0"
              title="Attach Document"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              placeholder="Ask anything (e.g. 'How to calculate weighted standard error in Python?')..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-[#FDFCFB] border border-[#1A1A1A] px-4 py-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:ring-1 focus:ring-[#8C7851]"
            />

            <button
              id="btn-tutor-send"
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] disabled:opacity-40 text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center gap-1.5 transition-all shrink-0"
            >
              <span>Consult</span>
              <Send className="w-3.5 h-3.5 text-[#8C7851]" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
