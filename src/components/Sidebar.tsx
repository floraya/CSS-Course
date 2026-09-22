import React, { useState } from 'react';
import { CheckCircle2, Circle, Search, X, Award, ChevronRight, BookMarked, Sparkles } from 'lucide-react';
import { Lesson, UserProgress } from '../types';

interface SidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  progress: UserProgress;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  progress,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLessons = lessons.filter(
    (l) =>
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-50 w-80 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Search */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
              <BookMarked className="w-4 h-4 text-sky-400" />
              <span>Fooish CSS 課程教材</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="搜尋語法、選擇器、盒模型..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
            />
          </div>
        </div>

        {/* Lesson List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredLessons.map((lesson, index) => {
            const isSelected = lesson.id === currentLessonId;
            const isCompleted = progress.completedLessonIds.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 group relative border ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/40 text-white shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-slate-800/60 text-slate-300'
                }`}
              >
                {/* Index / Status Icon */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isSelected ? (
                    <div className="w-4 h-4 rounded-full border-2 border-sky-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    </div>
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-wider">
                      {lesson.categoryName}
                    </span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                        lesson.difficulty === '競賽實戰'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : lesson.difficulty === '進階'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lesson.difficulty}
                    </span>
                  </div>

                  <h4 className="text-xs font-semibold leading-snug line-clamp-1 group-hover:text-white">
                    {index + 1}. {lesson.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {lesson.subtitle}
                  </p>
                </div>

                <ChevronRight
                  className={`w-3.5 h-3.5 mt-3 shrink-0 transition-transform ${
                    isSelected ? 'text-sky-400 translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'
                  }`}
                />
              </button>
            );
          })}

          {filteredLessons.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              找不到相符的課程單元
            </div>
          )}
        </div>

        {/* Footer Gold Medal Status */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xs">
              <div className="font-semibold text-slate-200 flex items-center gap-1">
                通關進度
                <Sparkles className="w-3 h-3 text-amber-400" />
              </div>
              <div className="text-slate-400 text-[11px]">
                已完成 {progress.completedLessonIds.length} / {lessons.length} 挑戰
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
