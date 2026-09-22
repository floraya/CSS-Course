import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RotateCcw, 
  Play, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Eye, 
  Layers, 
  ChevronRight, 
  Sparkles, 
  Award, 
  BookOpen, 
  Maximize2, 
  Minimize2,
  Code2
} from 'lucide-react';
import { Lesson, UserProgress } from '../types';
import { validateChallenge, CheckResult } from '../utils/codeValidator';
import { BoxModelInspector } from './BoxModelInspector';

interface PracticeViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onSaveProgress: (lessonId: string, css: string, passed: boolean) => void;
  onNextLesson: () => void;
  onGoToLecture: () => void;
}

export const PracticeView: React.FC<PracticeViewProps> = ({
  lesson,
  progress,
  onSaveProgress,
  onNextLesson,
  onGoToLecture,
}) => {
  // Load saved code if student already edited, else starterCss
  const savedCss = progress.savedCustomCss[lesson.id] || lesson.challenge.starterCss;
  const [cssCode, setCssCode] = useState<string>(savedCss);
  const [activeEditorTab, setActiveEditorTab] = useState<'css' | 'html'>('css');
  const [viewportSize, setViewportSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showBoxModelOutline, setShowBoxModelOutline] = useState<boolean>(false);
  const [showInspector, setShowInspector] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [showSolutionModal, setShowSolutionModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Validation results
  const [checkResults, setCheckResults] = useState<CheckResult[]>([]);
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [allPassed, setAllPassed] = useState<boolean>(
    progress.completedLessonIds.includes(lesson.id)
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Update editor when lesson changes
  useEffect(() => {
    const loaded = progress.savedCustomCss[lesson.id] || lesson.challenge.starterCss;
    setCssCode(loaded);
    setHasValidated(false);
    setAllPassed(progress.completedLessonIds.includes(lesson.id));
    setCheckResults([]);
  }, [lesson.id]);

  // Construct iframe document
  const outlineStyles = showBoxModelOutline
    ? `
      * { outline: 1px dashed rgba(56, 189, 248, 0.4) !important; }
      div, section, article, nav, header { background-clip: content-box !important; }
    `
    : '';

  const iframeSrcDoc = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 24px;
            background-color: #0b0f19;
            color: #f8fafc;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          ${cssCode}
          ${outlineStyles}
        </style>
      </head>
      <body>
        ${lesson.challenge.starterHtml}
      </body>
    </html>
  `;

  // Validation handler
  const handleCheckCode = () => {
    const iframeDoc = iframeRef.current?.contentDocument || null;
    const results = validateChallenge(lesson.challenge.checks, cssCode, iframeDoc);
    setCheckResults(results);
    setHasValidated(true);

    const isAllSuccessful = results.every((r) => r.passed);
    setAllPassed(isAllSuccessful);

    if (isAllSuccessful) {
      // Fire confetti animation
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#38bdf8', '#fbbf24', '#34d399', '#f43f5e'],
      });
      onSaveProgress(lesson.id, cssCode, true);
    } else {
      onSaveProgress(lesson.id, cssCode, false);
    }
  };

  const handleResetCode = () => {
    if (window.confirm('確定要將程式碼重設為題目初始範本嗎？')) {
      setCssCode(lesson.challenge.starterCss);
      setHasValidated(false);
    }
  };

  const handleApplySolution = () => {
    setCssCode(lesson.challenge.solutionCss);
    setShowSolutionModal(false);
    setHasValidated(false);
  };

  return (
    <div className={`max-w-7xl mx-auto p-4 sm:p-6 space-y-5 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto max-w-none' : ''}`}>
      {/* Top Banner: Mission & Acceptance Summary */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                {lesson.challenge.title}
                {allPassed && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <CheckCircle2 className="w-3 h-3" />
                    已通關
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-400">
                目標：{lesson.challenge.targetGoalDescription}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToLecture}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>回顧老師觀念</span>
            </button>

            <button
              onClick={() => setShowHints(!showHints)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHints ? '收合提示' : '選手提示錦囊'}</span>
            </button>

            <button
              onClick={() => setShowSolutionModal(true)}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 underline"
            >
              參考解答
            </button>
          </div>
        </div>

        {/* Hints Accordion */}
        {showHints && (
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-3.5 space-y-2 text-xs text-amber-200/90 animate-fadeIn">
            <div className="font-semibold flex items-center gap-1 text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>金手教練提示：</span>
            </div>
            <ul className="list-disc list-inside space-y-1 pl-1">
              {lesson.challenge.hints.map((hint, idx) => (
                <li key={idx} className="font-mono text-[11px] text-amber-100">
                  {hint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions Checklist */}
        <div className="pt-2 border-t border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {lesson.challenge.instructions.map((inst, index) => (
            <div
              key={index}
              className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-2.5 flex items-start gap-2 text-xs text-slate-300"
            >
              <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {index + 1}
              </span>
              <span className="leading-snug">{inst}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Editor & Live Preview 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Code Editor (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col">
            {/* Editor Toolbar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveEditorTab('css')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeEditorTab === 'css'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>CSS 編輯區</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                </button>
                <button
                  onClick={() => setActiveEditorTab('html')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeEditorTab === 'html'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>HTML 結構 (唯讀)</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetCode}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800 transition-colors"
                  title="恢復初始代碼"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>還原題目</span>
                </button>
              </div>
            </div>

            {/* Code Input Area */}
            <div className="relative bg-slate-950 font-mono text-xs text-slate-200 p-3 h-[420px] overflow-hidden flex flex-col">
              {activeEditorTab === 'css' ? (
                <textarea
                  value={cssCode}
                  onChange={(e) => {
                    setCssCode(e.target.value);
                    setHasValidated(false);
                  }}
                  spellCheck={false}
                  className="w-full flex-1 bg-transparent text-slate-200 resize-none font-mono text-xs leading-relaxed focus:outline-none focus:ring-0 border-0 p-2 selection:bg-sky-500/30"
                  placeholder="在此撰寫 CSS 樣式..."
                />
              ) : (
                <div className="w-full flex-1 overflow-y-auto p-2 text-slate-400 select-text whitespace-pre leading-relaxed text-xs">
                  {lesson.challenge.starterHtml}
                </div>
              )}

              {/* Status bar inside editor */}
              <div className="pt-2 border-t border-slate-900 flex justify-between items-center text-[10px] text-slate-500 font-mono">
                <span>CSS 3.0 • UTF-8</span>
                <span>行數：{cssCode.split('\n').length} 行</span>
              </div>
            </div>
          </div>

          {/* Validation Checks Results Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>題目驗收標準 ({lesson.challenge.checks.length} 項)</span>
              </h4>

              <button
                onClick={handleCheckCode}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all transform active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>檢查我的程式碼</span>
              </button>
            </div>

            <div className="space-y-2">
              {lesson.challenge.checks.map((check) => {
                const res = checkResults.find((r) => r.checkId === check.id);
                const isPassed = res ? res.passed : allPassed;

                return (
                  <div
                    key={check.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-xs transition-colors ${
                      hasValidated && !isPassed
                        ? 'bg-rose-950/20 border-rose-800/40 text-rose-200'
                        : isPassed
                        ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : hasValidated ? (
                        <XCircle className="w-4 h-4 text-rose-400" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500">
                          -
                        </div>
                      )}
                    </div>
                    <span className="leading-snug">{check.description}</span>
                  </div>
                );
              })}
            </div>

            {/* Success Celebration Bar */}
            {allPassed && (
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-teal-950/60 border border-emerald-500/40 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-emerald-300">
                      恭喜通過挑戰！獲得 +50 XP
                    </h5>
                    <p className="text-xs text-slate-300">
                      程式碼完全符合金手獎標準，掌握精準排版細節。
                    </p>
                  </div>
                </div>

                <button
                  onClick={onNextLesson}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  <span>下一單元</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Sandbox Preview & DevTools (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col">
            {/* Preview Toolbar */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-1 text-xs font-semibold text-slate-300">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>即時預覽畫布</span>
              </div>

              {/* Viewport switchers */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewportSize('desktop')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewportSize === 'desktop'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="電腦寬螢幕"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportSize('tablet')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewportSize === 'tablet'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="平板尺寸"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewportSize('mobile')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewportSize === 'mobile'
                      ? 'bg-sky-500 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="手機尺寸"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Auxiliary Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBoxModelOutline(!showBoxModelOutline)}
                  className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    showBoxModelOutline
                      ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="顯示輔助外框線"
                >
                  <Layers className="w-3 h-3" />
                  <span>輔助線</span>
                </button>

                <button
                  onClick={() => setShowInspector(!showInspector)}
                  className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                    showInspector
                      ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-semibold'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>盒模型儀</span>
                </button>

                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  title="全螢幕切換"
                >
                  {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Sandbox Canvas Container */}
            <div className="p-4 bg-slate-950 flex items-center justify-center min-h-[420px] overflow-hidden">
              <div
                className={`bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 ${
                  viewportSize === 'desktop'
                    ? 'w-full h-[420px]'
                    : viewportSize === 'tablet'
                    ? 'w-[480px] h-[420px]'
                    : 'w-[320px] h-[420px]'
                }`}
              >
                <iframe
                  ref={iframeRef}
                  title="Student Sandbox Preview"
                  srcDoc={iframeSrcDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>

          {/* Collapsible Box Model Diagram */}
          {showInspector && (
            <div className="animate-fadeIn">
              <BoxModelInspector />
            </div>
          )}
        </div>
      </div>

      {/* Solution Reference Modal */}
      {showSolutionModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl animate-scaleIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Award className="w-4 h-4" />
                <span>老師參考解答 (Solution Reference)</span>
              </div>
              <button
                onClick={() => setShowSolutionModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded"
              >
                關閉
              </button>
            </div>

            <p className="text-xs text-slate-300">
              遇到困難不要灰心！先仔細觀察老師的屬性寫法，理解背後的排版邏輯：
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 max-h-72 overflow-y-auto font-mono text-xs text-sky-300 whitespace-pre">
              {lesson.challenge.solutionCss}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSolutionModal(false)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                自行繼續嘗試
              </button>
              <button
                onClick={handleApplySolution}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                套用解答程式碼
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
