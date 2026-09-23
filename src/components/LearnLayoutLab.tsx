import React, { useState } from 'react';
import { 
  Maximize2, 
  Move, 
  Layers, 
  SplitSquareVertical, 
  Pin, 
  Zap, 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  ArrowRight,
  Code2,
  X,
  ExternalLink
} from 'lucide-react';

export type LabExperimentType = 
  | 'display' 
  | 'max-width' 
  | 'box-sizing' 
  | 'position' 
  | 'float-clearfix' 
  | 'flexbox';

interface LearnLayoutLabProps {
  initialExperiment?: LabExperimentType;
  onClose?: () => void;
  isModal?: boolean;
}

export const LearnLayoutLab: React.FC<LearnLayoutLabProps> = ({
  initialExperiment = 'display',
  onClose,
  isModal = false,
}) => {
  const [activeExperiment, setActiveExperiment] = useState<LabExperimentType>(initialExperiment);

  // 1. Display 狀態
  const [displayMode, setDisplayMode] = useState<'block' | 'inline' | 'inline-block' | 'none'>('block');

  // 2. Max-Width 狀態
  const [viewportWidth, setViewportWidth] = useState<number>(420);
  const [widthStrategy, setWidthStrategy] = useState<'fixed' | 'fluid'>('fixed');

  // 3. Box-Sizing 狀態
  const [boxSizingMode, setBoxSizingMode] = useState<'content-box' | 'border-box'>('border-box');
  const [paddingSize, setPaddingSize] = useState<number>(24);
  const [borderSize, setBorderSize] = useState<number>(6);
  const baseBoxWidth = 200;

  // 4. Position 狀態
  const [positionType, setPositionType] = useState<'static' | 'relative' | 'absolute' | 'fixed'>('absolute');
  const [parentHasRelative, setParentHasRelative] = useState<boolean>(true);
  const [posTop, setPosTop] = useState<number>(16);
  const [posRight, setPosRight] = useState<number>(16);

  // 5. Float & Clearfix 狀態
  const [isFloated, setIsFloated] = useState<boolean>(true);
  const [hasClearfix, setHasClearfix] = useState<boolean>(false);

  // 6. Flexbox 狀態
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between' | 'space-around'>('space-between');
  const [alignItems, setAlignItems] = useState<'stretch' | 'center' | 'flex-start'>('center');
  const [flexGap, setFlexGap] = useState<number>(12);

  const experimentTabs: { id: LabExperimentType; title: string; subtitle: string; icon: string }[] = [
    { id: 'display', title: '1. display 三大形態', subtitle: 'block / inline / inline-block', icon: '🧱' },
    { id: 'max-width', title: '2. margin: auto 與 max-width', subtitle: '置中與小螢幕防爆版', icon: '📐' },
    { id: 'box-sizing', title: '3. 盒模型與 box-sizing', subtitle: '外加膨脹 vs 內縮防禦', icon: '📦' },
    { id: 'position', title: '4. position 子絕父相', subtitle: '座標引力與尋找錨點', icon: '🧭' },
    { id: 'float-clearfix', title: '5. float 與 clearfix', subtitle: '高度塌陷救星', icon: '⛵' },
    { id: 'flexbox', title: '6. Flexbox 一維神器', subtitle: '現代彈性排版', icon: '⚡' },
  ];

  // 計算 box-sizing 寬度
  const calculatedTotalWidth = boxSizingMode === 'content-box' 
    ? baseBoxWidth + (paddingSize * 2) + (borderSize * 2)
    : baseBoxWidth;

  const contentAreaWidth = boxSizingMode === 'content-box'
    ? baseBoxWidth
    : Math.max(0, baseBoxWidth - (paddingSize * 2) - (borderSize * 2));

  return (
    <div className={`bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${isModal ? 'max-h-[90vh]' : ''}`}>
      {/* 頂部標題列 */}
      <div className="bg-slate-900 px-4 sm:px-6 py-3.5 border-b border-slate-800 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-sky-400 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-sky-500/20">
            📐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                LearnLayout 排版互動實驗室
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-medium border border-cyan-500/30">
                致敬 zh-tw.learnlayout.com
              </span>
            </div>
            <p className="text-xs text-slate-400">
              用最直觀的視覺實驗，搞懂 CSS 版面配置的核心底層心智模型
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="關閉實驗室"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 導覽按鈕列 (6 大實驗切換) */}
      <div className="bg-slate-900/60 border-b border-slate-800/80 px-3 py-2 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        {experimentTabs.map((tab) => {
          const isActive = activeExperiment === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveExperiment(tab.id)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                  : 'bg-slate-950/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800/80'
              }`}
            >
              <span>{tab.icon}</span>
              <div className="text-left">
                <div>{tab.title}</div>
                <div className={`text-[10px] ${isActive ? 'text-slate-900/80 font-normal' : 'text-slate-500'}`}>
                  {tab.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* 實驗主內容區 */}
      <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
        {/* -------------------------------------------------------------
            實驗 1：display 屬性三大形態
           ------------------------------------------------------------- */}
        {activeExperiment === 'display' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <span>🧱 display 的三大形態：霸道、隨和與雙面間諜</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    網頁上的每個元素都有預設的 display。是像磚塊一樣自佔一行，還是像字詞一樣乖乖排隊？
                  </p>
                </div>

                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {(['block', 'inline', 'inline-block', 'none'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setDisplayMode(mode)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        displayMode === mode
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      display: {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* 實戰預覽畫布 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 min-h-[160px] flex flex-col justify-center">
                <div className="text-xs text-slate-400 mb-2 font-mono">
                  &lt;!-- 容器寬度 100% 流動 --&gt;
                </div>

                {displayMode === 'block' && (
                  <div className="space-y-2.5">
                    <div className="bg-sky-500/20 border-2 border-sky-400 text-sky-200 p-3 rounded-lg text-center font-mono text-xs shadow-md">
                      <strong>div 元素 A (block)</strong>：霸道獨佔整行寬度 (width: 100%)，即使內容只有一點點，也強制換行！
                    </div>
                    <div className="bg-sky-500/20 border-2 border-sky-400 text-sky-200 p-3 rounded-lg text-center font-mono text-xs shadow-md">
                      <strong>div 元素 B (block)</strong>：被推擠到下一行，同樣佔滿整行。
                    </div>
                  </div>
                )}

                {displayMode === 'inline' && (
                  <div className="p-3 bg-slate-900/80 rounded-lg text-slate-200 text-sm leading-relaxed border border-slate-800">
                    這是段落文字的前半段，中間出現了
                    <span className="inline bg-amber-500/30 border-2 border-amber-400 text-amber-300 font-mono px-2 py-1 mx-1.5 rounded">
                      &lt;span&gt; 元素 (inline)
                    </span>
                    它乖乖順著文字河流排隊。
                    <span className="text-rose-400 font-bold">
                      注意：inline 元素完全無視 width 與 height 設定！
                    </span>
                    若文字很長，它會在行末自然斷行。
                  </div>
                )}

                {displayMode === 'inline-block' && (
                  <div>
                    <div className="text-slate-300 text-xs mb-3">
                      💡 <strong>inline-block 混血優勢</strong>：既像文字可以並排在同一行，又像 block 能夠設定寬高與內距！
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-block w-36 h-20 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 p-2 rounded-lg font-mono text-xs flex flex-col justify-center text-center">
                        <span className="font-bold">盒子 1</span>
                        <span className="text-[10px] text-emerald-400/80">width: 144px; h: 80px</span>
                      </div>
                      <div className="inline-block w-36 h-20 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 p-2 rounded-lg font-mono text-xs flex flex-col justify-center text-center">
                        <span className="font-bold">盒子 2</span>
                        <span className="text-[10px] text-emerald-400/80">並排在同一行！</span>
                      </div>
                      <div className="inline-block w-36 h-20 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 p-2 rounded-lg font-mono text-xs flex flex-col justify-center text-center">
                        <span className="font-bold">盒子 3</span>
                        <span className="text-[10px] text-emerald-400/80">有尺寸又有禮貌</span>
                      </div>
                    </div>
                  </div>
                )}

                {displayMode === 'none' && (
                  <div className="p-4 bg-rose-950/20 border border-rose-500/40 rounded-lg text-center">
                    <div className="text-rose-400 font-bold text-sm">👻 元素徹底消失 (display: none)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      元素不僅看不見，而且在畫面上<strong>「完全不佔據任何空間」</strong>（就像從未存在過一樣）！
                      若只想隱形但保留空間，請使用 <code className="text-sky-300">visibility: hidden;</code>。
                    </p>
                  </div>
                )}
              </div>

              {/* 核心心法比較表 */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-sky-400 font-bold">display: block</span>
                  <ul className="text-slate-400 mt-1.5 space-y-1 list-disc list-inside">
                    <li>常見代表：&lt;div&gt;, &lt;p&gt;, &lt;h1&gt;</li>
                    <li>強制獨立換行，霸佔整行車道</li>
                    <li>可自由設定 width / height / margin</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-amber-400 font-bold">display: inline</span>
                  <ul className="text-slate-400 mt-1.5 space-y-1 list-disc list-inside">
                    <li>常見代表：&lt;span&gt;, &lt;a&gt;, &lt;strong&gt;</li>
                    <li>順著文字流排隊，不換行</li>
                    <li>無視 width、height、上下 margin</li>
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="font-mono text-emerald-400 font-bold">display: inline-block</span>
                  <ul className="text-slate-400 mt-1.5 space-y-1 list-disc list-inside">
                    <li>集合兩者優點：可以並排 + 有寬高</li>
                    <li>早期做導覽按鈕與卡片並排的利器</li>
                    <li>注意：HTML 標籤間的換行會有 4px 空白</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            實驗 2：margin: auto 與 max-width 小螢幕救贖
           ------------------------------------------------------------- */}
        {activeExperiment === 'max-width' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                    <span>📐 margin: auto 水平置中與 max-width 的救贖</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    參考 zh-tw.learnlayout.com/max-width.html：為什麼設定死寬度在手機上是災難？
                  </p>
                </div>

                {/* 切換策略 */}
                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setWidthStrategy('fixed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      widthStrategy === 'fixed'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ❌ 寫死 width: 500px;
                  </button>
                  <button
                    onClick={() => setWidthStrategy('fluid')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      widthStrategy === 'fluid'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✅ 救星 max-width: 500px;
                  </button>
                </div>
              </div>

              {/* 視窗寬度拉桿 */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-sky-400" />
                    <span>模擬瀏覽器視窗寬度 (Viewport Width)：</span>
                  </span>
                  <span className="font-mono text-sky-400 font-bold px-2 py-0.5 rounded bg-sky-950 border border-sky-500/30">
                    {viewportWidth}px {viewportWidth <= 480 ? '📱 手機視窗' : viewportWidth <= 768 ? '📟 平板視窗' : '💻 桌機視窗'}
                  </span>
                </div>
                <input
                  type="range"
                  min="320"
                  max="680"
                  step="10"
                  value={viewportWidth}
                  onChange={(e) => setViewportWidth(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                  <span>320px (超窄手機)</span>
                  <span>480px (大螢幕手機)</span>
                  <span>680px (平版/小筆電)</span>
                </div>
              </div>

              {/* 模擬視窗容器 */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto">
                <div className="text-[11px] text-slate-400 mb-2 font-mono flex items-center justify-between">
                  <span>模擬螢幕 (寬度: {viewportWidth}px)</span>
                  {widthStrategy === 'fixed' && viewportWidth < 500 && (
                    <span className="text-rose-400 font-bold flex items-center gap-1 animate-pulse">
                      <AlertTriangle className="w-3.5 h-3.5" /> 產生爆版水平捲軸！
                    </span>
                  )}
                  {widthStrategy === 'fluid' && (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> 完美自適應！
                    </span>
                  )}
                </div>

                {/* 瀏覽器邊界框 */}
                <div 
                  className="mx-auto border-2 border-dashed border-slate-700 p-3 rounded-lg relative overflow-x-auto transition-all bg-slate-900/50"
                  style={{ width: `${viewportWidth}px` }}
                >
                  {widthStrategy === 'fixed' ? (
                    <div 
                      className="bg-rose-500/20 border-2 border-rose-500 text-rose-200 p-4 rounded-lg font-mono text-xs text-center shadow-lg"
                      style={{ width: '500px', margin: '0 auto' }}
                    >
                      <div className="font-bold text-sm">width: 500px; margin: 0 auto;</div>
                      <div className="text-[11px] text-rose-300 mt-1">
                        固定寬度死硬不變。當視窗小於 500px 時，右側直接被切斷破版！
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="bg-emerald-500/20 border-2 border-emerald-500 text-emerald-200 p-4 rounded-lg font-mono text-xs text-center shadow-lg"
                      style={{ maxWidth: '500px', width: '100%', margin: '0 auto' }}
                    >
                      <div className="font-bold text-sm">max-width: 500px; width: 100%; margin: 0 auto;</div>
                      <div className="text-[11px] text-emerald-300 mt-1">
                        大螢幕最大 500px 且水平置中；在小螢幕時自動縮小至 100%，不溢出不破版！
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 核心心法 */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs leading-relaxed text-slate-300">
                💡 <strong>LearnLayout 排版金律</strong>：
                <span className="text-emerald-300 font-semibold"> margin: 0 auto; </span>
                可以讓區塊水平置中，但前提是該區塊必須具有寬度限制！而現代響應式網頁中，請盡量用 
                <span className="text-sky-300 font-mono font-bold"> max-width: 500px; </span> 
                取代寫死的 <span className="text-rose-400 font-mono">width: 500px;</span>，這樣手機用戶才不會看到醜陋的水平捲軸！
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            實驗 3：盒模型與 box-sizing 防爆裁縫
           ------------------------------------------------------------- */}
        {activeExperiment === 'box-sizing' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                    <span>📦 為什麼我的盒子變胖了？解救撐爆的 box-sizing</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    CSS 預設的 content-box 是新手最大的數學陷阱。padding 與 border 會額外往外加上去！
                  </p>
                </div>

                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setBoxSizingMode('border-box')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      boxSizingMode === 'border-box'
                        ? 'bg-emerald-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ✅ border-box (現代黃金標準)
                  </button>
                  <button
                    onClick={() => setBoxSizingMode('content-box')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      boxSizingMode === 'content-box'
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ❌ content-box (預設爆版數學)
                  </button>
                </div>
              </div>

              {/* 即時調整 Padding 與 Border 的拉桿 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Padding 內距泡綿：</span>
                    <span className="font-mono text-emerald-400">{paddingSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="40"
                    value={paddingSize}
                    onChange={(e) => setPaddingSize(Number(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="flex justify-between text-slate-300 font-semibold mb-1">
                    <span>Border 邊框厚度：</span>
                    <span className="font-mono text-amber-400">{borderSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    value={borderSize}
                    onChange={(e) => setBorderSize(Number(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                </div>
              </div>

              {/* 視覺剖析對比畫布 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center">
                <div className="text-xs text-slate-400 mb-3 font-mono">
                  父容器預計分配寬度：200px 標線
                </div>

                {/* 200px 期望邊界標尺 */}
                <div className="w-[200px] border-b border-sky-400/50 pb-1 text-center text-[10px] text-sky-300 font-mono mb-2 relative">
                  <span className="absolute left-0 -bottom-1 w-1.5 h-1.5 bg-sky-400 rounded-full" />
                  <span>期望寬度 200px</span>
                  <span className="absolute right-0 -bottom-1 w-1.5 h-1.5 bg-sky-400 rounded-full" />
                </div>

                {/* 動態展示盒子 */}
                <div 
                  className={`transition-all duration-300 text-center font-mono relative ${
                    boxSizingMode === 'border-box' 
                      ? 'bg-emerald-950/60 border-emerald-400 text-emerald-200' 
                      : 'bg-rose-950/60 border-rose-500 text-rose-200'
                  }`}
                  style={{
                    boxSizing: boxSizingMode,
                    width: `${baseBoxWidth}px`,
                    padding: `${paddingSize}px`,
                    borderWidth: `${borderSize}px`,
                    borderStyle: 'solid',
                  }}
                >
                  <div className="bg-sky-500/20 border border-sky-400/60 py-2 rounded text-xs text-sky-200">
                    <div>Content 內容區</div>
                    <div className="text-[10px] opacity-80">{contentAreaWidth}px</div>
                  </div>

                  {boxSizingMode === 'content-box' && (
                    <div className="absolute -top-7 right-0 text-[11px] font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500 animate-bounce">
                      撐破到 {calculatedTotalWidth}px！
                    </div>
                  )}
                </div>

                {/* 寬度計算公式揭密 */}
                <div className="mt-5 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs w-full max-w-md">
                  {boxSizingMode === 'border-box' ? (
                    <div className="space-y-1 text-emerald-300">
                      <div className="font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>總寬度 = 宣告的 200px（鎖死安全！）</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        Padding ({paddingSize}×2) 與 Border ({borderSize}×2) 自動向內壓縮，內容區縮為 {contentAreaWidth}px。絕不撐破父容器！
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 text-rose-300">
                      <div className="font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>總寬度 = 200 + {paddingSize*2} + {borderSize*2} = {calculatedTotalWidth}px！</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">
                        多出了 {calculatedTotalWidth - baseBoxWidth}px！這就是以前做多欄排版時，盒子莫名其妙掉下去的罪魁禍首！
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            實驗 4：position 家族與「子絕父相」親情連線
           ------------------------------------------------------------- */}
        {activeExperiment === 'position' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <span>🧭 position 四大天王與「子絕父相」尋親記</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    position: absolute 脫離一般文檔流後，會往上尋找「第一個非 static 的祖先元素」當錨點！
                  </p>
                </div>

                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {(['static', 'relative', 'absolute', 'fixed'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setPositionType(pos)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                        positionType === pos
                          ? 'bg-sky-500 text-slate-950 shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              {/* 關鍵開關：父層是否有 relative */}
              {positionType === 'absolute' && (
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-300 font-semibold">
                    【子絕父相驗證開關】父容器是否加上 <code className="text-amber-400">position: relative</code>？
                  </span>
                  <button
                    onClick={() => setParentHasRelative(!parentHasRelative)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      parentHasRelative
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {parentHasRelative ? '✅ 已加 relative (找到爸爸)' : '❌ 未加 (static 離家出走)'}
                  </button>
                </div>
              )}

              {/* 座標模擬箱 */}
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 relative min-h-[260px] flex items-center justify-center overflow-hidden">
                {/* 瀏覽器頂部視窗標記 */}
                <div className="absolute top-2 left-2 text-[10px] text-slate-500 font-mono">
                  &lt;html / body 視窗頂點 (0, 0)&gt;
                </div>

                {/* 父容器卡片 */}
                <div 
                  className={`w-full max-w-md p-6 rounded-2xl border-2 transition-all duration-300 min-h-[160px] ${
                    parentHasRelative && positionType === 'absolute'
                      ? 'bg-slate-900 border-amber-400 relative shadow-xl shadow-amber-500/10'
                      : 'bg-slate-900/60 border-slate-700'
                  }`}
                  style={{
                    position: (parentHasRelative && positionType === 'absolute') ? 'relative' : 'static'
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-300 font-mono">
                      .parent-card {parentHasRelative && positionType === 'absolute' ? '(position: relative)' : '(position: static)'}
                    </span>
                    {parentHasRelative && positionType === 'absolute' && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                        🌟 認領成為定位錨點！
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">
                    這是卡片內部的普通內容段落。子元素如果被設為 absolute，會以此卡片或是整個視窗為基準點定位。
                  </p>

                  {/* 標籤元件（子元素） */}
                  <div 
                    className={`transition-all duration-300 px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-lg flex items-center gap-1.5 ${
                      positionType === 'absolute'
                        ? 'bg-rose-500 text-white'
                        : positionType === 'relative'
                        ? 'bg-amber-500 text-slate-950'
                        : positionType === 'fixed'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                    style={{
                      position: positionType,
                      top: positionType !== 'static' ? `${posTop}px` : undefined,
                      right: positionType !== 'static' ? `${posRight}px` : undefined,
                    }}
                  >
                    <span>🏷️ 子徽章</span>
                    <span className="text-[10px] opacity-90">({positionType})</span>
                  </div>
                </div>

                {/* 離家出走提示線 */}
                {positionType === 'absolute' && !parentHasRelative && (
                  <div className="absolute top-8 right-8 text-rose-400 text-xs font-bold bg-rose-950/80 px-3 py-1.5 rounded-lg border border-rose-500/50 flex items-center gap-2 animate-pulse">
                    <AlertTriangle className="w-4 h-4" />
                    <span>父層沒設 relative！子元素直接逃票釘在整張網頁的右上角！</span>
                  </div>
                )}
              </div>

              {/* 口訣重點 */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-300">
                <span className="text-amber-400 font-bold">🏆 金手口訣「子絕父相」</span>：
                子元素設 <code className="text-rose-400 font-mono">position: absolute</code>，父元素一定要設 <code className="text-amber-300 font-mono">position: relative</code>！
                這樣子元素的 <code className="text-sky-300">top / right / bottom / left</code> 才會乖乖鎖定在父元素邊界內，不會飛出外太空！
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            實驗 5：float 浮動與 Clearfix 塌陷清理隊
           ------------------------------------------------------------- */}
        {activeExperiment === 'float-clearfix' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <span>⛵ float 浮動與神秘的 Clearfix 塌陷清理隊</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    float 最初是為報章雜誌「文繞圖」而設計。元素浮動後脫離高度計算，造成父容器高度縮減為 0（高度塌陷）！
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setHasClearfix(!hasClearfix)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      hasClearfix
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {hasClearfix ? '✅ 已加上 .clearfix' : '❌ 未清理 (高度塌陷中)'}
                  </button>
                </div>
              </div>

              {/* 畫布 */}
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 mb-2 font-mono">
                  父容器邊框（注意看灰色外框是否有把綠色圖片完整包住）：
                </div>

                <div 
                  className={`border-2 border-dashed p-3 rounded-xl transition-all duration-300 ${
                    hasClearfix 
                      ? 'border-emerald-500/80 bg-emerald-950/20' 
                      : 'border-rose-500/80 bg-rose-950/20 min-h-[50px]'
                  }`}
                >
                  <div className="float-left w-24 h-24 bg-emerald-500/30 border-2 border-emerald-400 rounded-lg p-2 mr-4 mb-2 text-center text-xs font-mono text-emerald-200 flex flex-col items-center justify-center">
                    <span>📷 圖片</span>
                    <span className="text-[10px]">float: left;</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    這是一段文字，環繞在浮動圖片的右側。在早期的網頁排版中，工程師常拿 float 做欄位並排。但浮動的元素「不計入父容器高度」！
                  </p>

                  {/* 清除浮動偽元素模擬 */}
                  {hasClearfix && (
                    <div className="clear-both pt-2 border-t border-emerald-500/30 text-[11px] text-emerald-400 font-mono mt-2">
                      ✨ .clearfix::after 成功清除浮動，父容器高度被完美撐開！
                    </div>
                  )}
                </div>

                {!hasClearfix && (
                  <div className="mt-3 text-xs text-rose-400 font-semibold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>高度塌陷！圖片底部突出了父容器邊界，後面緊接的內容會被重疊推擠破版！</span>
                  </div>
                )}
              </div>

              {/* 經典 Clearfix 語法展示 */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-sky-400 font-bold font-sans">經典 Micro Clearfix 魔法公式：</span>
                <pre className="mt-1 text-slate-400">
{`.clearfix::after {
  content: "";
  display: table;
  clear: both;
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            實驗 6：Flexbox 一維彈性神器
           ------------------------------------------------------------- */}
        {activeExperiment === 'flexbox' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-sky-400 flex items-center gap-1.5">
                    <span>⚡ Flexbox 終極救世主：現代一維排版操縱台</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    徹底告別算數學、float 塌陷與 table 排版的噩夢。一行 display: flex 掌控一切！
                  </p>
                </div>
              </div>

              {/* 控制面板 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4 text-xs">
                {/* 軸線方向 */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1.5">flex-direction (主軸方向)：</span>
                  <div className="flex gap-1">
                    {(['row', 'column'] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => setFlexDirection(dir)}
                        className={`flex-1 py-1 rounded text-xs font-mono font-bold transition-all ${
                          flexDirection === dir ? 'bg-sky-500 text-slate-950' : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 主軸對齊 */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1.5">justify-content (主軸對齊)：</span>
                  <select
                    value={justifyContent}
                    onChange={(e) => setJustifyContent(e.target.value as any)}
                    className="w-full bg-slate-900 text-sky-300 border border-slate-700 rounded p-1 font-mono text-xs"
                  >
                    <option value="flex-start">flex-start (起點靠齊)</option>
                    <option value="center">center (置中對齊)</option>
                    <option value="space-between">space-between (兩端對齊)</option>
                    <option value="space-around">space-around (環繞均分)</option>
                  </select>
                </div>

                {/* 交叉軸對齊 */}
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="font-semibold text-slate-300 block mb-1.5">align-items (垂直交叉軸)：</span>
                  <select
                    value={alignItems}
                    onChange={(e) => setAlignItems(e.target.value as any)}
                    className="w-full bg-slate-900 text-sky-300 border border-slate-700 rounded p-1 font-mono text-xs"
                  >
                    <option value="center">center (垂直置中)</option>
                    <option value="stretch">stretch (等高拉伸)</option>
                    <option value="flex-start">flex-start (頂部對齊)</option>
                  </select>
                </div>
              </div>

              {/* 動態展示舞台 */}
              <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px] flex">
                <div 
                  className="w-full border-2 border-dashed border-sky-500/40 rounded-xl p-4 transition-all duration-300 min-h-[160px]"
                  style={{
                    display: 'flex',
                    flexDirection,
                    justifyContent,
                    alignItems,
                    gap: `${flexGap}px`,
                  }}
                >
                  <div className="w-20 h-16 bg-gradient-to-tr from-sky-500 to-cyan-400 text-slate-950 font-bold rounded-xl flex items-center justify-center text-sm shadow-md shrink-0">
                    項目 1
                  </div>
                  <div className="w-24 h-20 bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-bold rounded-xl flex items-center justify-center text-sm shadow-md shrink-0">
                    項目 2
                  </div>
                  <div className="w-20 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold rounded-xl flex items-center justify-center text-sm shadow-md shrink-0">
                    項目 3
                  </div>
                </div>
              </div>

              {/* 生成的 CSS 樣式即時複製 */}
              <div className="mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs font-mono text-sky-300">
                <div>
                  display: flex; flex-direction: {flexDirection}; justify-content: {justifyContent}; align-items: {alignItems};
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
