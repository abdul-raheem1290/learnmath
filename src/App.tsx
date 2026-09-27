/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PracticeHub } from './components/MiddleSchoolPractice/PracticeHub';
import { LeaderboardView } from './components/Leaderboard/LeaderboardView';
import { TeacherDashboardView } from './components/TeacherDashboard/TeacherDashboardView';
import { ToolsDirectory } from './components/Tools/ToolsDirectory';
import { GraphingWorkspace } from './components/Grapher/GraphingWorkspace';
import { FormulaLibraryView } from './components/FormulaLibrary/FormulaLibraryView';
import { PhotoSolverModal } from './components/PhotoSolver/PhotoSolverModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import {
  getStoredStudents,
  recordQuizAttempt,
  updateTeacherNotes,
  addStudentToClass,
} from './services/storage';
import { getLeaderboardFromStudents } from './data/mockClassroom';
import { StudentProfile, QuizAttempt } from './types/math';
import { ShieldCheck, Heart, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mathmaster_theme_v1');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  const [activeTab, setActiveTab] = useState<string>('practice');
  const [students, setStudents] = useState<StudentProfile[]>(() => getStoredStudents());
  const [selectedToolId, setSelectedToolId] = useState<string | undefined>(undefined);
  const [isPhotoSolverOpen, setIsPhotoSolverOpen] = useState(false);

  // Apply dark mode class to HTML root
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('mathmaster_theme_v1', isDark ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  }, [isDark]);

  const currentStudent = students.find(s => s.id === 'std_1') || students[0];
  const leaderboardEntries = getLeaderboardFromStudents(students);

  const handleRecordQuizAttempt = (attempt: QuizAttempt) => {
    recordQuizAttempt(currentStudent.id, attempt);
    setStudents(getStoredStudents());
  };

  const handleSaveTeacherNotes = (studentId: string, notes: string) => {
    updateTeacherNotes(studentId, notes);
    setStudents(getStoredStudents());
  };

  const handleAddStudent = (newStd: Partial<StudentProfile>) => {
    addStudentToClass(newStd);
    setStudents(getStoredStudents());
  };

  const handleOpenTool = (toolId: string) => {
    setSelectedToolId(toolId);
    setActiveTab('tools');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={tab => {
          setActiveTab(tab);
          if (tab !== 'tools') setSelectedToolId(undefined);
        }}
        isDark={isDark}
        onToggleTheme={() => setIsDark(d => !d)}
        onOpenPhotoSolver={() => setIsPhotoSolverOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'practice' && (
          <PracticeHub
            currentStudent={currentStudent}
            onRecordQuizAttempt={handleRecordQuizAttempt}
            onNavigateTab={tab => setActiveTab(tab)}
          />
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardView
            entries={leaderboardEntries}
            currentUserId={currentStudent.id}
            onStartQuiz={() => setActiveTab('practice')}
          />
        )}

        {activeTab === 'teacher' && (
          <TeacherDashboardView
            students={students}
            onSaveTeacherNotes={handleSaveTeacherNotes}
            onAddStudent={handleAddStudent}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsDirectory initialToolId={selectedToolId} />
        )}

        {activeTab === 'grapher' && <GraphingWorkspace />}

        {activeTab === 'formulas' && (
          <FormulaLibraryView onOpenTool={handleOpenTool} />
        )}
      </main>

      {/* Photo Math Solver Modal */}
      {isPhotoSolverOpen && (
        <PhotoSolverModal onClose={() => setIsPhotoSolverOpen(false)} />
      )}

      {/* PWA Offline Connectivity Floating Toast */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 py-8 px-4 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 dark:text-slate-200">
              MathMaster Pro
            </span>
            <span>• Middle School Algebra & 200+ Mathematics Super Tools</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Local Browser Engine (Zero API Dependency)
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
