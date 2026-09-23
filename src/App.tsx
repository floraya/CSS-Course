/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LESSONS } from './data/lessons';
import { UserProgress } from './types';
import { TeacherTeachingView } from './components/TeacherTeachingView';
import { StudentLearningView } from './components/StudentLearningView';
import { LessonSidebar } from './components/LessonSidebar';
import { 
  Award, 
  BookOpen, 
  Code2, 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw,
  PanelLeftClose,
  PanelLeftOpen,
  Sliders
} from 'lucide-react';

const STORAGE_KEY = 'css_champion_student_progress_v2';
const SIDEBAR_STORAGE_KEY = 'css_champion_sidebar_expanded_v1';

const defaultProgress: UserProgress = {
  completedLessonIds: [],
  currentLessonId: LESSONS[0].id,
  studentXp: 0,
  savedCustomCss: {},
  completedChallengesCount: 0,
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Cleanse corrupted completedLessonIds where student actually has empty CSS
        if (parsed && Array.isArray(parsed.completedLessonIds)) {
          const savedCss = (parsed.savedCustomCss || {}) as Record<string, string>;
          const validatedCompleted = parsed.completedLessonIds.filter((id: string) => {
            const css = savedCss[id] || '';
            const clean = css.replace(/\/\*[\s\S]*?\*\//g, '').trim();
            return clean.length > 0;
          });
          parsed.completedLessonIds = validatedCompleted;
          parsed.completedChallengesCount = validatedCompleted.length;
          parsed.studentXp = validatedCompleted.length * 50;

          // 清理尚未完成單元的殘留代碼（確保未寫過的地方絕無程式碼）
          const cleanedSavedCss: Record<string, string> = {};
          for (const [id, css] of Object.entries(savedCss)) {
            const clean = (css || '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
            if (clean.length > 0 && (validatedCompleted.includes(id) || id === parsed.currentLessonId)) {
              cleanedSavedCss[id] = css;
            }
          }
          parsed.savedCustomCss = cleanedSavedCss;
        }
        return parsed;
      }
    } catch (e) {
      console.warn('Failed to load progress from localStorage:', e);
    }
    return defaultProgress;
  });

  // Main Page Mode: 'teacher' (老師教學) | 'student' (學生學習)
  const [viewMode, setViewMode] = useState<'teacher' | 'student'>('teacher');

  // 大螢幕側欄是否展開 (預設大螢幕開啟)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
      if (saved !== null) return JSON.parse(saved);
    } catch (e) {}
    return typeof window !== 'undefined' ? window.innerWidth >= 1024 : true;
  });

  // 小螢幕側欄抽屜是否打開
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.warn('Failed to save progress to localStorage:', e);
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, JSON.stringify(isSidebarExpanded));
    } catch (e) {}
  }, [isSidebarExpanded]);

  const currentIndex = LESSONS.findIndex((l) => l.id === progress.currentLessonId);
  const currentLesson = currentIndex >= 0 ? LESSONS[currentIndex] : LESSONS[0];

  const handleSelectLessonId = (id: string) => {
    setProgress((prev) => ({ ...prev, currentLessonId: id }));
  };

  const handleSaveProgress = (lessonId: string, customCss: string, passed: boolean) => {
    setProgress((prev) => {
      let newCompleted: string[];
      if (passed) {
        newCompleted = prev.completedLessonIds.includes(lessonId)
          ? prev.completedLessonIds
          : [...prev.completedLessonIds, lessonId];
      } else {
        newCompleted = prev.completedLessonIds.filter((id) => id !== lessonId);
      }

      return {
        ...prev,
        completedLessonIds: newCompleted,
        studentXp: newCompleted.length * 50,
        completedChallengesCount: newCompleted.length,
        savedCustomCss: {
          ...prev.savedCustomCss,
          [lessonId]: customCss,
        },
      };
    });
  };

  // 即時更新草稿（不影響通關狀態，切換老師視角或重整前不丟失程式碼）
  const handleUpdateDraftCss = (lessonId: string, customCss: string) => {
    setProgress((prev) => ({
      ...prev,
      savedCustomCss: {
        ...prev.savedCustomCss,
        [lessonId]: customCss,
      },
    }));
  };

  const handleNextLesson = () => {
    if (currentIndex < LESSONS.length - 1) {
      const nextId = LESSONS[currentIndex + 1].id;
      setProgress((prev) => {
        const newSaved = { ...prev.savedCustomCss };
        // 如果下一單元尚未通過，確保全新未寫過的地方絕無殘留程式碼
        if (!prev.completedLessonIds.includes(nextId)) {
          delete newSaved[nextId];
        }
        return {
          ...prev,
          currentLessonId: nextId,
          savedCustomCss: newSaved,
        };
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      const prevId = LESSONS[currentIndex - 1].id;
      setProgress((prev) => ({ ...prev, currentLessonId: prevId }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleResetProgress = () => {
    if (window.confirm('確定要清除所有完成紀錄並重新開始嗎？')) {
      setProgress(defaultProgress);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30">
      {/* 頂部簡潔導航列 */}
      <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* 左側：側欄展開/收合切換按鈕 + Logo 標題 */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
                  setIsSidebarExpanded((prev) => !prev);
                } else {
                  setIsMobileDrawerOpen(true);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isSidebarExpanded
                  ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
              }`}
              title={isSidebarExpanded ? '點擊收合章節目錄 (加大編輯區)' : '點擊展開章節目錄'}
            >
              {isSidebarExpanded ? (
                <PanelLeftClose className="w-4 h-4 text-sky-400 shrink-0" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-sky-400 shrink-0" />
              )}
              <span className="hidden sm:inline">課程目錄</span>
              <span className="bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded text-[11px] font-mono">
                {currentIndex + 1}/{LESSONS.length}
              </span>
              <span className="hidden lg:inline text-[10px] text-slate-400">
                {isSidebarExpanded ? '(點擊收合)' : '(展開)'}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Award className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="font-bold text-xs text-white">
                CSS 互動教學特訓
              </span>
            </div>
          </div>

          {/* 中間：角色模式切換（老師教學 vs 學生學習） */}
          <div className="flex items-center gap-2">
            <div className="flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl">
              <button
                onClick={() => setViewMode('teacher')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  viewMode === 'teacher'
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>👨‍🏫 老師教學</span>
              </button>

              <button
                onClick={() => setViewMode('student')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                  viewMode === 'student'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>🧑‍🎓 學生學習</span>
              </button>
            </div>
          </div>

          {/* 右側：快速上一課 / 下一課切換 */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrevLesson}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300"
              title="上一課"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNextLesson}
              disabled={currentIndex === LESSONS.length - 1}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300"
              title="下一課"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleResetProgress}
              className="p-1.5 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800 ml-1"
              title="清除所有通關進度"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 畫面主容器：大螢幕側邊欄 + 主工作區域 */}
      <div className="flex-1 flex w-full">
        {/* 課程章節目錄（大螢幕可展開/收合側欄，小螢幕為滑出抽屜） */}
        <LessonSidebar
          lessons={LESSONS}
          currentLessonId={currentLesson.id}
          onSelectLesson={handleSelectLessonId}
          completedLessonIds={progress.completedLessonIds}
          isExpanded={isSidebarExpanded}
          onToggleExpand={() => setIsSidebarExpanded(!isSidebarExpanded)}
          isMobileDrawerOpen={isMobileDrawerOpen}
          onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
        />

        {/* 主內容區塊：保持兩者掛載，切換時不遺失任何正在撰寫中的程式碼與游標狀態 */}
        <main className="flex-1 min-w-0 py-4 overflow-x-hidden">
          <div className={viewMode === 'teacher' ? 'block' : 'hidden'}>
            <TeacherTeachingView
              key={currentLesson.id}
              lesson={currentLesson}
              onSwitchToStudent={() => setViewMode('student')}
              onNextLesson={currentIndex < LESSONS.length - 1 ? handleNextLesson : undefined}
              onPrevLesson={currentIndex > 0 ? handlePrevLesson : undefined}
              currentIndex={currentIndex}
              totalLessons={LESSONS.length}
            />
          </div>

          <div className={viewMode === 'student' ? 'block' : 'hidden'}>
            <StudentLearningView
              key={currentLesson.id}
              lesson={currentLesson}
              progress={progress}
              onSaveProgress={handleSaveProgress}
              onUpdateDraftCss={handleUpdateDraftCss}
              onNextLesson={currentIndex < LESSONS.length - 1 ? handleNextLesson : undefined}
              onSwitchToTeacher={() => setViewMode('teacher')}
              currentIndex={currentIndex}
              totalLessons={LESSONS.length}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
