import React from 'react';
import { QuizQuestion } from '../../types/math';
import { AlertCircle, CheckCircle2, HelpCircle, ArrowRight, Lightbulb, RefreshCw } from 'lucide-react';

interface FeedbackModalProps {
  question: QuizQuestion;
  userAnswer: string;
  onClose: () => void;
  onTrySimilar?: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  question,
  userAnswer,
  onClose,
  onTrySimilar,
}) => {
  const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div
          className={`p-5 flex items-center justify-between text-white ${
            isCorrect
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600'
              : 'bg-gradient-to-r from-rose-600 to-amber-600'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
              {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-lg font-bold">
                {isCorrect ? 'Outstanding Work! Correct Answer' : 'Automated Step-by-Step Feedback'}
              </h3>
              <p className="text-xs text-white/90">
                {question.topicLabel} • Grade {question.gradeLevel} Algebra
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white px-2 py-1 rounded-lg text-sm bg-white/10 hover:bg-white/20 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Question & Comparison */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
              Original Problem
            </div>
            <div className="text-base font-semibold text-slate-900 dark:text-white mb-3">
              {question.questionText}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div
                className={`p-3 rounded-lg border ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-300'
                }`}
              >
                <div className="text-xs font-bold uppercase mb-0.5">Your Answer</div>
                <div className="font-semibold text-base">{userAnswer || 'No answer selected'}</div>
              </div>

              <div className="p-3 rounded-lg border bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300">
                <div className="text-xs font-bold uppercase mb-0.5">Correct Answer</div>
                <div className="font-semibold text-base">{question.correctAnswer}</div>
              </div>
            </div>
          </div>

          {/* Common Misconception Alert (if incorrect) */}
          {!isCorrect && question.commonMisconception && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-amber-950 dark:text-amber-200">
                    Why did this happen? (Common Algebra Misconception)
                  </h4>
                  <p className="text-xs text-amber-900 dark:text-amber-300 leading-relaxed">
                    {question.commonMisconception.description}
                  </p>
                  <p className="text-xs font-semibold text-amber-950 dark:text-amber-100 mt-1">
                    💡 How to avoid: {question.commonMisconception.howToAvoid}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step-by-Step Solution Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-blue-500" /> Complete Step-by-Step Solution
            </h4>

            <div className="space-y-2.5">
              {question.solutionSteps.map(step => (
                <div
                  key={step.stepNumber}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 ml-7 leading-relaxed">
                    {step.description}
                  </p>
                  {step.mathExpression && (
                    <div className="ml-7 mt-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-900 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {step.mathExpression}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Independent Verification */}
          {question.verification && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Independent Verification Check</span>
              </div>
              <p className="text-xs leading-relaxed">{question.verification}</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {onTrySimilar ? (
            <button
              onClick={() => {
                onClose();
                onTrySimilar();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Practice Similar Problem</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold transition shadow-xs"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
