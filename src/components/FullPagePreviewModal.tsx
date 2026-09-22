import React, { useState, useEffect } from 'react';
import {
  X,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  RotateCcw,
  FileCode,
  Palette,
  Eye,
  Columns,
  Copy,
  Check,
  Code
} from 'lucide-react';

interface FullPagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  srcDoc: string;
  htmlCode?: string;
  cssCode?: string;
  badgeText?: string;
}

type ViewMode = 'preview' | 'html' | 'css' | 'split';
type ViewportMode = 'full' | 'desktop' | 'tablet' | 'mobile';

// 語法標色輕量化渲染
const highlightSyntax = (line: string, language: 'html' | 'css'): React.ReactNode => {
  if (!line) return <span>&nbsp;</span>;

  // HTML 註解
  if (language === 'html' && line.trim().startsWith('<!--')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }
  // CSS 註解
  if (language === 'css' && (line.trim().startsWith('/*') || line.trim().startsWith('*'))) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  if (language === 'html') {
    const parts = line.split(/(<[^>]+>)/g);
    return (
      <span>
        {parts.map((part, i) => {
          if (part.startsWith('<') && part.endsWith('>')) {
            return (
              <span key={i} className="text-rose-400 font-medium">
                {part.split(/("[^"]*")/g).map((sub, j) => {
                  if (sub.startsWith('"') && sub.endsWith('"')) {
                    return <span key={j} className="text-emerald-300 font-normal">{sub}</span>;
                  }
                  if (sub.includes('=')) {
                    const eqParts = sub.split('=');
                    return (
                      <span key={j}>
                        <span className="text-amber-300">{eqParts[0]}</span>
                        <span className="text-slate-400">=</span>
                        {eqParts.slice(1).join('=')}
                      </span>
                    );
                  }
                  return <span key={j}>{sub}</span>;
                })}
              </span>
            );
          }
          return <span key={i} className="text-slate-200">{part}</span>;
        })}
      </span>
    );
  } else {
    // CSS
    if (line.includes(':') && !line.trim().startsWith('@') && !line.includes('{')) {
      const colonIdx = line.indexOf(':');
      const prop = line.substring(0, colonIdx);
      const val = line.substring(colonIdx + 1);
      return (
        <span>
          <span className="text-sky-300 font-medium">{prop}</span>
          <span className="text-slate-400">:</span>
          <span className="text-emerald-300">{val}</span>
        </span>
      );
    }
    if (line.includes('{') || line.includes('}')) {
      return <span className="text-amber-300 font-semibold">{line}</span>;
    }
    if (line.trim().startsWith('@')) {
      return <span className="text-purple-400 font-bold">{line}</span>;
    }
    return <span className="text-slate-200">{line}</span>;
  }
};

