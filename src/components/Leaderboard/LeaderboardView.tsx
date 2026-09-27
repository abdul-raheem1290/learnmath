import React, { useState } from 'react';
import { LeaderboardEntry } from '../../types/math';
import { Award, Trophy, Medal, Flame, Target, Sparkles, Filter, ChevronUp } from 'lucide-react';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
  currentUserId: string;
  onStartQuiz: () => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  entries,
  currentUserId,
  onStartQuiz,
}) => {
  const [gradeFilter, setGradeFilter] = useState<'all' | '6th' | '7th' | '8th'>('all');
  const [sortBy, setSortBy] = useState<'xp' | 'accuracy' | 'quizzes'>('xp');

  let filtered = entries.filter(e => gradeFilter === 'all' || e.grade === gradeFilter);

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'xp') return b.xp - a.xp;
    if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
    return b.quizzesCompleted - a.quizzesCompleted;
  });

  const topThree = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Middle School Algebra Honor Roll</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Student Leaderboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
          Earn XP and badges by completing algebra quizzes with high accuracy and maintaining daily streaks.
        </p>
      </div>

      {/* Podium for Top 3 */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end pt-4 pb-2 max-w-2xl mx-auto">
          {/* Silver - Rank 2 */}
          <div className="order-2 sm:order-1 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 text-center shadow-md relative">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-2xl mx-auto mb-2 shadow-inner">
              {topThree[1].avatar}
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-[11px] font-bold mb-2">
              <Medal className="w-3.5 h-3.5 text-slate-400" /> #2 Silver
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {topThree[1].name}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-extrabold mt-0.5">
              {topThree[1].xp} XP
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {topThree[1].accuracy}% Accuracy • {topThree[1].quizzesCompleted} Quizzes
            </div>
          </div>

          {/* Gold - Rank 1 */}
          <div className="order-1 sm:order-2 bg-gradient-to-b from-amber-500/10 to-transparent dark:from-amber-500/20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-400 p-6 text-center shadow-xl relative scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white p-1 rounded-full shadow-md">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-3xl mx-auto mb-2 shadow-md">
              {topThree[0].avatar}
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 text-xs font-black mb-2">
              👑 #1 Champion
            </div>
            <div className="font-extrabold text-base text-slate-900 dark:text-white truncate">
              {topThree[0].name}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400 font-black mt-0.5">
              {topThree[0].xp} XP
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              {topThree[0].accuracy}% Accuracy • {topThree[0].quizzesCompleted} Quizzes
            </div>
          </div>

          {/* Bronze - Rank 3 */}
          <div className="order-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 text-center shadow-md relative">
            <div className="w-12 h-12 rounded-2xl bg-amber-900/10 dark:bg-amber-900/30 flex items-center justify-center text-2xl mx-auto mb-2 shadow-inner">
              {topThree[2].avatar}
            </div>
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-800/10 text-amber-800 dark:text-amber-400 text-[11px] font-bold mb-2">
              <Medal className="w-3.5 h-3.5 text-amber-700" /> #3 Bronze
            </div>
            <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
              {topThree[2].name}
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 font-extrabold mt-0.5">
              {topThree[2].xp} XP
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {topThree[2].accuracy}% Accuracy • {topThree[2].quizzesCompleted} Quizzes
            </div>
          </div>
        </div>
      )}

      {/* Filter and Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Grade Level:</span>
          {(['all', '6th', '7th', '8th'] as const).map(g => (
            <button
              key={g}
              onClick={() => setGradeFilter(g)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                gradeFilter === g
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {g === 'all' ? 'All Grades' : `Grade ${g}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sort By:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 border-none rounded-lg px-3 py-1.5 text-slate-800 dark:text-slate-200"
          >
            <option value="xp">Total XP</option>
            <option value="accuracy">Accuracy %</option>
            <option value="quizzes">Quizzes Completed</option>
          </select>

          <button
            onClick={onStartQuiz}
            className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer ml-2"
          >
            Take Quiz & Climb Ranks
          </button>
        </div>
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((entry, idx) => {
            const isSelf = entry.isCurrentUser;
            return (
              <div
                key={entry.id}
                className={`p-4 flex items-center justify-between gap-4 transition ${
                  isSelf
                    ? 'bg-blue-50/80 dark:bg-blue-950/40 border-l-4 border-l-blue-600'
                    : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {/* Left: Rank & Avatar & Name */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                      idx === 0
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : idx === 1
                        ? 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                        : idx === 2
                        ? 'bg-amber-900/10 text-amber-900 dark:bg-amber-900/40 dark:text-amber-300'
                        : 'text-slate-400 dark:text-slate-500'
                    }`}
                  >
                    #{idx + 1}
                  </span>

                  <span className="text-2xl shrink-0">{entry.avatar}</span>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {entry.name}
                      </span>
                      {isSelf && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-600 text-white">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] text-slate-500">
                        Grade {entry.grade}
                      </span>
                      <div className="hidden sm:flex items-center gap-1">
                        {entry.badges.map((b, bIdx) => (
                          <span
                            key={bIdx}
                            className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          >
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Accuracy, Quizzes, XP */}
                <div className="flex items-center gap-4 sm:gap-6 text-right shrink-0">
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {entry.quizzesCompleted}
                    </div>
                    <div className="text-[10px] text-slate-400">Quizzes</div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {entry.accuracy}%
                    </div>
                    <div className="text-[10px] text-slate-400">Accuracy</div>
                  </div>

                  <div className="min-w-[70px]">
                    <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                      {entry.xp}
                    </div>
                    <div className="text-[10px] text-slate-400">XP Points</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
