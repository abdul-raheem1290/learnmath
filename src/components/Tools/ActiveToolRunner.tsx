import React, { useState, useEffect } from 'react';
import { ToolDefinition, CalculationResult } from '../../types/math';
import { MathKeypad } from './MathKeypad';
import { addCalcHistory, toggleFavorite, getFavorites } from '../../services/storage';
import {
  ArrowLeft,
  Star,
  Copy,
  Check,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  Calculator,
  ChevronDown,
  Printer,
  Share2,
} from 'lucide-react';

interface ActiveToolRunnerProps {
  tool: ToolDefinition;
  onBack: () => void;
}

export const ActiveToolRunner: React.FC<ActiveToolRunnerProps> = ({
  tool,
  onBack,
}) => {
  const [inputs, setInputs] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    tool.inputsConfig.forEach(cfg => {
      initial[cfg.key] = cfg.defaultValue !== undefined ? cfg.defaultValue : '';
    });
    return initial;
  });

  const [activeInputKey, setActiveInputKey] = useState<string>(
    tool.inputsConfig[0]?.key || ''
  );
  const [showKeypad, setShowKeypad] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(getFavorites().includes(tool.id));
    // Calculate initial result on open
    try {
      const res = tool.calculate(inputs);
      setResult(res);
    } catch (e) {
      console.error(e);
    }
  }, [tool.id]);

  const handleInputChange = (key: string, val: any) => {
    setInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      const res = tool.calculate(inputs);
      setResult(res);
      addCalcHistory({
        toolId: tool.id,
        toolTitle: tool.title,
        inputs,
        result: res.exact,
      });
    } catch (err: any) {
      setResult({
        exact: 'Could not evaluate expression',
        steps: [
          { title: 'Check input format', detail: err.message || 'Please verify the entered numbers.' },
        ],
        warnings: ['Ensure numbers are formatted correctly.'],
      });
    }
  };

  const handleKeypadInsert = (text: string) => {
    if (!activeInputKey) return;
    const current = String(inputs[activeInputKey] ?? '');
    setInputs(prev => ({ ...prev, [activeInputKey]: current + text }));
  };

  const handleKeypadBackspace = () => {
    if (!activeInputKey) return;
    const current = String(inputs[activeInputKey] ?? '');
    setInputs(prev => ({ ...prev, [activeInputKey]: current.slice(0, -1) }));
  };

  const handleKeypadClear = () => {
    if (!activeInputKey) return;
    setInputs(prev => ({ ...prev, [activeInputKey]: '' }));
  };

  const handleCopyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(`${tool.title}\nResult: ${result.exact}\n${result.decimal ? `Decimal: ${result.decimal}` : ''}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleFav = () => {
    const updated = toggleFavorite(tool.id);
    setIsFavorite(updated.includes(tool.id));
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-6">
      {/* Navigation & Tool Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tools Directory
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleFav}
            className={`p-2 rounded-xl border transition cursor-pointer ${
              isFavorite
                ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-500'
                : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-600'
            }`}
            title="Toggle Favorite"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="Print Solution"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tool Identity Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
            {tool.categoryName}
          </span>
          <span className="text-xs text-slate-400">• Standard Curriculum Tool</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          {tool.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          {tool.description}
        </p>

        {tool.formula && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/80 font-mono text-xs text-blue-600 dark:text-blue-400 font-semibold">
            Formula: {tool.formula}
          </div>
        )}
      </div>

      {/* Clickable Examples */}
      {tool.examples.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" /> Click to Load Example:
          </span>
          {tool.examples.map((ex, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInputs(ex.inputs);
                const res = tool.calculate(ex.inputs);
                setResult(res);
              }}
              className="px-3 py-1 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 transition cursor-pointer shadow-2xs"
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Calculator Form */}
      <form onSubmit={handleCalculate} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-md space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Enter Values
            </h2>
            <button
              type="button"
              onClick={() => setShowKeypad(!showKeypad)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{showKeypad ? 'Hide Keypad' : 'Open Math Keypad'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tool.inputsConfig.map(cfg => (
              <div key={cfg.key} className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {cfg.label}
                </label>
                {cfg.type === 'select' ? (
                  <select
                    value={inputs[cfg.key]}
                    onChange={e => handleInputChange(cfg.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cfg.options?.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : cfg.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={inputs[cfg.key]}
                    onFocus={() => setActiveInputKey(cfg.key)}
                    onChange={e => handleInputChange(cfg.key, e.target.value)}
                    placeholder={cfg.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                ) : (
                  <input
                    type={cfg.type}
                    value={inputs[cfg.key]}
                    onFocus={() => setActiveInputKey(cfg.key)}
                    onChange={e => handleInputChange(cfg.key, e.target.value)}
                    placeholder={cfg.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                )}
                {cfg.helperText && (
                  <div className="text-[10px] text-slate-400">{cfg.helperText}</div>
                )}
              </div>
            ))}
          </div>

          {/* Keypad Display */}
          {showKeypad && (
            <div className="pt-2">
              <MathKeypad
                onInsert={handleKeypadInsert}
                onBackspace={handleKeypadBackspace}
                onClear={handleKeypadClear}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
        >
          Calculate & Show Step-by-Step Solution
        </button>
      </form>

      {/* Results Display */}
      {result && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculation Output
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">
                {result.exact}
              </h3>
              {result.decimal && (
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-0.5">
                  Approx / Form: {result.decimal}
                </div>
              )}
            </div>

            <button
              onClick={handleCopyResult}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Answer'}</span>
            </button>
          </div>

          {/* Step-by-Step Solution */}
          {result.steps && result.steps.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-blue-500" /> Complete Step-by-Step Derivation
              </h4>

              <div className="space-y-3">
                {result.steps.map((st, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1.5"
                  >
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{st.title}</span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed ml-7">
                      {st.detail}
                    </p>
                    {st.math && (
                      <div className="ml-7 p-2 rounded-lg bg-white dark:bg-slate-900 font-mono font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800">
                        {st.math}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification */}
          {result.verification && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Independent Mathematical Check: </span>
                <span>{result.verification}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FAQ */}
      {tool.faq && tool.faq.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {tool.faq.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {item.question}
                </div>
                <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
