import React, { useState } from 'react';
import { StudentProfile } from '../../types/math';
import { ALGEBRA_TOPICS } from '../../data/middleSchoolAlgebra';
import {
  X,
  Target,
  Clock,
  Award,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Save,
  Printer,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface StudentDetailModalProps {
  student: StudentProfile;
  onClose: () => void;
  onSaveTeacherNotes: (studentId: string, notes: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  onClose,
  onSaveTeacherNotes,
}) => {
  const [notes, setNotes] = useState(student.teacherNotes || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNotes = () => {
    onSaveTeacherNotes(student.id, notes);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              {student.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{student.name}</h2>
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-semibold">
                  Grade {student.grade}
                </span>
              </div>
              <p className="text-xs text-blue-100 mt-1">
                Last Active: {student.lastActive} • Enrolled in Period 3 Middle School Algebra
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition text-xs flex items-center gap-1.5"
              title="Print Student Report"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Report</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {student.overallAccuracy}%
              </div>
              <div className="text-[11px] font-semibold text-slate-500">Overall Accuracy</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-amber-500">
                {student.xp}
              </div>
              <div className="text-[11px] font-semibold text-slate-500">Total XP Points</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                {student.quizzesCompleted}
              </div>
              <div className="text-[11px] font-semibold text-slate-500">Quizzes Taken</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center">
              <div className="text-lg font-black text-purple-600 dark:text-purple-400">
                #{student.rank}
              </div>
              <div className="text-[11px] font-semibold text-slate-500">Class Rank</div>
            </div>
          </div>

          {/* Diagnostic Strengths & Needs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
              <div className="flex items-center gap-2 mb-2 text-emerald-900 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Demonstrated Strengths</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-950 dark:text-emerald-200 font-medium">
                {student.strengths.map((str, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60">
              <div className="flex items-center gap-2 mb-2 text-rose-900 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Identified Learning Gaps</span>
              </div>
              <ul className="space-y-1.5 text-xs text-rose-950 dark:text-rose-200 font-medium">
                {student.needsImprovement.map((gap, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Individual Topic Mastery Breakdown */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Curriculum Topic Mastery Analysis
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALGEBRA_TOPICS.map(topic => {
                const mastery = student.topicMastery[topic.id] || 70;
                let barColor = 'bg-emerald-500';
                let statusLabel = 'Mastered';
                if (mastery < 70) {
                  barColor = 'bg-rose-500';
                  statusLabel = 'Needs Review';
                } else if (mastery < 85) {
                  barColor = 'bg-amber-500';
                  statusLabel = 'Proficient';
                }

                return (
                  <div
                    key={topic.id}
                    className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                        {topic.title}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white shrink-0 ml-2">
                        {mastery}%
                      </span>
                    </div>

                    <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-1.5">
                      <div
                        className={`h-full rounded-full ${barColor}`}
                        style={{ width: `${mastery}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-400">
                      <span>Grade {topic.grade}</span>
                      <span
                        className={`font-semibold ${
                          mastery < 70
                            ? 'text-rose-600 dark:text-rose-400'
                            : mastery < 85
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher Private Notes & Recommendations */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Teacher Notes & Targeted Intervention</span>
              </label>
              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Notes Saved!
                </span>
              )}
            </div>

            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Record individual feedback, assigned practice questions, tutoring notes, or IEP accommodations..."
              rows={3}
              className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSaveNotes}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
