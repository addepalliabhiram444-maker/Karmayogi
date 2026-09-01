export type AppView = 
  | 'login'
  | 'dashboard'
  | 'competencies'
  | 'assessment'
  | 'learning_path'
  | 'courses'
  | 'quiz_generator'
  | 'tutor'
  | 'analytics'
  | 'materials'
  | 'profile';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: string;
  cadre: string;
  department: string;
  ministry: string;
  joinedDate: string;
  avatarUrl: string;
  overallCompetency: number; // e.g. 72
  competencyChange: number; // e.g. +4
  completedModules: number;
  totalModules: number;
  avgQuizScore: number;
  learningHours: number;
  streakDays: number;
  level: string; // e.g. "Level 4 Analyst"
  certificatesCount: number;
  badges: string[];
}

export interface CompetencyItem {
  id: string;
  name: string;
  category: string;
  currentScore: number; // 0 - 100
  targetScore: number; // 0 - 100
  status: 'Strong' | 'Developing' | 'Action Needed';
  gap: number;
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  recommendedModule: string;
}

export interface RadarDataPoint {
  subject: string;
  current: number;
  target: number;
  fullMark: number;
}

export interface AssessmentQuestion {
  id: number;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competencyArea: string;
}

export interface LearningPhase {
  id: string;
  phaseNumber: number;
  title: string;
  subtitle: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  progressPercentage: number;
  courses: {
    id: string;
    title: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    status: 'Completed' | 'In Progress' | 'Up Next' | 'Locked';
    certificateUrl?: string;
    skills: string[];
  }[];
}

export interface Course {
  id: string;
  title: string;
  provider: string; // e.g. "iGOT Karmayogi / MoSPI"
  matchScore: number; // e.g. 94
  durationHours: number;
  modulesCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  competencyArea: string;
  description: string;
  enrolled: boolean;
  progress: number;
  rating: number;
  reviewsCount: number;
  instructors: string;
  syllabus: { title: string; duration: string }[];
  tags: string[];
}

export interface UploadedMaterial {
  id: string;
  name: string;
  fileType: 'PDF' | 'DOCX' | 'PPTX' | 'XLSX';
  size: string;
  topic: string;
  uploadedDate: string;
  pagesCount: number;
  summary: string;
}

export interface QuizConfig {
  sourceDocId: string;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed';
  questionType: 'Multiple Choice' | 'True / False' | 'Case Study MCQs';
  language: 'English' | 'Hindi';
}

export interface GeneratedQuiz {
  id: string;
  title: string;
  sourceDocName: string;
  createdAt: string;
  questionsCount: number;
  difficulty: string;
  questions: AssessmentQuestion[];
  status: 'Ready' | 'Generating';
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  callout?: {
    title: string;
    text: string;
  };
  suggestedQuestions?: string[];
  attachedFile?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assessment' | 'course' | 'achievement' | 'alert';
}
