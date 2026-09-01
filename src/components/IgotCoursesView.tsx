import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Sparkles, 
  Clock, 
  Award, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Check, 
  ChevronRight,
  User,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Course, AppView } from '../types';
import { igotCourses } from '../data/mockData';

interface IgotCoursesViewProps {
  setActiveView: (view: AppView) => void;
  selectedCourseTitle?: string;
  onResumeCourse: (courseId: string) => void;
}

export const IgotCoursesView: React.FC<IgotCoursesViewProps> = ({
  setActiveView,
  selectedCourseTitle,
  onResumeCourse
}) => {
  const [coursesList, setCoursesList] = useState<Course[]>(igotCourses);
  const [searchQuery, setSearchQuery] = useState(selectedCourseTitle || '');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);

  const categories = ['all', 'Python / Programming', 'Survey Methodology', 'Official Statistics', 'Data Visualization'];

  const filteredCourses = coursesList.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCat = selectedCategory === 'all' || course.competencyArea === selectedCategory;
    const matchesDiff = selectedDifficulty === 'all' || course.level === selectedDifficulty;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const handleEnrollToggle = (courseId: string) => {
    setCoursesList(prev => prev.map(c => {
      if (c.id === courseId) {
        return { ...c, enrolled: !c.enrolled, progress: c.enrolled ? 0 : 5 };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Editorial Header */}
      <div className="border-b border-[#1A1A1A] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#8C7851] font-bold mb-1.5 flex items-center gap-2">
            <span>iGOT Karmayogi Catalog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7851]" />
            <span>AI Competency Matcher</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif italic text-[#1A1A1A] font-semibold tracking-tight">
            AI-Matched iGOT Courses
          </h1>
          <p className="text-xs md:text-sm text-[#5A554E] font-editorial mt-1 max-w-2xl leading-relaxed">
            Targeted training modules synchronized with your MoSPI cadre competency gaps. Match percentages represent alignment with your specific development vectors.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#5A554E]">
          <span>Synced with iGOT Central Node:</span>
          <span className="font-bold text-[#1A1A1A]">Online</span>
        </div>
      </div>

      {/* Main Grid: Filters (Left 4 cols) & Catalog (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Search Box */}
          <div className="p-5 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm space-y-4">
            <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#8C7851]">
              Catalog Filter
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8C7851] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by topic, keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F5F2ED] border border-[#DCD6CC] pl-9 pr-3 py-2 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            {/* Competency Area Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                Competency Area
              </label>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-2.5 py-1.5 text-xs transition-all flex items-center justify-between border ${
                      selectedCategory === cat
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A] font-bold'
                        : 'bg-[#F5F2ED] text-[#1A1A1A] border-transparent hover:border-[#DCD6CC]'
                    }`}
                  >
                    <span>{cat === 'all' ? 'All Competency Areas' : cat}</span>
                    {selectedCategory === cat && <Check className="w-3 h-3 text-[#8C7851]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-bold text-[#1A1A1A] mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['all', 'Beginner', 'Intermediate', 'Advanced'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedDifficulty(lvl)}
                    className={`py-1 text-[10px] uppercase font-mono font-bold border transition-colors ${
                      selectedDifficulty === lvl
                        ? 'bg-[#1A1A1A] text-[#FDFCFB] border-[#1A1A1A]'
                        : 'bg-[#F5F2ED] text-[#5A554E] border-[#DCD6CC] hover:text-[#1A1A1A]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Matching Diagnostic Card */}
          <div className="p-5 bg-[#F5F2ED] border border-[#1A1A1A] space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C7851]" />
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#1A1A1A]">
                Why These Matches?
              </span>
            </div>
            <p className="text-xs font-editorial text-[#5A554E] leading-relaxed">
              Based on your latest <strong>Level 4 Diagnostic</strong>, your Python & Sampling competencies exhibit the highest headroom. The top recommended course offers a <strong>94% match</strong> to close your Cadre gap.
            </p>
          </div>
        </div>

        {/* Right Course List (Right 8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          <div className="flex justify-between items-center text-xs font-mono text-[#5A554E]">
            <span>Showing {filteredCourses.length} Curated Courses</span>
            <span>Sorted by: AI Match Score</span>
          </div>

          <div className="space-y-4">
            {filteredCourses.map((course) => {
              return (
                <div
                  key={course.id}
                  className="p-6 bg-[#FDFCFB] border border-[#1A1A1A] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  {/* Top Match Tag */}
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCFB] text-[10px] font-mono uppercase font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#8C7851]" />
                        <span>{course.matchScore}% Match</span>
                      </span>
                      <span className="text-[10px] uppercase font-mono text-[#8C7851] font-bold">
                        • {course.competencyArea}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-[#5A554E]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.durationHours} Hours ({course.modulesCount} Modules)
                      </span>
                      <span className="px-1.5 py-0.5 bg-[#F5F2ED] border border-[#DCD6CC] uppercase">
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Course Title & Description */}
                  <div className="space-y-2 mb-4">
                    <h3 
                      onClick={() => setActiveCourseModal(course)}
                      className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#8C7851] cursor-pointer transition-colors leading-snug"
                    >
                      {course.title}
                    </h3>
                    <p className="text-xs text-[#5A554E] font-editorial leading-relaxed line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Instructors & Tag list */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-3 border-t border-[#E2DDD5]">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#5A554E]">
                      <User className="w-3.5 h-3.5 text-[#8C7851]" />
                      <span>{course.instructors}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveCourseModal(course)}
                        className="text-xs font-serif italic text-[#1A1A1A] hover:text-[#8C7851] font-bold"
                      >
                        View Syllabus →
                      </button>

                      {course.enrolled ? (
                        <button
                          onClick={() => onResumeCourse(course.id)}
                          className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] flex items-center gap-1.5 transition-all"
                        >
                          <Play className="w-3 h-3 fill-[#8C7851] text-[#8C7851]" />
                          <span>{course.progress > 0 ? `Resume (${course.progress}%)` : 'Start Course'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEnrollToggle(course.id)}
                          className="px-4 py-2 bg-[#F5F2ED] hover:bg-[#1A1A1A] hover:text-[#FDFCFB] text-[#1A1A1A] text-xs font-mono uppercase font-bold border border-[#1A1A1A] transition-all"
                        >
                          Enroll on iGOT
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-[#FDFCFB] border-2 border-[#1A1A1A] max-w-2xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-start pb-4 border-b border-[#1A1A1A]">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8C7851] font-bold">
                  {activeCourseModal.provider}
                </span>
                <h2 className="text-2xl font-serif italic text-[#1A1A1A] font-bold mt-1">
                  {activeCourseModal.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveCourseModal(null)}
                className="p-1 text-[#5A554E] hover:text-[#1A1A1A] border border-transparent hover:border-[#1A1A1A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#5A554E] font-editorial leading-relaxed">
              <p>{activeCourseModal.description}</p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-mono font-bold text-[#8C7851] tracking-wider">
                Course Syllabus Breakdown
              </h4>
              <div className="space-y-2">
                {activeCourseModal.syllabus.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#F5F2ED] border border-[#DCD6CC] flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[#8C7851] font-bold">0{idx + 1}.</span>
                      <span className="font-serif font-bold text-[#1A1A1A]">{item.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#5A554E]">{item.duration}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex justify-between items-center">
              <div className="text-xs font-mono text-[#5A554E]">
                Instructor: {activeCourseModal.instructors}
              </div>
              <button
                onClick={() => {
                  onResumeCourse(activeCourseModal.id);
                  setActiveCourseModal(null);
                }}
                className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#8C7851] text-[#FDFCFB] text-xs font-serif italic font-bold border border-[#1A1A1A] transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-[#8C7851] text-[#8C7851]" />
                <span>Launch Interactive Module</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
