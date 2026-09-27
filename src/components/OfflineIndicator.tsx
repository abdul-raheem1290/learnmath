import React from 'react';
import { WifiOff, CheckCircle2 } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-bounce">
      <WifiOff className="w-4 h-4 text-amber-200" />
      <span>Offline Mode — All middle school algebra quizzes, calculators & feedback work 100% offline!</span>
    </div>
  );
};

export const OfflineBadge: React.FC = () => {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
      <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
      <span>Offline Ready</span>
    </span>
  );
};
