import React, { useState } from 'react';
import { Sparkles, AlertTriangle, Lightbulb, Check, X, Code2, Zap, Trophy, HelpCircle, Eye, Palette, Sliders } from 'lucide-react';
import { Lesson } from '../types';
import { ConceptDiagram } from './ConceptDiagram';
import { LearnLayoutLab, LabExperimentType } from './LearnLayoutLab';
import { highlightCode } from '../utils/codeHighlighter';

interface InteractiveConceptCardProps {
  lesson: Lesson;
  onApplyQuickCss?: (css: string) => void;
  className?: string;
  defaultExpanded?: boolean;
}

const getExperimentForLesson = (lessonId: string): LabExperimentType => {
  switch (lessonId) {
    case 'css-box-model-deep':
      return 'box-sizing';
    case 'css-display-modes':
      return 'display';
    case 'css-positioning-master':
      return 'position';
    case 'css-flexbox-superhero':
    case 'css-grid-layout':
      return 'flexbox';
    case 'css-responsive-media-queries':
      return 'max-width';
    default:
      return 'display';
  }
};

export const InteractiveConceptCard: React.FC<InteractiveConceptCardProps> = ({
  lesson,
  onApplyQuickCss,
  className = '',
  defaultExpanded = true,
}) => {
  const [activeTab, setActiveTab] = useState<'diagram' | 'metaphor' | 'badVsGood' | 'keyPoints' | 'syntax' | 'lab'>('diagram');
  const [badVsGoodMode, setBadVsGoodMode] = useState<'bad' | 'good'>('bad');
  const [copiedCode, setCopiedCode] = useState(false);

  const { concept } = lesson;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      {/* 頂部標題列與切換標籤 */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
            {concept.metaphor?.icon || '💡'}
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>本課重點趣味解析</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-normal border border-sky-500/30 hidden sm:inline">
                金手獎特訓講義
              </span>
            </h3>
          </div>
        </div>

        {/* 頁籤切換（響應式平鋪換行，無須左右滑動） */}
        <div className="flex flex-wrap items-center bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('diagram')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'diagram'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎨 視覺圖解</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('metaphor')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'metaphor'
                ? 'bg-sky-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🎭 生動比喻</span>
          </button>

          {concept.badVsGood && (
            <button
              type="button"
              onClick={() => setActiveTab('badVsGood')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'badVsGood'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>⚔️ 翻車 vs 大師</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('keyPoints')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'keyPoints'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>📌 核心要點</span>
          </button>

          {concept.syntaxTable && concept.syntaxTable.length > 0 && (
            <button
              type="button"
              onClick={() => setActiveTab('syntax')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'syntax'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>📋 語法庫</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setActiveTab('lab')}
            className={`px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'lab'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-amber-400 hover:text-amber-200 hover:bg-amber-400/10'
            }`}
          >
            <span>📐 排版實驗室</span>
          </button>
        </div>
      </div>

      {/* 選手秒殺口訣橫幅 (Catchy Mnemonic) */}
      {concept.mnemonic && (
        <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/15 border-b border-amber-500/20 px-4 py-2.5 flex items-center gap-2 text-xs">
          <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
          <div className="flex-1 text-amber-200 font-medium">
            <span className="text-amber-400 font-bold mr-1.5">【金手口訣】</span>
            {concept.mnemonic}
          </div>
        </div>
      )}

      {/* 主要內容展示區 */}
      <div className="p-4 sm:p-5">
        {/* 0. 視覺畫圖解釋分頁 */}
        {activeTab === 'diagram' && (
          <div className="space-y-4 animate-fadeIn">
            <ConceptDiagram lessonId={lesson.id} />
          </div>
        )}

        {/* 1. 生動趣味生活比喻分頁 */}
        {activeTab === 'metaphor' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-indigo-950/40 border border-sky-500/20 rounded-xl p-4 sm:p-5 relative overflow-hidden">
              <div className="absolute top-2 right-3 text-4xl opacity-20 pointer-events-none select-none">
                {concept.metaphor.icon}
              </div>

              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{concept.metaphor.icon}</span>
                  <h4 className="text-base font-bold text-sky-300">
                    {concept.metaphor.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('diagram')}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-cyan-950/60 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-500/30 transition-colors flex items-center gap-1"
                >
                  <Palette className="w-3 h-3 text-cyan-400" />
                  <span>查看對應架構圖解 ➔</span>
                </button>
              </div>

              <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-line font-normal">
                {concept.metaphor.story}
              </p>
            </div>

            {/* 本課一句話精華總結 */}
            <div className="p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                <span className="font-semibold text-sky-300">一句話懂核心：</span>
                {concept.summary}
              </div>
            </div>

            {/* 互動實驗快捷鍵 (若有 quickToggles) */}
            {concept.quickToggles && concept.quickToggles.length > 0 && onApplyQuickCss && (
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>課堂即時實驗按鈕（點擊體驗不同風格變化）：</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {concept.quickToggles.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onApplyQuickCss(item.overrideCss)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-sky-500/20 border border-slate-700 hover:border-sky-500/40 text-xs text-sky-300 transition-all font-medium flex items-center gap-1.5"
                      title={item.desc}
                    >
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. 新手翻車現場 vs 金手大師優雅寫法 PK 賽 */}
        {activeTab === 'badVsGood' && concept.badVsGood && (
          <div className="space-y-4 animate-fadeIn">
            {/* PK 切換鈕 */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setBadVsGoodMode('bad')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  badVsGoodMode === 'bad'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <X className="w-4 h-4 text-rose-400" />
                <span>❌ 新手常犯翻車寫法</span>
              </button>

              <button
                type="button"
                onClick={() => setBadVsGoodMode('good')}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  badVsGoodMode === 'good'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Check className="w-4 h-4 text-emerald-400" />
                <span>✅ 金手大師優雅寫法</span>
              </button>
            </div>

            {/* 程式碼與說明區塊 */}
            {badVsGoodMode === 'bad' ? (
              <div className="space-y-3 bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-rose-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    典型扣分地雷
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(concept.badVsGood!.badCode)}
                    className="text-slate-400 hover:text-white text-[11px] underline"
                  >
                    {copiedCode ? '已複製' : '複製代碼'}
                  </button>
                </div>

                <pre 
                  className="vscode-highlight bg-[#1e1e1e] p-3 rounded-lg font-mono text-xs border border-rose-900/50 whitespace-pre overflow-x-auto leading-relaxed shadow-inner"
                  dangerouslySetInnerHTML={{ __html: highlightCode(concept.badVsGood.badCode, 'css') }}
                />

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-rose-400 font-bold">為什麼會翻車？</span>
                  <p className="mt-1 text-slate-300">{concept.badVsGood.badReason}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4">
                <div className="flex items-center justify-between text-xs text-emerald-300 font-semibold">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    高分標竿實務解法
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(concept.badVsGood!.goodCode)}
                    className="text-slate-400 hover:text-white text-[11px] underline"
                  >
                    {copiedCode ? '已複製' : '複製代碼'}
                  </button>
                </div>

                <pre 
                  className="vscode-highlight bg-[#1e1e1e] p-3 rounded-lg font-mono text-xs border border-emerald-900/50 whitespace-pre overflow-x-auto leading-relaxed shadow-inner"
                  dangerouslySetInnerHTML={{ __html: highlightCode(concept.badVsGood.goodCode, 'css') }}
                />

                <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold">為什麼這樣寫能得滿分？</span>
                  <p className="mt-1 text-slate-300">{concept.badVsGood.goodReason}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. 核心要點清單分頁 */}
        {activeTab === 'keyPoints' && (
          <div className="space-y-3 animate-fadeIn">
            <ul className="space-y-2.5">
              {concept.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center shrink-0 text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            {/* 常見地雷預警 */}
            {concept.commonPitfalls && concept.commonPitfalls.length > 0 && (
              <div className="p-3 bg-rose-950/30 border border-rose-500/20 rounded-xl text-xs text-rose-200/90 space-y-1">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>考場防呆避坑雷達：</span>
                </div>
                {concept.commonPitfalls.map((pitfall, i) => (
                  <p key={i} className="text-slate-300 pl-5 leading-relaxed">
                    • {pitfall}
                  </p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 4. 語法速查庫分頁 */}
        {activeTab === 'syntax' && concept.syntaxTable && (
          <div className="space-y-2 animate-fadeIn">
            <div className="divide-y divide-slate-800/80 bg-slate-950/60 border border-slate-800 rounded-xl overflow-hidden">
              {concept.syntaxTable.map((item, idx) => (
                <div key={idx} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:bg-slate-900/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-sky-400" />
                    <span className="font-mono text-sky-300 font-semibold text-xs">
                      {item.property}
                    </span>
                    {item.values !== '-' && (
                      <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                        {item.values}
                      </span>
                    )}
                  </div>
                  <span className="text-slate-300 text-xs pl-5 sm:pl-0">
                    {item.explanation}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. LearnLayout 排版互動實驗室分頁 */}
        {activeTab === 'lab' && (
          <div className="space-y-4 animate-fadeIn">
            <LearnLayoutLab
              initialExperiment={getExperimentForLesson(lesson.id)}
              isModal={false}
            />
          </div>
        )}
      </div>

      {/* 底部教練金牌提醒 */}
      <div className="px-4 py-3 bg-amber-950/20 border-t border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-400 mr-1">國手教練叮嚀：</span>
          {concept.championTip}
        </div>
      </div>
    </div>
  );
};
