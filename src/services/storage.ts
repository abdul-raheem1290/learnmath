import { StudentProfile, QuizAttempt } from '../types/math';
import { INITIAL_STUDENTS } from '../data/mockClassroom';

const STORAGE_KEYS = {
  STUDENTS: 'mathmaster_students_v1',
  HISTORY: 'mathmaster_calc_history_v1',
  FAVORITES: 'mathmaster_favorites_v1',
  THEME: 'mathmaster_theme_v1',
  DAILY_CHALLENGE: 'mathmaster_daily_status_v1',
};

export function getStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed reading students from storage', e);
    return INITIAL_STUDENTS;
  }
}

export function saveStudents(students: StudentProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Failed saving students to storage', e);
  }
}

export function recordQuizAttempt(studentId: string, attempt: QuizAttempt): void {
  const students = getStoredStudents();
  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) return;

  const student = { ...students[index] };
  student.quizzesCompleted += 1;
  student.recentAttempts = [attempt, ...(student.recentAttempts || [])].slice(0, 10);
  
  // Calculate gained XP (100 XP per quiz + 25 XP per correct answer)
  const gainedXP = 50 + attempt.score * 25;
  student.xp += gainedXP;

  // Update overall accuracy
  const totalCorrect = (student.recentAttempts.reduce((acc, a) => acc + a.score, 0));
  const totalQuestions = (student.recentAttempts.reduce((acc, a) => acc + a.totalQuestions, 0));
  if (totalQuestions > 0) {
    student.overallAccuracy = Math.round((totalCorrect / totalQuestions) * 100);
  }

  // Update topic mastery
  if (attempt.topic !== 'mixed') {
    const currentMastery = student.topicMastery[attempt.topic] || 75;
    const attemptScorePct = (attempt.score / attempt.totalQuestions) * 100;
    // Moving average weighted
    const updatedMastery = Math.round(currentMastery * 0.7 + attemptScorePct * 0.3);
    student.topicMastery[attempt.topic] = Math.min(100, Math.max(10, updatedMastery));
  }

  student.lastActive = 'Just now';
  students[index] = student;
  saveStudents(students);
}

export function updateTeacherNotes(studentId: string, notes: string): void {
  const students = getStoredStudents();
  const idx = students.findIndex(s => s.id === studentId);
  if (idx !== -1) {
    students[idx].teacherNotes = notes;
    saveStudents(students);
  }
}

export function addStudentToClass(newStudent: Partial<StudentProfile>): StudentProfile {
  const students = getStoredStudents();
  const id = `std_${Date.now()}`;
  const created: StudentProfile = {
    id,
    name: newStudent.name || 'New Student',
    avatar: newStudent.avatar || '🎓',
    grade: (newStudent.grade as any) || '8th',
    xp: 1000,
    rank: students.length + 1,
    streakDays: 1,
    quizzesCompleted: 0,
    overallAccuracy: 80,
    lastActive: 'Just registered',
    topicMastery: {
      one_step_equations: 80,
      two_step_equations: 75,
      variables_both_sides: 70,
      distributive_combining: 70,
      linear_inequalities: 65,
      slope_and_graphing: 75,
      systems_equations: 65,
      polynomial_basics: 70,
      quadratic_foundations: 60,
      word_problems_algebra: 70,
      exponents_scientific: 75,
      proportions_ratios: 80,
    },
    strengths: ['One-Step Equations'],
    needsImprovement: ['Linear Inequalities'],
    teacherNotes: 'Newly enrolled in classroom.',
    recentAttempts: [],
  };

  students.push(created);
  saveStudents(students);
  return created;
}

export interface CalculationHistoryItem {
  id: string;
  toolId: string;
  toolTitle: string;
  inputs: Record<string, any>;
  result: string;
  timestamp: string;
}

export function getCalcHistory(): CalculationHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addCalcHistory(item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>): void {
  try {
    const current = getCalcHistory();
    const newItem: CalculationHistoryItem = {
      ...item,
      id: `hist_${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newItem, ...current].slice(0, 30);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed saving calc history', e);
  }
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['linear-equation-solver', 'quadratic-equation-solver', 'slope-calculator'];
  } catch {
    return ['linear-equation-solver', 'quadratic-equation-solver', 'slope-calculator'];
  }
}

export function toggleFavorite(toolId: string): string[] {
  const favs = getFavorites();
  const next = favs.includes(toolId) ? favs.filter(id => id !== toolId) : [...favs, toolId];
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(next));
  return next;
}
