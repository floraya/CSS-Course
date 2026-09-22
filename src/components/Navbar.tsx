import React from 'react';
import { Award, BookOpen, Code2, Sparkles, Menu, ExternalLink, RotateCcw, Trophy } from 'lucide-react';
import { UserProgress } from '../types';

interface NavbarProps {
  currentMode: 'lecture' | 'practice' | 'sandbox';
  onModeChange: (mode: 'lecture' | 'practice' | 'sandbox') => void;
  progress: UserProgress;
  totalLessons: number;
  onToggleSidebar: () => void;
  onResetProgress: () => void;
  currentLessonTitle: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onModeChange,
  progress,
  totalLessons,
  onToggleSidebar,
  onResetProgress,
  currentLessonTitle,
}) => {
  const completionPercentage = Math.round(
    (progress.completedLessonIds.length / totalLessons) * 100
  );

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Sidebar toggle & Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="開啟/收合課程目錄"
            aria-label="課程目錄"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
              <Award className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                  CSS 互動特訓教室
                  <span className="hidden sm:inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    金手獎選手專屬
                  </span>
                </span>
              </div>
              <div className="text-xs text-slate-400 truncate max-w-[220px] sm:max-w-sm">
                當前：<span className="text-sky-400 font-medium">{currentLessonTitle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher */}
        <div className="hidden md:flex items-center p-1 bg-slate-950/80 rounded-xl border border-slate-800">
          <button
            onClick={() => onModeChange('lecture')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentMode === 'lecture'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. 老師講解範例</span>
          </button>

          <button
            onClick={() => onModeChange('practice')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentMode === 'practice'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>2. 學生動手實作</span>
          </button>

          <button
            onClick={() => onModeChange('sandbox')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              currentMode === 'sandbox'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>自由沙盒試驗</span>
          </button>
        </div>

        {/* Right: Progress, XP & Links */}
        <div className="flex items-center gap-3 shrink-0">
          {/* XP Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-bold">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>{progress.studentXp} XP</span>
          </div>

          {/* Progress Pill */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
            <span>進度</span>
            <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="font-mono text-sky-400 font-semibold">{completionPercentage}%</span>
          </div>

          {/* Fooish CSS reference link */}
          <a
            href="https://www.fooish.com/css/"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-300 px-2.5 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
            title="開啟 Fooish CSS 教學手冊"
          >
            <span>Fooish 手冊</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Reset progress */}
          <button
            onClick={onResetProgress}
            className="p-1.5 text-slate-500 hover:text-slate-300 hover:bg-slate-800 rounded-lg transition-colors"
            title="重設全部學習進度"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Mode Switcher Bar */}
      <div className="md:hidden flex border-t border-slate-800 bg-slate-950 px-2 py-1 gap-1">
        <button
          onClick={() => onModeChange('lecture')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md ${
            currentMode === 'lecture' ? 'bg-sky-600 text-white' : 'text-slate-400'
          }`}
        >
          老師講解
        </button>
        <button
          onClick={() => onModeChange('practice')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md ${
            currentMode === 'practice' ? 'bg-sky-600 text-white' : 'text-slate-400'
          }`}
        >
          學生實作
        </button>
        <button
          onClick={() => onModeChange('sandbox')}
          className={`flex-1 py-1.5 text-center text-xs font-medium rounded-md ${
            currentMode === 'sandbox' ? 'bg-sky-600 text-white' : 'text-slate-400'
          }`}
        >
          沙盒
        </button>
      </div>
    </header>
  );
};
