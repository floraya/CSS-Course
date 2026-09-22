import React from 'react';
import { X, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { Lesson } from '../types';

interface LessonDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  completedLessonIds: string[];
}

export const LessonDrawer: React.FC<LessonDrawerProps> = ({
  isOpen,
  onClose,
  lessons,
  currentLessonId,
  onSelectLesson,
  completedLessonIds,
}) => {
  if (!isOpen) return null;

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* 側欄抽屜本體 */}
      <div className="relative w-80 max-w-[85vw] h-full bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col z-10 animate-scaleIn">
        {/* 抽屜頂部 */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">課程章節目錄</h2>
              <p className="text-[11px] text-slate-400">
                完成進度：{completedCount} / {lessons.length} ({progressPercent}%)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="關閉目錄"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 進度條 */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-emerald-500 h-1 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 課程列表 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {lessons.map((lesson, idx) => {
            const isSelected = lesson.id === currentLessonId;
            const isCompleted = completedLessonIds.includes(lesson.id);

            return (
              <button
                key={lesson.id}
                onClick={() => {
                  onSelectLesson(lesson.id);
                  onClose();
                }}
                className={`w-full text-left p-3 rounded-xl transition-all flex items-center justify-between gap-3 text-xs ${
                  isSelected
                    ? 'bg-sky-500/20 border border-sky-500/40 text-white font-semibold'
                    : 'bg-slate-950/40 hover:bg-slate-800/60 border border-slate-800/60 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] shrink-0 font-bold ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isSelected
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </span>

                  <div className="truncate">
                    <div className="truncate text-slate-100 font-medium">
                      {lesson.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {lesson.categoryName}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>
            );
          })}
        </div>

        {/* 底部說明 */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[11px] text-slate-400 text-center">
          點擊任一單元即可快速跳轉教學
        </div>
      </div>
    </div>
  );
};
