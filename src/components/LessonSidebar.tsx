import React, { useState, useMemo } from 'react';
import { 
  X, 
  CheckCircle2, 
  ChevronRight, 
  Layers, 
  Search, 
  PanelLeftClose, 
  PanelLeftOpen,
  Award,
  BookOpen,
  ChevronLeft
} from 'lucide-react';
import { Lesson } from '../types';

interface LessonSidebarProps {
  lessons: Lesson[];
  currentLessonId: string;
  onSelectLesson: (id: string) => void;
  completedLessonIds: string[];
  // 大螢幕展開/收合狀態
  isExpanded: boolean;
  onToggleExpand: () => void;
  // 小螢幕抽屜開關
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({
  lessons,
  currentLessonId,
  onSelectLesson,
  completedLessonIds,
  isExpanded,
  onToggleExpand,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = completedLessonIds.length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  // 搜尋過濾
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    const query = searchQuery.toLowerCase();
    return lessons.filter(
      (l) =>
        l.title.toLowerCase().includes(query) ||
        l.categoryName.toLowerCase().includes(query) ||
        l.concept.summary.toLowerCase().includes(query) ||
        (l.concept.mnemonic && l.concept.mnemonic.toLowerCase().includes(query))
    );
  }, [lessons, searchQuery]);

  // 排版核心概念標籤
  const getLayoutSuperpower = (id: string) => {
    switch (id) {
      case 'css-box-model-deep':
        return { tag: '📦 盒模型防爆', color: 'text-indigo-300 bg-indigo-950/70 border-indigo-500/40' };
      case 'css-display-modes':
        return { tag: '🧱 display 三形態', color: 'text-sky-300 bg-sky-950/70 border-sky-500/40' };
      case 'css-positioning-master':
        return { tag: '🧭 子絕父相', color: 'text-amber-300 bg-amber-950/70 border-amber-500/40' };
      case 'css-flexbox-superhero':
        return { tag: '⚡ Flexbox 神器', color: 'text-emerald-300 bg-emerald-950/70 border-emerald-500/40' };
      case 'css-grid-layout':
        return { tag: '▦ Grid 二維網格', color: 'text-purple-300 bg-purple-950/70 border-purple-500/40' };
      case 'css-responsive-media-queries':
        return { tag: '📱 跨屏 RWD', color: 'text-cyan-300 bg-cyan-950/70 border-cyan-500/40' };
      default:
        return null;
    }
  };

