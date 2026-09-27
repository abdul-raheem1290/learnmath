/**
 * Core type definitions for MathMaster Pro
 */

export type AcademicLevel = 
  | 'middle_school'
  | 'high_school'
  | 'college'
  | 'undergraduate'
  | 'engineering'
  | 'graduate';

export type AlgebraTopic = 
  | 'one_step_equations'
  | 'two_step_equations'
  | 'variables_both_sides'
  | 'distributive_combining'
  | 'linear_inequalities'
  | 'slope_and_graphing'
  | 'systems_equations'
  | 'polynomial_basics'
  | 'quadratic_foundations'
  | 'word_problems_algebra'
  | 'exponents_scientific'
  | 'proportions_ratios';

export interface QuizQuestion {
  id: string;
  topic: AlgebraTopic;
  topicLabel: string;
  difficulty: 'easy' | 'medium' | 'hard';
  gradeLevel: '6th' | '7th' | '8th' | '9th';
  questionText: string;
  latex?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string;
  solutionSteps: {
    stepNumber: number;
    title: string;
    description: string;
    mathExpression?: string;
  }[];
  explanation: string;
  commonMisconception: {
    description: string;
    howToAvoid: string;
  };
  verification: string;
  hint: string;
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  topic: AlgebraTopic | 'mixed';
  date: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    topic: AlgebraTopic;
  }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string;
  grade: '6th' | '7th' | '8th';
  xp: number;
  rank: number;
  streakDays: number;
  quizzesCompleted: number;
  overallAccuracy: number; // 0-100
  lastActive: string;
  topicMastery: Record<AlgebraTopic, number>; // 0-100%
  recentAttempts: QuizAttempt[];
  teacherNotes?: string;
  strengths: string[];
  needsImprovement: string[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  grade: '6th' | '7th' | '8th';
  xp: number;
  quizzesCompleted: number;
  accuracy: number;
  rank: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export type ToolCategory =
  | 'basic_math'
  | 'algebra'
  | 'functions'
  | 'trigonometry'
  | 'calculus'
  | 'linear_algebra'
  | 'complex_numbers'
  | 'probability_statistics'
  | 'discrete_math'
  | 'number_theory'
  | 'geometry'
  | 'vectors_3d'
  | 'differential_equations'
  | 'transforms'
  | 'numerical_methods'
  | 'engineering_math'
  | 'financial_math'
  | 'physics_math';

export interface ToolDefinition {
  id: string;
  title: string;
  category: ToolCategory;
  categoryName: string;
  description: string;
  academicLevel: AcademicLevel;
  iconName: string;
  tags: string[];
  formula?: string;
  defaultInputs?: Record<string, string | number>;
  inputsConfig: {
    key: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'textarea';
    placeholder?: string;
    defaultValue?: string | number;
    options?: { label: string; value: string }[];
    helperText?: string;
  }[];
  calculate: (inputs: Record<string, any>) => CalculationResult;
  examples: {
    label: string;
    inputs: Record<string, any>;
    explanation?: string;
  }[];
  faq?: { question: string; answer: string }[];
}

export interface CalculationResult {
  exact: string;
  decimal?: string;
  steps: {
    title: string;
    detail: string;
    math?: string;
  }[];
  verification?: string;
  formulaUsed?: string;
  notes?: string;
  warnings?: string[];
  graphData?: {
    type: 'line' | 'quadratic' | 'scatter';
    points?: { x: number; y: number }[];
    equation?: string;
  };
}

export interface FormulaItem {
  id: string;
  category: string;
  name: string;
  latex: string;
  plainText: string;
  variables: { symbol: string; meaning: string }[];
  description: string;
  example: string;
  relatedToolId?: string;
}
