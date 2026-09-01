import React, { useState } from 'react';
import { AppView, UserProfile, NotificationItem } from './types';
import { currentUser, competencyItems, sampleNotifications } from './data/mockData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { LoginScreen } from './components/LoginScreen';
import { DashboardView } from './components/DashboardView';
import { CompetenciesView } from './components/CompetenciesView';
import { SkillAssessmentView } from './components/SkillAssessmentView';
import { LearningPathView } from './components/LearningPathView';
import { IgotCoursesView } from './components/IgotCoursesView';
import { AiQuizGeneratorView } from './components/AiQuizGeneratorView';
import { AiTutorView } from './components/AiTutorView';
import { AnalyticsView } from './components/AnalyticsView';
import { LearningMaterialsView } from './components/LearningMaterialsView';
import { ProfileSettingsView } from './components/ProfileSettingsView';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(currentUser);
  const [notifications, setNotifications] = useState<NotificationItem[]>(sampleNotifications);
  const [selectedCourseForCatalog, setSelectedCourseForCatalog] = useState<string | undefined>(undefined);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...updated }));
  };

  const handleUpdateCompetencyScore = (score: number) => {
    setUser(prev => ({
      ...prev,
      overallCompetency: Math.min(100, Math.round(prev.overallCompetency + 3)),
      completedModules: prev.completedModules + 1
    }));
  };

  const handleResumeCourse = (courseId: string) => {
    setActiveView('courses');
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] flex flex-col font-editorial selection:bg-[#8C7851] selection:text-[#FDFCFB]">
      {/* Top Editorial Masthead & Navigation */}
      <Header
        user={user}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAiAssistant={() => setActiveView('tutor')}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onLogout={handleLogout}
      />

      {/* Main Structural Frame */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-8">
        {/* Left Sidebar Table of Contents Navigation */}
        <Sidebar
          activeView={activeView}
          setActiveView={setActiveView}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {activeView === 'dashboard' && (
            <DashboardView
              user={user}
              setActiveView={setActiveView}
              onTakeAssessment={() => setActiveView('assessment')}
              onResumeCourse={handleResumeCourse}
            />
          )}

          {activeView === 'competencies' && (
            <CompetenciesView
              setActiveView={setActiveView}
              onOpenGeneratePlan={() => setActiveView('learning_path')}
              onSelectCourse={(title) => {
                setSelectedCourseForCatalog(title);
                setActiveView('courses');
              }}
            />
          )}

          {activeView === 'assessment' && (
            <SkillAssessmentView
              setActiveView={setActiveView}
              onUpdateCompetencyScore={handleUpdateCompetencyScore}
            />
          )}

          {activeView === 'learning_path' && (
            <LearningPathView
              setActiveView={setActiveView}
              onResumeCourse={handleResumeCourse}
            />
          )}

          {activeView === 'courses' && (
            <IgotCoursesView
              setActiveView={setActiveView}
              selectedCourseTitle={selectedCourseForCatalog}
              onResumeCourse={handleResumeCourse}
            />
          )}

          {activeView === 'quiz_generator' && (
            <AiQuizGeneratorView />
          )}

          {activeView === 'tutor' && (
            <AiTutorView />
          )}

          {activeView === 'analytics' && (
            <AnalyticsView
              user={user}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'materials' && (
            <LearningMaterialsView
              setActiveView={setActiveView}
              onAskTutorAboutDoc={(docName) => {
                setActiveView('tutor');
              }}
              onGenerateQuizFromDoc={(docId) => {
                setActiveView('quiz_generator');
              }}
            />
          )}

          {activeView === 'profile' && (
            <ProfileSettingsView
              user={user}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </main>
      </div>

      {/* Global Minimalist Footer */}
      <footer className="border-t border-[#1A1A1A] py-6 text-center text-xs text-[#5A554E] font-editorial bg-[#F5F2ED]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="font-mono text-[11px]">
            StatLearn AI • Ministry of Statistics & Programme Implementation (MoSPI)
          </div>
          <div className="text-[10px] font-mono text-[#8C7851]">
            Standardized Under National Indicator Framework & iGOT Karmayogi Node
          </div>
        </div>
      </footer>
    </div>
  );
}