// 獨立代碼檢視器組件（含行號與複製功能）
const CodeBlockView: React.FC<{
  code: string;
  language: 'html' | 'css';
  onSwitchTab?: (tab: 'html' | 'css') => void;
}> = ({ code, language, onSwitchTab }) => {
  const [copied, setCopied] = useState(false);
  const lines = (code || '').split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* 頂部標頭列 */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 mr-1">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
            {language === 'html' ? (
              <>
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>index.html (HTML 骨架)</span>
              </>
            ) : (
              <>
                <Palette className="w-3.5 h-3.5 text-sky-400" />
                <span>style.css (CSS 樣式表)</span>
              </>
            )}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
              language === 'html'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
            }`}
          >
            {language.toUpperCase()}
          </span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            共 {lines.length} 行代碼
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onSwitchTab && (
            <button
              type="button"
              onClick={() => onSwitchTab(language === 'html' ? 'css' : 'html')}
              className="text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1"
            >
              <span>切換看 {language === 'html' ? 'CSS 樣式' : 'HTML 結構'}</span>
              <span className="font-mono text-sky-400">→</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors text-xs font-semibold"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">已複製</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>複製代碼</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 帶行號之代碼內容區域 */}
      <div className="flex-1 overflow-auto p-3 sm:p-4 font-mono text-xs leading-relaxed select-text bg-slate-950">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50 transition-colors">
                <td className="w-10 sm:w-12 pr-4 text-right text-slate-600 select-none align-top font-mono text-[11px]">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre align-top font-mono">
                  {highlightSyntax(line, language)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const FullPagePreviewModal: React.FC<FullPagePreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  srcDoc,
  htmlCode = '',
  cssCode = '',
  badgeText = '整體頁面檢視'
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('full');
  const [splitCodeTab, setSplitCodeTab] = useState<'html' | 'css'>('css');
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // 監聽 ESC 鍵關閉
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getViewportWidthClass = () => {
    switch (viewportMode) {
      case 'desktop':
        return 'w-[1200px] max-w-full';
      case 'tablet':
        return 'w-[768px] max-w-full';
      case 'mobile':
        return 'w-[390px] max-w-full';
      case 'full':
      default:
        return 'w-full';
    }
  };

  const getViewportLabel = () => {
    switch (viewportMode) {
      case 'desktop':
        return '電腦版視窗 (1200px)';
      case 'tablet':
        return '平板斷點 (768px) - 觸發 RWD 折疊';
      case 'mobile':
        return '手機直向 (390px) - 單欄流體排版';
      case 'full':
      default:
        return '滿版自適應 (100%)';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between p-2 sm:p-4 animate-in fade-in duration-200">
      {/* 頂部操作欄 */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 mb-3 flex flex-wrap items-center justify-between gap-3 shadow-2xl shrink-0">
        {/* 左側：標題與徽章 */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Maximize2 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">{title}</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {badgeText}
              </span>
            </div>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        {/* 中間：核心分頁 Tab 切換列 (Preview / HTML / CSS / 雙欄對照) */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            type="button"
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'preview'
                ? 'bg-sky-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>即時預覽</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('html')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'html'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>HTML 結構</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('css')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'css'
                ? 'bg-sky-400 text-slate-950 shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>CSS 樣式</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              viewMode === 'split'
                ? 'bg-indigo-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
            title="一邊查看畫面，一邊對照 HTML/CSS 代碼"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">雙欄對照</span>
          </button>
        </div>

        {/* 右側：重繪與關閉 */}
        <div className="flex items-center gap-2">
          {viewMode === 'preview' && (
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
              title="重新載入畫面"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">重繪</span>
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-slate-700 hover:border-rose-500/30 transition-all text-xs font-semibold"
          >
            <X className="w-4 h-4" />
            <span>關閉 (ESC)</span>
          </button>
        </div>
      </div>

      {/* 預覽模式下的次級操作工具列（裝置視窗響應切換） */}
      {viewMode === 'preview' && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-2 mb-2 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setViewportMode('full')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewportMode === 'full'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Maximize2 className="w-3 h-3" />
              <span>滿版 100%</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewportMode === 'desktop'
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3 h-3" />
              <span>電腦版 (1200px)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode('tablet')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewportMode === 'tablet'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="平板 768px (測試 @media 斷點)"
            >
              <Tablet className="w-3 h-3" />
              <span>平板 768px (RWD)</span>
            </button>

            <button
              type="button"
              onClick={() => setViewportMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-all ${
                viewportMode === 'mobile'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="手機版 390px"
            >
              <Smartphone className="w-3 h-3" />
              <span>手機 (390px)</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
            目前視窗：<span className="text-sky-400 font-bold">{getViewportLabel()}</span>
          </div>
        </div>
      )}

      {/* 雙欄模式下的輔助導覽列 */}
      {viewMode === 'split' && (
        <div className="flex items-center justify-between gap-2 px-2 mb-2 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-sky-400 font-bold flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              左側：即時滾動預覽
            </span>
            <span>•</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Code className="w-3.5 h-3.5" />
              右側：代碼即時對照
            </span>
          </div>

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => setSplitCodeTab('css')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                splitCodeTab === 'css'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CSS 樣式
            </button>
            <button
              type="button"
              onClick={() => setSplitCodeTab('html')}
              className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                splitCodeTab === 'html'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              HTML 結構
            </button>
          </div>
        </div>
      )}

      {/* 主要內容展示大舞台 */}
      <div className="flex-1 overflow-hidden bg-slate-950/60 rounded-xl flex justify-center items-stretch p-1 sm:p-2">
        {/* 1. 純即時預覽模式 */}
        {viewMode === 'preview' && (
          <div
            className={`${getViewportWidthClass()} h-full transition-all duration-300 bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col`}
          >
            {/* 仿瀏覽器網址頂列 */}
            <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 bg-slate-900 px-3 py-0.5 rounded text-[11px] font-mono text-slate-400 truncate flex items-center justify-between">
                <span>https://onepage-showcase.local/preview</span>
                <span className="text-slate-600 text-[10px]">HTML5 + Modern CSS</span>
              </div>
            </div>

            {/* 渲染完整頁面之 iframe */}
            <div className="flex-1 w-full h-[calc(100%-36px)] bg-slate-950">
              <iframe
                key={refreshKey}
                title={title}
                srcDoc={srcDoc}
                className="w-full h-full border-0 bg-white"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>
        )}

        {/* 2. 純 HTML 原始碼模式 */}
        {viewMode === 'html' && (
          <div className="w-full h-full max-w-5xl">
            <CodeBlockView
              code={htmlCode}
              language="html"
              onSwitchTab={() => setViewMode('css')}
            />
          </div>
        )}

        {/* 3. 純 CSS 樣式表模式 */}
        {viewMode === 'css' && (
          <div className="w-full h-full max-w-5xl">
            <CodeBlockView
              code={cssCode}
              language="css"
              onSwitchTab={() => setViewMode('html')}
            />
          </div>
        )}

        {/* 4. 雙欄對照模式 (左側預覽 + 右側代碼) */}
        {viewMode === 'split' && (
          <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-hidden">
            {/* 左側：即時預覽 */}
            <div className="h-full bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col">
              <div className="bg-slate-950 px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400 shrink-0">
                <span className="font-semibold text-white">🖥️ 即時成果預覽</span>
                <button
                  type="button"
                  onClick={() => setRefreshKey((k) => k + 1)}
                  className="hover:text-white flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>重繪</span>
                </button>
              </div>
              <div className="flex-1 w-full bg-slate-950">
                <iframe
                  key={`split-${refreshKey}`}
                  title={`${title}-split`}
                  srcDoc={srcDoc}
                  className="w-full h-full border-0 bg-white"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </div>

            {/* 右側：代碼對照 */}
            <div className="h-full overflow-hidden">
              <CodeBlockView
                code={splitCodeTab === 'css' ? cssCode : htmlCode}
                language={splitCodeTab}
                onSwitchTab={(target) => setSplitCodeTab(target)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

