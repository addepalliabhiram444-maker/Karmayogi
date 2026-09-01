import React, { useState } from 'react';
import { 
  FolderArchive, 
  Search, 
  Upload, 
  FileText, 
  Download, 
  Sparkles, 
  Bot, 
  Eye, 
  Plus, 
  Check, 
  X,
  BookOpen
} from 'lucide-react';
import { UploadedMaterial, AppView } from '../types';
import { uploadedMaterials } from '../data/mockData';

interface LearningMaterialsViewProps {
  setActiveView: (view: AppView) => void;
  onAskTutorAboutDoc?: (docName: string) => void;
  onGenerateQuizFromDoc?: (docId: string) => void;
}

export const LearningMaterialsView: React.FC<LearningMaterialsViewProps> = ({
  setActiveView,
  onAskTutorAboutDoc,
  onGenerateQuizFromDoc
}) => {
  const [materials, setMaterials] = useState<UploadedMaterial[]>(uploadedMaterials);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<UploadedMaterial | null>(null);

  // New upload form state
  const [newDocName, setNewDocName] = useState('');
  const [newDocTopic, setNewDocTopic] = useState('Survey Methodology & CAPI');
  const [newDocSummary, setNewDocSummary] = useState('');

  const filtered = materials.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = activeType === 'all' || m.fileType === activeType;
    return matchSearch && matchType;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocName.trim()) return;

    const newMaterial: UploadedMaterial = {
      id: `mat_${Date.now()}`,
      name: newDocName.endsWith('.pdf') ? newDocName : `${newDocName}.pdf`,
      fileType: 'PDF',
      size: '3.4 MB',
      topic: newDocTopic,
      uploadedDate: 'Today',
      pagesCount: 45,
      summary: newDocSummary || 'User uploaded official circular with automated extraction.'
    };

    setMaterials([newMaterial, ...materials]);
    setShowUploadModal(false);
    setNewDocName('');
    setNewDocSummary('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>Official Knowledge Repository</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>MoSPI Document Library</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            Learning Materials & Handbooks
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Authorized repository of NSSO survey instructions, National Account manuals, CAPI tablets technical circulars, and Python analytical routines.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            id="btn-upload-new-material"
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] transition-all flex items-center gap-2 shadow-[2px_2px_0px_#8C7851]"
          >
            <Plus className="w-4 h-4 text-[#8C7851]" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8C7851] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Filter by handbook title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FDFCFB] border border-[#1A1A1A] pl-9 pr-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none"
          />
        </div>

        {/* File Type Filter Tabs */}
        <div className="flex items-center gap-1">
          {['all', 'PDF', 'DOCX'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-3 py-1 text-[10px] uppercase font-mono font-bold border transition-colors ${
                activeType === t
                  ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                  : 'bg-[#FDFCFB] text-[#5A554E] border-[#DCD6CC] hover:border-[#1A1A1A]'
              }`}
            >
              {t === 'all' ? 'All Formats' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#1A1A1A] text-[#FDFCFB] text-[9px] font-mono uppercase font-bold">
                    {mat.fileType} • {mat.size}
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold text-[#8C7851]">
                    {mat.topic}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#5A554E]">{mat.pagesCount} Pages</span>
              </div>

              <h3 
                onClick={() => setPreviewDoc(mat)}
                className="text-lg font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] cursor-pointer transition-colors leading-snug"
              >
                {mat.name}
              </h3>

              <p className="text-xs text-[#5A554E] font-editorial leading-relaxed line-clamp-2">
                {mat.summary}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E2DDD5] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDoc(mat)}
                  className="px-2.5 py-1 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition-colors"
                >
                  <Eye className="w-3 h-3 text-[#8C7851]" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => {
                    if (onGenerateQuizFromDoc) onGenerateQuizFromDoc(mat.id);
                    setActiveView('quiz_generator');
                  }}
                  className="px-2.5 py-1 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-[#8C7851]" />
                  <span>Gen Quiz</span>
                </button>

                <button
                  onClick={() => {
                    if (onAskTutorAboutDoc) onAskTutorAboutDoc(mat.name);
                    setActiveView('tutor');
                  }}
                  className="px-2.5 py-1 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-[10px] font-mono uppercase font-bold flex items-center gap-1 transition-colors"
                >
                  <Bot className="w-3 h-3 text-[#8C7851]" />
                  <span>Ask AI</span>
                </button>
              </div>

              <button
                onClick={() => alert(`Downloading official copy of "${mat.name}"...`)}
                className="p-1 text-[#5A554E] hover:text-[#1A1A1A]"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start pb-4 border-b border-[#1A1A1A]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C7851] font-bold">
                  Official MoSPI Gazette Document
                </span>
                <h2 className="text-2xl font-serif italic text-[#1A1A1A] font-bold mt-1">
                  {previewDoc.name}
                </h2>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 text-[#5A554E] hover:text-[#1A1A1A] border border-transparent hover:border-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F5F2ED] border border-[#1A1A1A] space-y-2 text-xs">
              <div className="text-[10px] uppercase font-mono font-bold text-[#8C7851]">
                Document Executive Summary & Metadata
              </div>
              <p className="font-editorial leading-relaxed text-[#1A1A1A]">
                {previewDoc.summary}
              </p>
              <div className="pt-2 flex gap-4 text-[10px] font-mono text-[#5A554E]">
                <span>Classification: {previewDoc.topic}</span>
                <span>Pages: {previewDoc.pagesCount}</span>
                <span>Uploaded: {previewDoc.uploadedDate}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex justify-between items-center">
              <button
                onClick={() => {
                  setPreviewDoc(null);
                  setActiveView('quiz_generator');
                }}
                className="px-4 py-2 bg-[#F5F2ED] hover:bg-[#EAE6DF] border border-[#1A1A1A] text-xs font-mono uppercase font-bold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C7851]" />
                <span>Create Diagnostic Test</span>
              </button>

              <button
                onClick={() => {
                  setPreviewDoc(null);
                  alert(`Downloading ${previewDoc.name}`);
                }}
                className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A]"
              >
                Download Official PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] max-w-lg w-full p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-[#1A1A1A]">
              <div>
                <span className="text-[10px] uppercase font-mono text-[#8C7851] font-bold">
                  Cadre Repository
                </span>
                <h3 className="text-xl font-serif italic text-[#1A1A1A] font-bold">
                  Upload Official Material
                </h3>
              </div>
              <button onClick={() => setShowUploadModal(false)} className="text-[#5A554E] hover:text-[#1A1A1A]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CPI_Base_Year_Revision_Methodology.pdf"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Competency Topic
                </label>
                <select
                  value={newDocTopic}
                  onChange={(e) => setNewDocTopic(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                >
                  <option value="Survey Methodology & CAPI">Survey Methodology & CAPI</option>
                  <option value="National Accounts & GVA">National Accounts & GVA</option>
                  <option value="Data Analysis & Scripts">Data Analysis & Python Scripts</option>
                  <option value="Governance & Norms">Governance & NIF Norms</option>
                </select>
              </div>

              <div>
                <label className="block uppercase font-mono font-bold text-[#1A1A1A] mb-1">
                  Brief Summary / Scope
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize key chapters and operational protocols..."
                  value={newDocSummary}
                  onChange={(e) => setNewDocSummary(e.target.value)}
                  className="w-full bg-[#F5F2ED] border border-[#1A1A1A] p-2.5 text-xs text-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-[#1A1A1A] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-[#F5F2ED] border border-[#1A1A1A] text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A]"
                >
                  Confirm & Ingest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
