import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Copy, Check, RotateCcw, Maximize2, Sparkles } from 'lucide-react';
import { Lesson } from '../types';
import { InteractiveConceptCard } from './InteractiveConceptCard';
import { FullPagePreviewModal } from './FullPagePreviewModal';

interface TeacherTeachingViewProps {
  lesson: Lesson;
  onSwitchToStudent: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
  currentIndex: number;
  totalLessons: number;
}

export const TeacherTeachingView: React.FC<TeacherTeachingViewProps> = ({
  lesson,
  onSwitchToStudent,
  onNextLesson,
  onPrevLesson,
  currentIndex,
  totalLessons,
}) => {
  const [codeTab, setCodeTab] = useState<'css' | 'html'>('css');
  const [copied, setCopied] = useState(false);
  const [customTeacherCss, setCustomTeacherCss] = useState<string | null>(null);
  const [isFullPageOpen, setIsFullPageOpen] = useState(false);

  // Reset custom style when lesson changes
  useEffect(() => {
    setCustomTeacherCss(null);
  }, [lesson.id]);

  const activeCss = customTeacherCss !== null ? customTeacherCss : lesson.teacherCode.css;

  const handleCopy = () => {
    const text = codeTab === 'css' ? activeCss : lesson.teacherCode.html;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCapstone = lesson.id === 'css-capstone-landing-page';

  const previewDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; }
          html {
            scroll-behavior: smooth;
          }
          body {
            margin: 0;
            padding: ${isCapstone ? '0' : '24px'};
            background-color: #0b0f19;
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            min-height: 100vh;
            ${isCapstone ? 'display: block;' : 'display: flex; align-items: center; justify-content: center;'}
          }
          ${activeCss}
        </style>
      </head>
      <body>
        ${lesson.teacherCode.html}
        <script>
          document.addEventListener('click', function(e) {
            var anchor = e.target.closest('a[href^="#"]');
            if (!anchor) return;
            var href = anchor.getAttribute('href');
            if (href && href.length > 1) {
              var target = document.querySelector(href);
              if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }
          });
        </script>
      </body>
    </html>
  `;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* 頂部單元標題與換頁 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-1">
            <span>單元 {currentIndex + 1} / {totalLessons}</span>
            <span>•</span>
            <span>{lesson.categoryName}</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            {lesson.title}
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {lesson.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onPrevLesson && (
            <button
              onClick={onPrevLesson}
              disabled={currentIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs text-slate-200 transition-colors"
            >
              ← 上一課
            </button>
          )}

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              disabled={currentIndex === totalLessons - 1}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-xs text-slate-200 transition-colors"
            >
              下一課 →
            </button>
          )}

          <button
            onClick={onSwitchToStudent}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-md shadow-sky-500/20 transition-all ml-2"
          >
            <span>讓學生動手做</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 雙欄主教學區 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左欄：生動趣味解析卡片（比喻、PK 賽、金手口訣、語法）(6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <InteractiveConceptCard
            lesson={lesson}
            onApplyQuickCss={(css) => setCustomTeacherCss(css)}
          />
        </div>

        {/* 右欄：老師示範程式碼 + 即時大預覽 (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* 即時預覽畫面 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {customTeacherCss !== null ? '✨ 課堂即時實驗效果' : '老師示範即時成果'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {customTeacherCss !== null && (
                  <button
                    type="button"
                    onClick={() => setCustomTeacherCss(null)}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>還原示範</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsFullPageOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-sky-400 hover:text-white bg-sky-950/60 hover:bg-sky-900/80 px-2.5 py-1 rounded-lg border border-sky-500/40 transition-all font-semibold shadow-xs"
                  title="展開檢視整體頁面與 RWD 效果"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>展開看整體頁面</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-950">
              <div className={`w-full ${lesson.id === 'css-capstone-landing-page' ? 'h-80' : 'h-64'} bg-slate-950 rounded-lg overflow-hidden border border-slate-800/80 transition-all`}>
                <iframe
                  title="Teacher Preview"
                  srcDoc={previewDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>

              {lesson.id === 'css-capstone-landing-page' && (
                <div className="mt-2.5 flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-lg p-2.5 text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>本畢業專題是一頁式完整形象官網，強烈推薦展開以整體全頁與各裝置斷點檢視！</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFullPageOpen(true)}
                    className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all shrink-0 ml-2"
                  >
                    展開看整體頁面
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 老師示範程式碼 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setCodeTab('css')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    codeTab === 'css'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS 樣式
                </button>
                <button
                  onClick={() => setCodeTab('html')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    codeTab === 'html'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML 骨架
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? '已複製' : '複製代碼'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950/80 max-h-56 overflow-y-auto font-mono text-xs text-slate-200 whitespace-pre leading-relaxed">
              {codeTab === 'css' ? lesson.teacherCode.css : lesson.teacherCode.html}
            </div>
          </div>

          {/* 底部快速切換按鈕 */}
          <button
            onClick={onSwitchToStudent}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2"
          >
            <span>切換至學生學習頁面，讓學生自己動手操作</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 展開看整體頁面專用視窗 (全螢幕 + RWD 測試 + HTML/CSS 切換 Tab) */}
      <FullPagePreviewModal
        isOpen={isFullPageOpen}
        onClose={() => setIsFullPageOpen(false)}
        title={`老師示範成果：${lesson.title}`}
        subtitle="支援 1200px 電腦版、768px 平板斷點、390px 手機版、HTML 與 CSS 代碼檢視對照"
        srcDoc={previewDoc}
        htmlCode={lesson.teacherCode.html}
        cssCode={activeCss}
        badgeText="老師示範"
      />
    </div>
  );
};
