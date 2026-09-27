import React, { useState, useEffect } from 'react';
import { getAllTools, CATEGORY_LABELS } from '../../data/toolsRegistry';
import { ToolDefinition, ToolCategory } from '../../types/math';
import { ActiveToolRunner } from './ActiveToolRunner';
import {
  Search,
  Filter,
  Calculator,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Check,
} from 'lucide-react';

interface ToolsDirectoryProps {
  initialToolId?: string;
}

export const ToolsDirectory: React.FC<ToolsDirectoryProps> = ({
  initialToolId,
}) => {
  const allTools = getAllTools();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTool, setSelectedTool] = useState<ToolDefinition | null>(() => {
    if (initialToolId) {
      return allTools.find(t => t.id === initialToolId) || null;
    }
    return null;
  });

  // Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-tool-search');
        if (searchInput) searchInput.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const categories = [
    { id: 'all', label: 'All Tools (200+)' },
    { id: 'algebra', label: 'Algebra' },
    { id: 'basic_math', label: 'Basic Math' },
    { id: 'geometry', label: 'Geometry' },
    { id: 'probability_statistics', label: 'Probability & Statistics' },
    { id: 'calculus', label: 'Calculus' },
    { id: 'financial_math', label: 'Financial' },
    { id: 'physics_math', label: 'Physics' },
    { id: 'linear_algebra', label: 'Linear Algebra' },
    { id: 'trigonometry', label: 'Trigonometry' },
  ];

  const filteredTools = allTools.filter(t => {
    const matchCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  if (selectedTool) {
    return (
      <ActiveToolRunner
        tool={selectedTool}
        onBack={() => setSelectedTool(null)}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span>Complete Mathematics Workspace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          200+ Mathematical Tools & Solvers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Natural mathematical input, exact fractional & decimal results, step-by-step solutions, and zero API dependency.
        </p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="global-tool-search"
            type="text"
            placeholder="Search tools, topics, formulas... (Press Ctrl + K)"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="hidden sm:inline-block absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-200 dark:border-slate-700">
            Ctrl K
          </span>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            onClick={() => setSelectedTool(tool)}
            className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-blue-500 transition cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  {tool.categoryName}
                </span>
                <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">
                  {tool.academicLevel.replace('_', ' ')}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                  {tool.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              {tool.formula && (
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-[11px] text-blue-600 dark:text-blue-400 truncate">
                  {tool.formula}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 mt-4 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">
                Step-by-step enabled
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition">
                <span>Calculate</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="p-12 text-center text-slate-500">
          <Calculator className="w-10 h-10 mx-auto text-slate-400 mb-3" />
          <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">
            No mathematical tools match your search
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try searching for "linear", "quadratic", "slope", or "mean"
          </p>
        </div>
      )}
    </div>
  );
};
