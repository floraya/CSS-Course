import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Award, 
  AlertTriangle, 
  Sparkles, 
  Code, 
  Play, 
  ArrowRight, 
  Sliders, 
  Check, 
  Copy 
} from 'lucide-react';
import { Lesson } from '../types';

interface LectureViewProps {
  lesson: Lesson;
  onGoToPractice: () => void;
}

export const LectureView: React.FC<LectureViewProps> = ({
  lesson,
  onGoToPractice,
}) => {
  // Visual experimenter state for interactive sliders/pickers
  const initialVisuals: Record<string, string> = {};
  if (lesson.visualControls) {
    lesson.visualControls.forEach((c) => {
      initialVisuals[c.property] = c.defaultValue;
    });
  }
  const [visualValues, setVisualValues] = useState<Record<string, string>>(initialVisuals);
  const [activeCodeTab, setActiveCodeTab] = useState<'css' | 'html'>('css');
  const [copied, setCopied] = useState(false);

  const handleVisualChange = (property: string, value: string) => {
    setVisualValues((prev) => ({ ...prev, [property]: value }));
  };

  // Build combined live CSS with visual overrides
  let activeCss = lesson.teacherCode.css;
  if (lesson.visualControls && lesson.defaultVisualElementSelector) {
    const overrideRules = Object.entries(visualValues)
      .map(([prop, val]) => `${prop}: ${val} !important;`)
      .join(' ');
    activeCss += `\n/* 學生即時視覺調整 */\n${lesson.defaultVisualElementSelector} { ${overrideRules} }`;
  }

  const handleCopyCode = () => {
    const textToCopy = activeCodeTab === 'css' ? lesson.teacherCode.css : lesson.teacherCode.html;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewSrcDoc = `
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
          ${activeCss}
        </style>
      </head>
      <body>
        ${lesson.teacherCode.html}
      </body>
    </html>
  `;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Lesson Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30">
                {lesson.categoryName}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                難易度：{lesson.difficulty}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-400">
              {lesson.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {lesson.fooishReferenceUrl && (
              <a
                href={lesson.fooishReferenceUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-xl border border-slate-700 transition-colors"
              >
                <span>Fooish 手冊原典</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onGoToPractice}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-sky-500/20 transition-all transform hover:scale-[1.02]"
            >
              <span>換我動手寫一次</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Theory & Tips / Right Visual Demo & Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Theory, Champion Tip & Pitfalls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Concept Overview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>觀念深度解析</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {lesson.concept.summary}
            </p>

            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                核心學習重點
              </h4>
              <ul className="space-y-2">
                {lesson.concept.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-normal">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Syntax Lookup Table */}
          {lesson.concept.syntaxTable && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4 text-sky-400" />
                <span>Fooish 常用語法與屬性對照表</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/70 text-slate-400 font-semibold border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-3">屬性名稱 (Property)</th>
                      <th className="py-2.5 px-3">常見接受值</th>
                      <th className="py-2.5 px-3">語法解說</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {lesson.concept.syntaxTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30">
                        <td className="py-2.5 px-3 font-semibold text-sky-300">{row.property}</td>
                        <td className="py-2.5 px-3 text-amber-300/90">{row.values}</td>
                        <td className="py-2.5 px-3 font-sans text-slate-400">{row.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Champion's Secret Tip */}
          <div className="bg-gradient-to-br from-amber-950/40 via-slate-900 to-amber-950/20 border border-amber-500/40 rounded-2xl p-6 space-y-2 relative overflow-hidden">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Award className="w-5 h-5 text-amber-400" />
              <span>金手獎選手備戰心法</span>
            </div>
            <p className="text-amber-100/90 text-sm leading-relaxed whitespace-pre-line font-medium">
              {lesson.concept.championTip}
            </p>
          </div>

          {/* Common Pitfalls */}
          <div className="bg-slate-900 border border-red-900/30 rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              <span>新手最常踩的地雷警示</span>
            </div>
            <ul className="space-y-2">
              {lesson.concept.commonPitfalls.map((pitfall, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{pitfall}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Interactive Visual Adjuster & Live Teacher Demo (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Visual Interactive Sliders (if lesson provides visual controls) */}
          {lesson.visualControls && lesson.visualControls.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <Sliders className="w-4 h-4" />
                  <span>即時視覺調節盤 (動手拖拉看變化)</span>
                </div>
                <button
                  onClick={() => {
                    const reset: Record<string, string> = {};
                    lesson.visualControls?.forEach((c) => (reset[c.property] = c.defaultValue));
                    setVisualValues(reset);
                  }}
                  className="text-[11px] text-slate-400 hover:text-white underline"
                >
                  重設數值
                </button>
              </div>

              <div className="space-y-3.5">
                {lesson.visualControls.map((ctrl) => (
                  <div key={ctrl.property} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{ctrl.label}</span>
                      <span className="font-mono text-sky-400">
                        {visualValues[ctrl.property] || ctrl.defaultValue}
                      </span>
                    </div>

                    {ctrl.type === 'range' && (
                      <input
                        type="range"
                        min={ctrl.min ?? 0}
                        max={ctrl.max ?? 100}
                        step={ctrl.step ?? 1}
                        value={parseFloat(visualValues[ctrl.property] || ctrl.defaultValue)}
                        onChange={(e) =>
                          handleVisualChange(
                            ctrl.property,
                            `${e.target.value}${ctrl.unit || ''}`
                          )
                        }
                        className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                      />
                    )}

                    {ctrl.type === 'select' && ctrl.options && (
                      <select
                        value={visualValues[ctrl.property] || ctrl.defaultValue}
                        onChange={(e) => handleVisualChange(ctrl.property, e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
                      >
                        {ctrl.options.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {ctrl.type === 'color' && (
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={visualValues[ctrl.property] || ctrl.defaultValue}
                          onChange={(e) => handleVisualChange(ctrl.property, e.target.value)}
                          className="w-10 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                        />
                        <span className="font-mono text-xs text-slate-400">
                          {visualValues[ctrl.property] || ctrl.defaultValue}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Teacher's Live Preview Sandbox */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md">
            <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>老師示範成果預覽</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Live Sandbox</span>
            </div>

            <div className="p-3 bg-slate-950">
              <div className="w-full h-64 sm:h-72 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
                <iframe
                  title="Teacher Example Live Preview"
                  srcDoc={previewSrcDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 border-t border-slate-800 text-xs text-slate-400">
              💡 {lesson.teacherCode.explanation}
            </div>
          </div>

          {/* Teacher's Source Code Tabs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-950 border-b border-slate-800">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveCodeTab('css')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeCodeTab === 'css'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  CSS 範例
                </button>
                <button
                  onClick={() => setActiveCodeTab('html')}
                  className={`px-3 py-1 rounded text-xs font-semibold ${
                    activeCodeTab === 'html'
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  HTML 骨架
                </button>
              </div>

              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white py-1 px-2 rounded hover:bg-slate-800 transition-colors"
                title="複製此範例程式碼"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '已複製' : '複製代碼'}</span>
              </button>
            </div>

            <div className="p-4 bg-slate-950/80 max-h-64 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre">
              {activeCodeTab === 'css' ? lesson.teacherCode.css : lesson.teacherCode.html}
            </div>
          </div>

          {/* Large Action Card: Switch to practice */}
          <div className="bg-gradient-to-r from-sky-950/40 via-blue-900/30 to-sky-950/40 border border-sky-500/30 rounded-2xl p-5 text-center space-y-3">
            <Sparkles className="w-6 h-6 text-sky-400 mx-auto" />
            <h3 className="text-base font-bold text-white">
              準備好大顯身手了嗎？
            </h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              立即切換到動手練習模式，親自完成實作挑戰，系統將即時自動批改你的 CSS！
            </p>
            <button
              onClick={onGoToPractice}
              className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all"
            >
              進入學生實作任務 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
