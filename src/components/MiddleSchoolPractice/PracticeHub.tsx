import React, { useState } from 'react';
import { ALGEBRA_TOPICS, INITIAL_QUIZ_QUESTIONS, generateProceduralQuestion } from '../../data/middleSchoolAlgebra';
import { AlgebraTopic, QuizQuestion, QuizAttempt, StudentProfile } from '../../types/math';
import { QuizSession } from './QuizSession';
import {
  Flame,
  Award,
  Zap,
  Target,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart,
  BookOpen,
} from 'lucide-react';

interface PracticeHubProps {
  currentStudent: StudentProfile;
  onRecordQuizAttempt: (attempt: QuizAttempt) => void;
  onNavigateTab: (tab: string) => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  currentStudent,
  onRecordQuizAttempt,
  onNavigateTab,
}) => {
  const [activeSession, setActiveSession] = useState<{
    topic: AlgebraTopic | 'mixed';
    title: string;
    questions: QuizQuestion[];
  } | null>(null);

  const startTopicQuiz = (topicId: AlgebraTopic, count: number = 5) => {
    const topicInfo = ALGEBRA_TOPICS.find(t => t.id === topicId);
    const title = topicInfo ? topicInfo.title : 'Algebra Practice';

    // Mix static curated questions with procedural dynamic variations
    const curated = INITIAL_QUIZ_QUESTIONS.filter(q => q.topic === topicId);
    const questions: QuizQuestion[] = [...curated];

    while (questions.length < count) {
      questions.push(generateProceduralQuestion(topicId, 'medium'));
    }

    setActiveSession({
      topic: topicId,
      title,
      questions: questions.slice(0, count),
    });
  };

  const startMixedSprint = (count: number = 5) => {
    const topics: AlgebraTopic[] = [
      'one_step_equations',
      'two_step_equations',
      'linear_inequalities',
      'slope_and_graphing',
      'variables_both_sides',
    ];
    const questions: QuizQuestion[] = topics.slice(0, count).map(t => generateProceduralQuestion(t, 'medium'));

    setActiveSession({
      topic: 'mixed',
      title: 'Quick Algebra Sprint',
      questions,
    });
  };

  if (activeSession) {
    return (
      <QuizSession
        topic={activeSession.topic}
        topicTitle={activeSession.title}
        initialQuestions={activeSession.questions}
        studentId={currentStudent.id}
        onFinishQuiz={attempt => {
          onRecordQuizAttempt(attempt);
        }}
        onExit={() => setActiveSession(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Student Progress Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold text-white">
              <span>{currentStudent.avatar}</span>
              <span>{currentStudent.name}</span>
              <span className="text-white/70">• Grade {currentStudent.grade}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Middle School Algebra Practice Arena
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Master equations, slope, inequalities, and systems with automated feedback, interactive quizzes, and step-by-step guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-300 font-black text-lg">
                <Flame className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span>{currentStudent.streakDays} Days</span>
              </div>
              <div className="text-[11px] text-white/80 font-medium">Daily Streak</div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-300 font-black text-lg">
                <Award className="w-5 h-5" />
                <span>#{currentStudent.rank}</span>
              </div>
              <div className="text-[11px] text-white/80 font-medium">Class Rank</div>
            </div>

            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <div className="flex items-center justify-center gap-1 text-emerald-300 font-black text-lg">
                <Target className="w-5 h-5" />
                <span>{currentStudent.overallAccuracy}%</span>
              </div>
              <div className="text-[11px] text-white/80 font-medium">Overall Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => startMixedSprint(5)}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500 transition text-left cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">5-Question Sprint</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Rapid-fire mixed algebra test</div>
            </div>
          </div>
          <Play className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition" />
        </button>

        <button
          onClick={() => onNavigateTab('leaderboard')}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500 transition text-left cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Student Leaderboard</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Compare ranks, badges & XP</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
        </button>

        <button
          onClick={() => onNavigateTab('teacher')}
          className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-purple-500 transition text-left cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition">
              <BarChart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Teacher Dashboard</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Monitor class & student analytics</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 transition" />
        </button>
      </div>

      {/* Topics Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Middle School Algebra Topics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select any topic to start an interactive quiz with automated mistake feedback
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-900">
            {ALGEBRA_TOPICS.length} Curricula Units
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALGEBRA_TOPICS.map(topic => {
            const mastery = currentStudent.topicMastery[topic.id] || 75;
            let masteryColor = 'bg-emerald-500';
            if (mastery < 70) masteryColor = 'bg-rose-500';
            else if (mastery < 85) masteryColor = 'bg-amber-500';

            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      Grade {topic.grade}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      {mastery}% Mastery
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${masteryColor}`}
                      style={{ width: `${mastery}%` }}
                    />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {topic.description}
                    </p>
                  </div>

                  {/* Golden Rule Tip */}
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 text-[11px] text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 leading-tight">
                      <strong>Key:</strong> {topic.keyRule}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
                  <button
                    onClick={() => startTopicQuiz(topic.id, 5)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>5 Qs Quiz</span>
                  </button>

                  <button
                    onClick={() => startTopicQuiz(topic.id, 10)}
                    className="flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    <span>10 Qs Test</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
