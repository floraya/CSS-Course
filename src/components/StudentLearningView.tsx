import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  HelpCircle, 
  Award, 
  Eye, 
  ChevronRight,
  BookOpen,
  Code2,
  Sparkles,
  Maximize2,
  AlertCircle
} from 'lucide-react';
import { Lesson, UserProgress } from '../types';
import { validateChallenge, CheckResult } from '../utils/codeValidator';
import { VsCodeEditor } from './VsCodeEditor';
import { InteractiveConceptCard } from './InteractiveConceptCard';
import { FullPagePreviewModal } from './FullPagePreviewModal';

interface StudentLearningViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onSaveProgress: (lessonId: string, customCss: string, passed: boolean) => void;
  onUpdateDraftCss?: (lessonId: string, customCss: string) => void;
  onNextLesson?: () => void;
  onSwitchToTeacher: () => void;
  currentIndex: number;
  totalLessons: number;
}

export const StudentLearningView: React.FC<StudentLearningViewProps> = ({
  lesson,
  progress,
  onSaveProgress,
  onUpdateDraftCss,
  onNextLesson,
  onSwitchToTeacher,
  currentIndex,
  totalLessons,
}) => {
  // 學生學習時：未寫過的新單元預設為空白；有自填草稿或已通關才載入
  const isCompleted = progress.completedLessonIds.includes(lesson.id);
  const rawSaved = progress.savedCustomCss[lesson.id];
  const isStarterOrTeacherLeak = !isCompleted && (
    rawSaved === lesson.challenge.starterCss ||
    rawSaved === lesson.teacherCode.css
  );
  const initialCss = (rawSaved !== undefined && !isStarterOrTeacherLeak) ? rawSaved : '';
  const [cssCode, setCssCode] = useState<string>(initialCss);
  const [activeTab, setActiveTab] = useState<'css' | 'html'>('css');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showConcept, setShowConcept] = useState<boolean>(false);
  const [emptyWarning, setEmptyWarning] = useState<boolean>(false);
  const [checkResults, setCheckResults] = useState<CheckResult[]>([]);
  const [hasValidated, setHasValidated] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean>(
    progress.completedLessonIds.includes(lesson.id)
  );
  const [isFullPageOpen, setIsFullPageOpen] = useState<boolean>(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 切換單元時：如果是新單元，預設清空讓學生填寫；若有已存檔的自填程式碼則載入
  useEffect(() => {
    const rawLoaded = progress.savedCustomCss[lesson.id];
    const isUnitCompleted = progress.completedLessonIds.includes(lesson.id);
    const isLeak = !isUnitCompleted && (
      rawLoaded === lesson.challenge.starterCss ||
      rawLoaded === lesson.teacherCode.css
    );
    const loadedCss = (rawLoaded !== undefined && !isLeak) ? rawLoaded : '';
    setCssCode(loadedCss);
    setHasValidated(false);

    // 檢查是否有實質程式碼（排除空白與註解）
    const clean = loadedCss.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    const actuallyPassed = clean.length > 0 && isUnitCompleted;
    setIsPassed(actuallyPassed);

    // 若根本沒寫程式碼，卻在 completedLessonIds 內，及時校正清除
    if (!actuallyPassed && isUnitCompleted) {
      onSaveProgress(lesson.id, loadedCss, false);
    }

    setCheckResults([]);
    setShowHint(false);
    setShowAnswer(false);
    setEmptyWarning(false);
    setActiveTab('css');
  }, [lesson.id]);

  const handleValidate = () => {
    const codeWithoutComments = cssCode.replace(/\/\*[\s\S]*?\*\//g, '').trim();

    // 如果學生完全沒寫 CSS，嚴格判定不通過並提出提醒
    if (!codeWithoutComments) {
      setEmptyWarning(true);
      const results = validateChallenge(lesson.challenge.checks, '', null);
      setCheckResults(results);
      setHasValidated(true);
      setIsPassed(false);
      onSaveProgress(lesson.id, cssCode, false);
      return;
    }

    setEmptyWarning(false);
    const iframeDoc = iframeRef.current?.contentDocument || null;
    const results = validateChallenge(lesson.challenge.checks, cssCode, iframeDoc);
    setCheckResults(results);
    setHasValidated(true);

    const allGood = results.every((r) => r.passed);
    setIsPassed(allGood);

    if (allGood) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
      onSaveProgress(lesson.id, cssCode, true);
    } else {
      onSaveProgress(lesson.id, cssCode, false);
    }
  };

  const handleResetToBlank = () => {
    if (window.confirm('確定要清空程式碼，重新自己填寫嗎？')) {
      setCssCode('');
      setHasValidated(false);
      setCheckResults([]);
      setIsPassed(false);
      setEmptyWarning(false);
      onSaveProgress(lesson.id, '', false);
    }
  };

  const handleApplyAnswer = () => {
    setCssCode(lesson.challenge.solutionCss);
    setShowAnswer(false);
    setHasValidated(false);
    setEmptyWarning(false);
    onUpdateDraftCss?.(lesson.id, lesson.challenge.solutionCss);
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
          ${cssCode}
        </style>
      </head>
      <body>
        ${lesson.challenge.starterHtml}
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-5">
      {/* 頂部任務說明卡 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-sky-400 font-semibold mb-0.5">
              <span>單元 {currentIndex + 1} / {totalLessons} 學生練習</span>
              <span>•</span>
              <span>{lesson.title}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              {lesson.challenge.title}
              {isPassed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  已完成
                </span>
              )}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConcept(!showConcept)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/40 hover:bg-sky-900/50 border border-sky-500/30 text-sky-300 text-xs font-medium transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>{showConcept ? '收合比喻與口訣' : '💡 生動重點與比喻'}</span>
            </button>

            <button
              onClick={onSwitchToTeacher}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5 text-sky-400" />
              <span>看老師講解</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/40 hover:bg-amber-900/50 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? '收合提示' : '提示錦囊'}</span>
            </button>

            <button
              onClick={() => setShowAnswer(true)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1.5 underline"
            >
              參考解答
            </button>
          </div>
        </div>

        {/* 展開生動生活比喻與金手口訣卡 */}
        {showConcept && (
          <div className="pt-2 animate-fadeIn">
            <InteractiveConceptCard lesson={lesson} />
          </div>
        )}

        {/* 提示內容 */}
        {showHint && (
          <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200">
            <div className="font-semibold text-amber-400 mb-1">💡 提示錦囊：</div>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
              {lesson.challenge.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {/* 清楚條列的實作步驟 */}
        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-semibold text-slate-400 mb-1.5">實作任務要求：</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
            {lesson.challenge.instructions.map((inst, idx) => (
              <div
                key={idx}
                className="bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-slate-300 flex items-start gap-2"
              >
                <span className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-snug">{inst}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 雙欄：左邊空白自行撰寫，右邊即時看成果 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左欄：純淨編輯器 (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeTab === 'css'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS 程式碼 (由你自由填寫)
                </button>
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeTab === 'html'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML 結構參考
                </button>
              </div>

              <button
                onClick={handleResetToBlank}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 px-2 py-1 rounded hover:bg-slate-800"
                title="清空重新填寫"
              >
                <RotateCcw className="w-3 h-3" />
                <span>清空重寫</span>
              </button>
            </div>

            <div className="p-2 bg-slate-950">
              {activeTab === 'css' ? (
                <VsCodeEditor
                  value={cssCode}
                  onChange={(val) => {
                    setCssCode(val);
                    setHasValidated(false);
                    if (emptyWarning) setEmptyWarning(false);
                    onUpdateDraftCss?.(lesson.id, val);
                    const clean = val.replace(/\/\*[\s\S]*?\*\//g, '').trim();
                    if (!clean && isPassed) {
                      setIsPassed(false);
                      onSaveProgress(lesson.id, val, false);
                    }
                  }}
                  placeholder={`/* 支援 VS Code 快捷體驗：
   1. 輸入 "{" 自動補全 "}"
   2. 在括號內按 Enter 自動換行縮排
   3. 按 Tab 鍵可縮排 2 格空白 */\n`}
                  height="340px"
                />
              ) : (
                <VsCodeEditor
                  value={lesson.challenge.starterHtml}
                  language="html"
                  readOnly={true}
                  height="340px"
                />
              )}
            </div>
          </div>

          {/* 成果檢查項目 */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300">
                驗收項目 ({lesson.challenge.checks.length} 項)
              </span>

              <button
                onClick={handleValidate}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>檢查成果</span>
              </button>
            </div>

            {/* 空白未寫提示警告條 */}
            {emptyWarning && (
              <div className="p-3 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2.5 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span className="font-medium">⚠️ 尚未編寫任何 CSS 程式碼！請先在上方編輯器填寫 CSS 樣式後再按檢查。</span>
              </div>
            )}

            {/* 檢查條列 */}
            <div className="space-y-1.5">
              {lesson.challenge.checks.map((check) => {
                const res = checkResults.find((r) => r.checkId === check.id);
                const hasResult = hasValidated && res !== undefined;
                const pass = res?.passed ?? false;

                return (
                  <div
                    key={check.id}
                    className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
                      hasResult && !pass
                        ? 'bg-rose-950/20 text-rose-200 border border-rose-800/40'
                        : hasResult && pass
                        ? 'bg-emerald-950/20 text-emerald-200 border border-emerald-800/40'
                        : 'bg-slate-950 text-slate-400'
                    }`}
                  >
                    {hasResult && pass ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : hasResult && !pass ? (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                        •
                      </div>
                    )}
                    <span>{res?.message || check.description}</span>
                  </div>
                );
              })}
            </div>

            {/* 通關獎勵與前進下一課：必須真的通過且有實質 CSS 程式碼才顯示 */}
            {isPassed && cssCode.replace(/\/\*[\s\S]*?\*\//g, '').trim().length > 0 && (
              <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>
                    {onNextLesson
                      ? '恭喜！本單元全數通過！'
                      : '🎓 恭喜榮譽畢業！你已成功通關全套 CSS 特訓與終極一頁式網站考題！'}
                  </span>
                </div>
                {onNextLesson ? (
                  <button
                    onClick={onNextLesson}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow transition-all"
                  >
                    <span>下一單元</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    <span>🏆 金手獎特訓最高段認證</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 右欄：即時畫布 (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 text-sky-400">
                <Eye className="w-3.5 h-3.5" />
                <span>你的成果即時預覽</span>
              </div>
              <div className="flex items-center gap-2">
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

            <div className="p-4 bg-slate-950 flex flex-col items-center justify-center min-h-[460px]">
              <div className="w-full h-[460px] bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
                <iframe
                  ref={iframeRef}
                  title="Student Preview"
                  srcDoc={previewDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>

              {lesson.id === 'css-capstone-landing-page' && (
                <div className="w-full mt-3 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>一頁式網站推薦點擊「展開看整體頁面」，即時檢視電腦/平板/手機多寬度效果！</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsFullPageOpen(true)}
                    className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition-all shrink-0 ml-2"
                  >
                    展開看整體頁面
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 展開看整體頁面專用視窗 (學生成果全螢幕 + RWD 多裝置檢視 + HTML/CSS 切換 Tab) */}
      <FullPagePreviewModal
        isOpen={isFullPageOpen}
        onClose={() => setIsFullPageOpen(false)}
        title={`學生實作成果：${lesson.title}`}
        subtitle="即時聯動你填寫的 CSS，支援 1200px 電腦版、768px 平板斷點、390px 手機版、HTML 與 CSS 代碼檢視對照"
        srcDoc={previewDoc}
        htmlCode={lesson.challenge.starterHtml}
        cssCode={cssCode}
        badgeText="學生成果即時連線"
      />

      {/* 參考解答彈窗 */}
      {showAnswer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>老師參考解答</span>
              </h3>
              <button
                onClick={() => setShowAnswer(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                關閉
              </button>
            </div>

            <p className="text-xs text-slate-300">
              寫法可參考老師的標準答案：
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 max-h-60 overflow-y-auto font-mono text-xs text-sky-300 whitespace-pre">
              {lesson.challenge.solutionCss}
            </div>

            <div className="flex justify-end gap-2 text-xs">
              <button
                onClick={() => setShowAnswer(false)}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                關閉
              </button>
              <button
                onClick={handleApplyAnswer}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
              >
                套用此解答
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
