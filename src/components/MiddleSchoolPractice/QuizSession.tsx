import React, { useState, useEffect } from 'react';
import { QuizQuestion, QuizAttempt, AlgebraTopic } from '../../types/math';
import { FeedbackModal } from './FeedbackModal';
import { generateProceduralQuestion } from '../../data/middleSchoolAlgebra';
import confetti from 'canvas-confetti';
import {
  Clock,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Award,
  ChevronRight,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';

interface QuizSessionProps {
  topic: AlgebraTopic | 'mixed';
  topicTitle: string;
  initialQuestions: QuizQuestion[];
  studentId: string;
  onFinishQuiz: (attempt: QuizAttempt) => void;
  onExit: () => void;
}

export const QuizSession: React.FC<QuizSessionProps> = ({
  topic,
  topicTitle,
  initialQuestions,
  studentId,
  onFinishQuiz,
  onExit,
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackQuestion, setFeedbackQuestion] = useState<QuizQuestion | null>(null);

  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [answersLog, setAnswersLog] = useState<{
    questionId: string;
    questionText: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    topic: AlgebraTopic;
  }[]>([]);

  const [isFinished, setIsFinished] = useState(false);

  // Timer
  useEffect(() => {
    if (isFinished) return;
    const interval = setInterval(() => {
      setSecondsElapsed(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isFinished]);

  const currentQ = questions[currentIndex];
  const progressPercent = Math.round(((currentIndex + (isAnswerSubmitted ? 1 : 0)) / questions.length) * 100);

  const handleSubmitAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentQ.correctAnswer;

    const newLogEntry = {
      questionId: currentQ.id,
      questionText: currentQ.questionText,
      userAnswer: selectedOption,
      correctAnswer: currentQ.correctAnswer,
      isCorrect,
      topic: currentQ.topic,
    };

    setAnswersLog(prev => [...prev, newLogEntry]);

    // If incorrect, prompt feedback immediately so the student learns before continuing!
    if (!isCorrect) {
      setFeedbackQuestion(currentQ);
      setShowFeedbackModal(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
      setShowHint(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);
    const totalCorrect = answersLog.filter(a => a.isCorrect).length + (selectedOption === currentQ.correctAnswer && !answersLog.some(l => l.questionId === currentQ.id) ? 1 : 0);
    const scorePct = Math.round((totalCorrect / questions.length) * 100);

    if (scorePct >= 80) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    const attempt: QuizAttempt = {
      id: `att_${Date.now()}`,
      quizTitle: `${topicTitle} Quiz`,
      topic,
      date: 'Just now',
      score: totalCorrect,
      totalQuestions: questions.length,
      percentage: scorePct,
      timeSpentSeconds: secondsElapsed,
      answers: answersLog,
    };

    onFinishQuiz(attempt);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleTrySimilar = () => {
    if (!feedbackQuestion) return;
    const sim = generateProceduralQuestion(feedbackQuestion.topic, feedbackQuestion.difficulty);
    // Append or replace
    setQuestions(prev => [...prev, sim]);
    setShowFeedbackModal(false);
  };

  // Completion Screen
  if (isFinished) {
    const totalCorrect = answersLog.filter(a => a.isCorrect).length;
    const scorePct = Math.round((totalCorrect / questions.length) * 100);
    const xpEarned = 50 + totalCorrect * 25;

    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-8 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-6">
            <Award className="w-10 h-10" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            Quiz Completed!
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {topicTitle} • Middle School Algebra
          </p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                {scorePct}%
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Accuracy ({totalCorrect}/{questions.length})
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-amber-500">
                +{xpEarned} XP
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Leaderboard XP
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="text-2xl font-black text-slate-700 dark:text-slate-200">
                {formatTime(secondsElapsed)}
              </div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Time Spent
              </div>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div className="text-left mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Performance Review
            </h3>
            <div className="space-y-2.5">
              {answersLog.map((ans, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-xs"
                >
                  <div className="flex items-center gap-3">
                    {ans.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                    <div>
                      <div className="font-semibold text-slate-800 dark:text-slate-200">
                        {ans.questionText}
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                        Answered: <span className="font-medium text-slate-700 dark:text-slate-300">{ans.userAnswer}</span>
                        {!ans.isCorrect && (
                          <span className="text-emerald-600 dark:text-emerald-400 ml-2">
                            (Correct: {ans.correctAnswer})
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const q = questions.find(item => item.id === ans.questionId) || questions[0];
                      setFeedbackQuestion(q);
                      setSelectedOption(ans.userAnswer);
                      setShowFeedbackModal(true);
                    }}
                    className="shrink-0 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-[11px] font-semibold text-blue-600 dark:text-blue-400 transition"
                  >
                    View Steps
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => {
                setQuestions(initialQuestions);
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswerSubmitted(false);
                setAnswersLog([]);
                setSecondsElapsed(0);
                setIsFinished(false);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>

            <button
              onClick={onExit}
              className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition flex items-center justify-center gap-2"
            >
              <span>Back to Practice Hub</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFeedbackModal && feedbackQuestion && (
          <FeedbackModal
            question={feedbackQuestion}
            userAnswer={selectedOption || ''}
            onClose={() => setShowFeedbackModal(false)}
            onTrySimilar={handleTrySimilar}
          />
        )}
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Exit
        </button>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatTime(secondsElapsed)}
            </span>
          </div>

          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 mb-6 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
            {currentQ.topicLabel}
          </span>
          <span className="text-xs text-slate-500 font-medium">
            Grade {currentQ.gradeLevel} • {currentQ.difficulty.toUpperCase()}
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
          {currentQ.questionText}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map(opt => {
            const isSelected = selectedOption === opt.text;
            let optStyle = 'border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/30';

            if (isSelected) {
              optStyle = 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/60 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/30';
            }

            if (isAnswerSubmitted) {
              if (opt.isCorrect) {
                optStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-200';
              } else if (isSelected && !opt.isCorrect) {
                optStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-200';
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswerSubmitted}
                onClick={() => setSelectedOption(opt.text)}
                className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition flex items-center justify-between cursor-pointer ${optStyle}`}
              >
                <span>{opt.text}</span>
                {isAnswerSubmitted && opt.isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !opt.isCorrect && (
                  <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Hint Section */}
        <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          {!showHint ? (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-1.5 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need a Hint?</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>Hint:</strong> {currentQ.hint}</span>
            </div>
          )}

          {isAnswerSubmitted && (
            <button
              onClick={() => {
                setFeedbackQuestion(currentQ);
                setShowFeedbackModal(true);
              }}
              className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>View Full Steps & Mistake Analysis</span>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500 font-medium">
          {isAnswerSubmitted ? (
            selectedOption === currentQ.correctAnswer ? (
              <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Correct! +25 XP
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                <XCircle className="w-4 h-4" /> Incorrect — check step analysis
              </span>
            )
          ) : (
            'Select an option above and click Submit'
          )}
        </div>

        {!isAnswerSubmitted ? (
          <button
            disabled={!selectedOption}
            onClick={handleSubmitAnswer}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition cursor-pointer"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-xs font-bold text-white dark:text-slate-900 shadow-md transition flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Modal for Automated Feedback */}
      {showFeedbackModal && feedbackQuestion && (
        <FeedbackModal
          question={feedbackQuestion}
          userAnswer={selectedOption || ''}
          onClose={() => setShowFeedbackModal(false)}
          onTrySimilar={handleTrySimilar}
        />
      )}
    </div>
  );
};
