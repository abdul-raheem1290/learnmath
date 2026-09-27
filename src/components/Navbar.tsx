import React, { useState } from 'react';
import {
  BookOpen,
  Trophy,
  BarChart2,
  Calculator,
  LineChart,
  Camera,
  Sun,
  Moon,
  Menu,
  X,
  Sigma,
  Download,
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { OfflineBadge } from './OfflineIndicator';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenPhotoSolver: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  isDark,
  onToggleTheme,
  onOpenPhotoSolver,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'practice', label: 'Algebra Practice', icon: BookOpen },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'teacher', label: 'Teacher Dashboard', icon: BarChart2 },
    { id: 'tools', label: '200+ Tools', icon: Calculator },
    { id: 'grapher', label: 'Grapher', icon: LineChart },
    { id: 'formulas', label: 'Formulas', icon: Sigma },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div
          onClick={() => onSelectTab('practice')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            <Sigma className="w-5 h-5 font-black" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base text-slate-900 dark:text-white tracking-tight">
                MathMaster
              </span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded-md bg-blue-600 text-white">
                PRO
              </span>
            </div>
            <div className="text-[10px] font-medium text-slate-400 -mt-1 hidden sm:block">
              Middle School Algebra & Super Tools
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <OfflineBadge />
          </div>

          <button
            onClick={onOpenPhotoSolver}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition text-xs font-bold cursor-pointer"
            title="Snap or upload equation photo"
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Photo Solver</span>
          </button>

          <PWAInstallButton />

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Toggle theme (Light / Dark)"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold transition text-left ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4 text-blue-500" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