  // 渲染章節清單列表項目
  const renderLessonList = (onItemClick?: () => void) => (
    <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
      {filteredLessons.length === 0 ? (
        <div className="text-center py-8 text-slate-500 text-xs">
          找不到符合「{searchQuery}」的單元
        </div>
      ) : (
        filteredLessons.map((lesson) => {
          const originalIndex = lessons.findIndex((l) => l.id === lesson.id);
          const isSelected = lesson.id === currentLessonId;
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => {
                onSelectLesson(lesson.id);
                if (onItemClick) onItemClick();
              }}
              className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-2.5 text-xs group relative ${
                isSelected
                  ? 'bg-sky-500/20 border border-sky-500/50 text-white font-semibold shadow-xs'
                  : 'bg-slate-950/40 hover:bg-slate-800/70 border border-slate-800/60 text-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute left-0 top-2 bottom-2 w-1 bg-sky-400 rounded-r-full" />
              )}

              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-[11px] shrink-0 font-bold transition-transform group-hover:scale-105 ${
                    isCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isSelected
                      ? 'bg-sky-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : originalIndex + 1}
                </span>

                <div className="truncate flex-1">
                  <div className="truncate text-slate-100 font-medium text-xs">
                    {lesson.title}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5 flex items-center gap-1.5">
                    <span>{lesson.categoryName.replace(/^第\s*\d+\s*模組：/, '')}</span>
                    <span className="text-slate-600">•</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-medium ${
                      lesson.difficulty === '畢業考題'
                        ? 'text-amber-300 bg-amber-500/20 border border-amber-500/40 font-bold'
                        : lesson.difficulty === '入門'
                        ? 'text-emerald-400 bg-emerald-950/40'
                        : lesson.difficulty === '進階'
                        ? 'text-sky-400 bg-sky-950/40'
                        : 'text-amber-400 bg-amber-950/40'
                    }`}>
                      {lesson.difficulty}
                    </span>

                    {getLayoutSuperpower(lesson.id) && (
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold border ${getLayoutSuperpower(lesson.id)?.color}`}>
                        {getLayoutSuperpower(lesson.id)?.tag}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <ChevronRight
                className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                  isSelected ? 'text-sky-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              />
            </button>
          );
        })
      )}
    </div>
  );

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* 1. 大螢幕模式 (Desktop lg+) 常駐/展開收合側欄 */}
      {/* ------------------------------------------------------------- */}
      <aside
        className={`hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-in-out border-r border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-16 h-[calc(100vh-4rem)] z-20 ${
          isExpanded ? 'w-72 xl:w-80' : 'w-14'
        }`}
      >
        {isExpanded ? (
          // 展開狀態完整目錄
          <div className="flex flex-col h-full overflow-hidden">
            {/* 頂部標題與收合按鈕 */}
            <div className="p-3.5 border-b border-slate-800 flex items-center justify-between gap-2 bg-slate-950/50">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                  <Layers className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <h2 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                    <span>課程章節目錄</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 font-mono">
                      {lessons.length} 單元
                    </span>
                  </h2>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    已完成 {completedCount} / {lessons.length} ({progressPercent}%)
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleExpand}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0"
                title="收合目錄側欄 (加寬編輯區)"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            </div>

            {/* 進度條 */}
            <div className="w-full bg-slate-800 h-1">
              <div
                className="bg-gradient-to-r from-sky-500 to-emerald-500 h-1 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 搜尋欄 */}
            <div className="p-2.5 border-b border-slate-800 bg-slate-950/30">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋單元名稱或關鍵字..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:border-sky-500 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* 單元列表 */}
            {renderLessonList()}

            {/* 底部小提示 */}
            <div className="p-2.5 border-t border-slate-800 bg-slate-950/40 text-[10px] text-slate-400 flex items-center justify-between">
              <span>💡 點選任一單元即時切換</span>
              <button
                type="button"
                onClick={onToggleExpand}
                className="text-sky-400 hover:text-sky-300 underline font-medium"
              >
                收合側欄
              </button>
            </div>
          </div>
        ) : (
          // 收合狀態精巧軌道 (Mini Rail)
          <div className="flex flex-col items-center justify-between h-full py-3">
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={onToggleExpand}
                className="p-2.5 text-sky-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors shadow-xs"
                title="展開課程章節目錄"
              >
                <PanelLeftOpen className="w-4 h-4" />
              </button>

              <div className="w-8 h-[1px] bg-slate-800 my-1" />

              {/* 縮小版的章節快速切換 */}
              <div className="flex flex-col items-center gap-1.5 overflow-y-auto max-h-[calc(100vh-14rem)] px-1">
                {lessons.map((lesson, idx) => {
                  const isSelected = lesson.id === currentLessonId;
                  const isCompleted = completedLessonIds.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onSelectLesson(lesson.id)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-[10px] font-bold transition-all ${
                        isSelected
                          ? 'bg-sky-500 text-slate-950 ring-2 ring-sky-400 ring-offset-1 ring-offset-slate-900'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                      }`}
                      title={`單元 ${idx + 1}: ${lesson.title}`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 展開側欄按鈕 */}
            <button
              type="button"
              onClick={onToggleExpand}
              className="p-2 text-slate-500 hover:text-slate-300 rounded-lg hover:bg-slate-800 transition-colors"
              title="展開目錄"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* 2. 小螢幕模式 (Mobile / Tablet < lg) 彈出抽屜 Drawer */}
      {/* ------------------------------------------------------------- */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* 背景遮罩 */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={onCloseMobileDrawer}
          />

          {/* 側欄抽屜本體 */}
          <div className="relative w-80 max-w-[85vw] h-full bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col z-10 animate-scaleIn">
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
                onClick={onCloseMobileDrawer}
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

            {/* 搜尋欄 */}
            <div className="p-2.5 border-b border-slate-800 bg-slate-950/30">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜尋單元名稱或關鍵字..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-hidden focus:border-sky-500 transition-colors"
                />
              </div>
            </div>

            {/* 課程列表 */}
            {renderLessonList(onCloseMobileDrawer)}

            <div className="p-3 border-t border-slate-800 bg-slate-950/50 text-[11px] text-slate-400 text-center">
              點擊任一單元即可快速跳轉教學
            </div>
          </div>
        </div>
      )}
    </>
  );
};
