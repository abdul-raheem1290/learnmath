import React, { useState } from 'react';
import { StudentProfile } from '../../types/math';
import { ALGEBRA_TOPICS } from '../../data/middleSchoolAlgebra';
import { StudentDetailModal } from './StudentDetailModal';
import { AddStudentModal } from './AddStudentModal';
import {
  Users,
  Target,
  Award,
  AlertTriangle,
  Search,
  Plus,
  Download,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  GraduationCap,
} from 'lucide-react';

interface TeacherDashboardViewProps {
  students: StudentProfile[];
  onSaveTeacherNotes: (studentId: string, notes: string) => void;
  onAddStudent: (student: Partial<StudentProfile>) => void;
}

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({
  students,
  onSaveTeacherNotes,
  onAddStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<'all' | '6th' | '7th' | '8th'>('all');
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Computations
  const totalStudents = students.length;
  const classAvgAccuracy = Math.round(
    students.reduce((acc, s) => acc + s.overallAccuracy, 0) / (totalStudents || 1)
  );
  const totalQuizzes = students.reduce((acc, s) => acc + s.quizzesCompleted, 0);

  // Compute average mastery per topic
  const topicAverages = ALGEBRA_TOPICS.map(topic => {
    const avg = Math.round(
      students.reduce((acc, s) => acc + (s.topicMastery[topic.id] || 70), 0) / (totalStudents || 1)
    );
    return {
      topic,
      average: avg,
    };
  }).sort((a, b) => a.average - b.average);

  const weakestTopic = topicAverages[0];

  // Filtering
  const filteredStudents = students.filter(s => {
    const matchName = s.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchGrade = gradeFilter === 'all' || s.grade === gradeFilter;
    return matchName && matchGrade;
  });

  const exportCSV = () => {
    const headers = ['Student ID', 'Name', 'Grade', 'Accuracy (%)', 'XP', 'Quizzes Completed', 'Notes'];
    const rows = students.map(s => [
      s.id,
      `"${s.name}"`,
      s.grade,
      s.overallAccuracy,
      s.xp,
      s.quizzesCompleted,
      `"${s.teacherNotes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `algebra_class_metrics_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300 text-xs font-bold mb-1">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Classroom Analytics • Period 3 Algebra</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Teacher Performance Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Monitor real-time student mastery, identify common misconceptions, and prescribe interventions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report (CSV)</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Enroll Student</span>
          </button>
        </div>
      </div>

      {/* Class Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Enrolled Students</span>
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalStudents} Students
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
            100% active this month
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Class Average Accuracy</span>
            <Target className="w-5 h-5 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {classAvgAccuracy}%
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Target benchmark: 80%
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Quizzes Completed</span>
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {totalQuizzes} Tests
          </div>
          <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
            +38 submitted this week
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Topic Needing Review</span>
            <AlertTriangle className="w-5 h-5 text-rose-500" />
          </div>
          <div className="text-base font-bold text-rose-600 dark:text-rose-400 truncate">
            {weakestTopic ? weakestTopic.topic.title : 'None'}
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Class average: {weakestTopic ? weakestTopic.average : 0}% (Sign Flip Rule)
          </div>
        </div>
      </div>

      {/* Curriculum Mastery Heatmap */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Curriculum Mastery Heatmap (All Units)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated accuracy per unit across all enrolled middle school algebra students
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Color Legend: <span className="text-emerald-500 font-bold">● ≥85%</span> <span className="text-amber-500 font-bold ml-1">● 70-84%</span> <span className="text-rose-500 font-bold ml-1">● &lt;70%</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {topicAverages.map(({ topic, average }) => {
            let statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800';
            if (average < 70) {
              statusBadge = 'bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
            } else if (average < 85) {
              statusBadge = 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800';
            }

            return (
              <div
                key={topic.id}
                className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    {topic.title}
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white ml-1">
                    {average}%
                  </span>
                </div>

                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      average < 70 ? 'bg-rose-500' : average < 85 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${average}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Grade {topic.grade}</span>
                  <span className={`px-1.5 py-0.5 rounded font-bold border ${statusBadge}`}>
                    {average < 70 ? 'Review Needed' : average < 85 ? 'Proficient' : 'Mastered'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Roster Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
        {/* Table Control Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Student Roster & Individual Profiles
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-semibold">
              {filteredStudents.length} Students
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
              />
            </div>

            {/* Grade Filter */}
            <div className="flex items-center gap-1">
              {(['all', '6th', '7th', '8th'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    gradeFilter === g
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {g === 'all' ? 'All' : `${g}`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-3">Grade</th>
                <th className="py-3.5 px-3">Overall Accuracy</th>
                <th className="py-3.5 px-3">Quizzes</th>
                <th className="py-3.5 px-3">XP Points</th>
                <th className="py-3.5 px-3">Key Focus / Gap</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map(student => {
                let badgeColor = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
                if (student.overallAccuracy < 75) {
                  badgeColor = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
                } else if (student.overallAccuracy < 85) {
                  badgeColor = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
                }

                return (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl shrink-0">{student.avatar}</span>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {student.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Last active: {student.lastActive}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      Grade {student.grade}
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                        {student.overallAccuracy}%
                      </span>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {student.quizzesCompleted}
                    </td>

                    <td className="py-3.5 px-3 font-extrabold text-blue-600 dark:text-blue-400">
                      {student.xp}
                    </td>

                    <td className="py-3.5 px-3 text-slate-500 dark:text-slate-400 truncate max-w-xs">
                      {student.needsImprovement[0] || 'On track'}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedStudent(student);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                      >
                        <span>View Analytics</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedStudent && (
        <StudentDetailModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSaveTeacherNotes={onSaveTeacherNotes}
        />
      )}

      {isAddModalOpen && (
        <AddStudentModal
          onClose={() => setIsAddModalOpen(false)}
          onAddStudent={onAddStudent}
        />
      )}
    </div>
  );
};
