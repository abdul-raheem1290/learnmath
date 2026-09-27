import React, { useState } from 'react';
import { FORMULA_LIBRARY } from '../../data/formulaLibrary';
import { FormulaItem } from '../../types/math';
import { Search, Copy, Check, BookOpen, ExternalLink, Sparkles } from 'lucide-react';

interface FormulaLibraryViewProps {
  onOpenTool: (toolId: string) => void;
}

export const FormulaLibraryView: React.FC<FormulaLibraryViewProps> = ({
  onOpenTool,
}) => {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = FORMULA_LIBRARY.filter(
    f =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.plainText.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Interactive Formula Index</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Mathematical Formula Library
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Search essential middle school algebra and academic formulas with variable breakdowns and linked solvers.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search formulas (e.g. slope, quadratic, pythagoras)..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {item.category}
                </span>
                <button
                  onClick={() => handleCopy(item.id, item.plainText)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition"
                  title="Copy Formula"
                >
                  {copiedId === item.id ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Copied
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <Copy className="w-3 h-3" /> Copy
                    </span>
                  )}
                </button>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {item.name}
              </h3>

              <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 font-mono text-sm font-bold text-blue-700 dark:text-blue-300">
                {item.plainText}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>

              {/* Variables */}
              <div className="space-y-1 pt-1">
                <div className="text-[10px] font-bold uppercase text-slate-400">Variables</div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {item.variables.map((v, idx) => (
                    <div key={idx} className="flex items-baseline gap-1.5 text-[11px]">
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{v.symbol}:</span>
                      <span className="text-slate-500 dark:text-slate-400">{v.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Example */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-[11px] text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">Example: </span>
                <span>{item.example}</span>
              </div>
            </div>

            {item.relatedToolId && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => onOpenTool(item.relatedToolId!)}
                  className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <span>Open Interactive Solver</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
