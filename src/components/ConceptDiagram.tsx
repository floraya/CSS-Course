import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldAlert, Sparkles, Scale, Maximize2, Compass, Move, Columns, Grid as GridIcon, Sun, Activity, Smartphone, RotateCw } from 'lucide-react';

interface ConceptDiagramProps {
  lessonId: string;
}

export const ConceptDiagram: React.FC<ConceptDiagramProps> = ({ lessonId }) => {
  // 互動狀態
  const [boxModelMode, setBoxModelMode] = useState<'content' | 'border'>('border');
  const [specWeightChoice, setSpecWeightChoice] = useState<'classVsId' | 'importantVsAll' | 'fourTier'>('classVsId');
  const [positionHasRelative, setPositionHasRelative] = useState<boolean>(true);
  const [flexJustify, setFlexJustify] = useState<'flex-start' | 'center' | 'space-between'>('space-between');
  const [rwdMode, setRwdMode] = useState<'desktop' | 'mobile'>('desktop');
  const [displayModeTab, setDisplayModeTab] = useState<'block' | 'inline' | 'inline-block'>('block');

  switch (lessonId) {
    // ----------------------------------------------------------------
    // 1. CSS 語法結構解剖圖
    // ----------------------------------------------------------------
    case 'css-syntax-basics':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>CSS 規則解剖結構圖 (Syntax Anatomy)</span>
              </span>
              <span className="text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                標準語法公式
              </span>
            </div>

            {/* 解剖圖主體 */}
            <div className="p-4 bg-slate-900/90 rounded-lg border border-slate-800 font-mono text-sm sm:text-base relative">
              <div className="flex flex-wrap items-center gap-2 text-slate-200">
                {/* 選擇器 */}
                <div className="relative group p-1.5 rounded bg-sky-950/60 border border-sky-500/40 text-sky-300 font-bold">
                  <span>h1</span>
                  <div className="text-[10px] text-sky-400 font-sans tracking-tight mt-0.5">
                    ↑ 選擇器 (改造對象)
                  </div>
                </div>

                <span className="text-amber-400 text-lg font-bold">{'{'}</span>

                {/* 屬性 */}
                <div className="relative group p-1.5 rounded bg-indigo-950/60 border border-indigo-500/40 text-indigo-300">
                  <span>color</span>
                  <div className="text-[10px] text-indigo-400 font-sans tracking-tight mt-0.5">
                    ↑ 屬性 (改什麼)
                  </div>
                </div>

                <span className="text-slate-400 font-bold">:</span>

                {/* 屬性值 */}
                <div className="relative group p-1.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                  <span>#38bdf8</span>
                  <div className="text-[10px] text-emerald-400 font-sans tracking-tight mt-0.5">
                    ↑ 屬性值 (改成怎樣)
                  </div>
                </div>

                {/* 結尾分號 */}
                <div className="relative group p-1.5 rounded bg-rose-950/70 border border-rose-500/60 text-rose-300 font-bold animate-pulse">
                  <span>;</span>
                  <div className="text-[10px] text-rose-400 font-sans tracking-tight mt-0.5 font-bold">
                    ↑ 安全鎖 (分號必加！)
                  </div>
                </div>

                <span className="text-amber-400 text-lg font-bold">{'}'}</span>
              </div>
            </div>

            {/* 三種引入架構對比圖解 */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/30">
                <div className="font-bold text-rose-400 flex items-center gap-1 mb-1">
                  <span>❌ 行內 (Inline)</span>
                </div>
                <div className="font-mono text-[11px] text-rose-200/90">&lt;h1 style="color:red"&gt;</div>
                <div className="text-[11px] text-slate-400 mt-1">結構與外觀混雜，難以覆蓋，競賽扣分。</div>
              </div>

              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30">
                <div className="font-bold text-amber-400 flex items-center gap-1 mb-1">
                  <span>⚠️ 內部 (Internal)</span>
                </div>
                <div className="font-mono text-[11px] text-amber-200/90">&lt;style&gt; in &lt;head&gt;</div>
                <div className="text-[11px] text-slate-400 mt-1">單頁專用，無法跨多個頁面共享樣式。</div>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="font-bold text-emerald-400 flex items-center gap-1 mb-1">
                  <span>✅ 外部 (External)</span>
                </div>
                <div className="font-mono text-[11px] text-emerald-200/90">&lt;link rel="stylesheet"&gt;</div>
                <div className="text-[11px] text-slate-400 mt-1">完全獨立分離，整潔便於複用，金手標準。</div>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 2. 選擇器權重天平對抗圖
    // ----------------------------------------------------------------
    case 'css-selectors-specificity':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>選擇器權重天平大對抗 (Specificity Scale)</span>
              </span>
              <div className="flex flex-wrap gap-1">
                <button
                  type="button"
                  onClick={() => setSpecWeightChoice('classVsId')}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    specWeightChoice === 'classVsId'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  PK 1: Class vs ID
                </button>
                <button
                  type="button"
                  onClick={() => setSpecWeightChoice('importantVsAll')}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    specWeightChoice === 'importantVsAll'
                      ? 'bg-rose-500 text-white font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  PK 2: !important 破壞神
                </button>
                <button
                  type="button"
                  onClick={() => setSpecWeightChoice('fourTier')}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    specWeightChoice === 'fourTier'
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  PK 3: 四階 (0,0,0,0)
                </button>
              </div>
            </div>

            {/* 階梯層級量表 */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-24 font-bold text-rose-400 shrink-0">💥 !important</span>
                <div className="flex-1 bg-slate-900 h-5 rounded-full overflow-hidden p-0.5 border border-rose-500/40">
                  <div className="bg-gradient-to-r from-rose-500 to-amber-500 h-full rounded-full w-full flex items-center justify-end pr-2 text-[10px] text-white font-bold">
                    無限大力量 (破壞常規)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-24 font-mono font-bold text-amber-400 shrink-0">#id (身分證)</span>
                <div className="flex-1 bg-slate-900 h-5 rounded-full overflow-hidden p-0.5 border border-amber-500/30">
                  <div className="bg-amber-500 h-full rounded-full w-[80%] flex items-center justify-end pr-2 text-[10px] text-slate-950 font-bold">
                    100 分 (重砲部隊)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-24 font-mono font-bold text-sky-400 shrink-0">.class / :hover</span>
                <div className="flex-1 bg-slate-900 h-5 rounded-full overflow-hidden p-0.5 border border-sky-500/30">
                  <div className="bg-sky-500 h-full rounded-full w-[45%] flex items-center justify-end pr-2 text-[10px] text-slate-950 font-bold">
                    10 分 (班級小隊)
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-24 font-mono font-bold text-slate-400 shrink-0">tag (div, p)</span>
                <div className="flex-1 bg-slate-900 h-5 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div className="bg-slate-600 h-full rounded-full w-[15%] flex items-center justify-end pr-2 text-[10px] text-slate-200">
                    1 分
                  </div>
                </div>
              </div>
            </div>

            {/* 動態 PK 戰局分析 */}
            <div className="mt-4 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              {specWeightChoice === 'classVsId' ? (
                <div className="flex items-center justify-between gap-2">
                  <div className="text-center flex-1">
                    <div className="font-mono text-sky-400 font-bold">.btn.primary.active</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">3 個 class = 30 分</div>
                  </div>
                  <div className="font-bold text-rose-400 text-sm">VS</div>
                  <div className="text-center flex-1">
                    <div className="font-mono text-amber-400 font-bold">#submit-btn</div>
                    <div className="text-[11px] text-amber-300 font-semibold mt-0.5">1 個 ID = 100 分 🏆</div>
                  </div>
                </div>
              ) : specWeightChoice === 'importantVsAll' ? (
                <div className="text-center text-slate-300">
                  <span className="text-rose-400 font-bold">!important</span> 覆蓋一切規則，但會摧毀 CSS
                  可維護性。金手獎評審嚴格禁止在無特殊理由下濫用！
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="font-bold text-sky-400 text-[11px] mb-1">權重四位數公式 (a, b, c, d)：</div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-center text-[10px]">
                    <div className="bg-slate-950 p-1.5 rounded border border-rose-500/30">
                      <div className="font-bold text-rose-400">a: 行內 style</div>
                      <div className="text-slate-400 font-mono mt-0.5">(1, 0, 0, 0)</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-amber-500/30">
                      <div className="font-bold text-amber-400">b: ID 選擇器</div>
                      <div className="text-slate-400 font-mono mt-0.5">(0, 1, 0, 0)</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-sky-500/30">
                      <div className="font-bold text-sky-400">c: Class / :hover</div>
                      <div className="text-slate-400 font-mono mt-0.5">(0, 0, 1, 0)</div>
                    </div>
                    <div className="bg-slate-950 p-1.5 rounded border border-slate-700">
                      <div className="font-bold text-slate-300">d: 標籤 / 元素</div>
                      <div className="text-slate-400 font-mono mt-0.5">(0, 0, 0, 1)</div>
                    </div>
                  </div>
                  <div className="text-slate-400 text-[11px] text-center pt-1 font-mono">
                    💡 註：權重平手時，以 CSS 中最後寫的規則勝出 (Cascading 層疊原則)
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 3. 盒模型四層透視剖面圖
    // ----------------------------------------------------------------
    case 'css-box-model-deep':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5" />
                <span>盒模型 4 層透視剖面圖 (Box Model Blueprint)</span>
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setBoxModelMode('border')}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    boxModelMode === 'border'
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ✅ border-box
                </button>
                <button
                  type="button"
                  onClick={() => setBoxModelMode('content')}
                  className={`text-[11px] px-2 py-0.5 rounded transition-colors ${
                    boxModelMode === 'content'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  ❌ content-box
                </button>
              </div>
            </div>

            {/* 4 層盒模型視覺繪圖 */}
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-800 flex justify-center">
              <div className="w-full max-w-[340px] text-center text-xs">
                {/* 1. Margin 外距 (橘色) */}
                <div className="bg-amber-950/40 border-2 border-dashed border-amber-500/60 rounded-xl p-3 text-amber-300 font-semibold relative">
                  <span className="text-[10px] tracking-wider uppercase block text-amber-400">
                    Margin (鄰居安全防撞外距)
                  </span>

                  {/* 2. Border 邊框 (金黃色) */}
                  <div className="bg-yellow-950/50 border-2 border-solid border-yellow-400 rounded-lg p-3 text-yellow-200 font-semibold mt-2 relative">
                    <span className="text-[10px] tracking-wider uppercase block text-yellow-300">
                      Border (實體防護外箱牆)
                    </span>

                    {/* 3. Padding 內距 (翠綠色) */}
                    <div className="bg-emerald-950/50 border border-emerald-500/50 rounded-md p-3 text-emerald-200 font-semibold mt-2 relative">
                      <span className="text-[10px] tracking-wider uppercase block text-emerald-400">
                        Padding (內側防撞泡綿緩衝)
                      </span>

                      {/* 4. Content 內容核心 (藍色晶片) */}
                      <div className="bg-sky-500 text-slate-950 font-bold py-2 rounded mt-2 shadow-md">
                        <span className="text-xs">Content 內容核心</span>
                        <div className="text-[10px] font-mono">width × height</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 寬度計算結果比對 */}
            <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              {boxModelMode === 'border' ? (
                <div className="flex items-center gap-2 text-emerald-300">
                  <span className="text-base">🛡️</span>
                  <div>
                    <span className="font-bold">box-sizing: border-box (金手選手必設)</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      宣告 width: 200px，就算加 padding 20px 與 border 2px，總寬度依然牢牢鎖在 200px，絕不爆版！
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-rose-300">
                  <span className="text-base">💥</span>
                  <div>
                    <span className="font-bold">box-sizing: content-box (預設爆版地雷)</span>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      宣告 width: 200px + padding 40px + border 4px = 總寬 244px！直接撐爆父層破版。
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 4. 四大顯示模式通道圖解
    // ----------------------------------------------------------------
    case 'css-display-modes':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Columns className="w-3.5 h-3.5" />
                <span>顯示模式排版通道圖解 (Display Flow)</span>
              </span>
              <div className="flex gap-1">
                {(['block', 'inline', 'inline-block'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setDisplayModeTab(mode)}
                    className={`text-[11px] px-2 py-0.5 rounded transition-colors font-mono ${
                      displayModeTab === mode
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* 視覺排版展示箱 */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 min-h-[110px] flex items-center justify-center">
              {displayModeTab === 'block' && (
                <div className="w-full space-y-2">
                  <div className="bg-sky-500/30 border border-sky-400 text-sky-200 text-xs p-2 rounded text-center font-mono">
                    Block 元素 A（霸道佔據 100% 整行車道）
                  </div>
                  <div className="bg-sky-500/30 border border-sky-400 text-sky-200 text-xs p-2 rounded text-center font-mono">
                    Block 元素 B（強制換行，被推擠到第二行）
                  </div>
                </div>
              )}

              {displayModeTab === 'inline' && (
                <div className="text-slate-300 text-xs leading-loose">
                  這是一段正常文字，中間夾雜著
                  <span className="bg-amber-500/30 border border-amber-400 text-amber-200 px-2 py-0.5 mx-1 rounded font-mono">
                    &lt;span&gt; (inline)
                  </span>
                  它順著文字流水排，
                  <span className="text-rose-400 font-semibold underline decoration-rose-500">
                    無法自訂寬高
                  </span>
                  ，隨文字換行折斷。
                </div>
              )}

              {displayModeTab === 'inline-block' && (
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs p-2 rounded text-center font-mono w-28 h-12 flex items-center justify-center">
                    Box 1 (可設寬高)
                  </div>
                  <div className="bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs p-2 rounded text-center font-mono w-28 h-12 flex items-center justify-center">
                    Box 2 (橫排並立)
                  </div>
                  <div className="bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-xs p-2 rounded text-center font-mono w-28 h-12 flex items-center justify-center">
                    Box 3 (文武雙全)
                  </div>
                </div>
              )}
            </div>

            {/* 說明短評 */}
            <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>
                {displayModeTab === 'block' && '常見標籤：div, h1~h6, p, ul。獨佔整行，預設寬度 100%。'}
                {displayModeTab === 'inline' && '常見標籤：span, a, strong。高度與寬度由內部字數決定。'}
                {displayModeTab === 'inline-block' && '既能像文字一樣水平並排，又能自由設定 width、height 與 margin！'}
              </span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 5. 漸層與色彩羅盤圖解
    // ----------------------------------------------------------------
    case 'css-colors-gradients':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>線性漸層方向羅盤 (Linear Gradient Angles)</span>
              </span>
              <span className="text-[11px] text-slate-400">光學角度圖解</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg bg-gradient-to-t from-slate-900 to-sky-500 border border-sky-400/40 text-white font-mono">
                <div className="font-bold text-sm">0deg</div>
                <div className="text-[10px] text-sky-200 mt-1">↑ 往上方</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-slate-900 to-indigo-500 border border-indigo-400/40 text-white font-mono">
                <div className="font-bold text-sm">90deg</div>
                <div className="text-[10px] text-indigo-200 mt-1">→ 往右方</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 border border-emerald-400/40 text-white font-mono">
                <div className="font-bold text-sm">135deg</div>
                <div className="text-[10px] text-emerald-100 mt-1">↘ 斜角高質感</div>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-b from-purple-500 to-slate-900 border border-purple-400/40 text-white font-mono">
                <div className="font-bold text-sm">180deg</div>
                <div className="text-[10px] text-purple-200 mt-1">↓ 往下方</div>
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">RGBA 與透明度剖面：</span>
              <code className="text-sky-300 font-mono ml-1">rgba(15, 23, 42, 0.8)</code>
              <span className="text-slate-400 ml-1">—— 前三碼是 RGB 原色，最後一碼 0.8 是 Alpha 透明度 (0~1)。</span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 6. 子絕父相定位圖解
    // ----------------------------------------------------------------
    case 'css-positioning-master':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Move className="w-3.5 h-3.5" />
                <span>「子絕父相」坐標系圖解 (Coordinate Anchor)</span>
              </span>
              <button
                type="button"
                onClick={() => setPositionHasRelative(!positionHasRelative)}
                className={`text-[11px] px-2.5 py-1 rounded transition-colors font-semibold ${
                  positionHasRelative
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 text-white'
                }`}
              >
                {positionHasRelative ? '✅ 父層有 relative' : '❌ 父層忘了 relative'}
              </button>
            </div>

            {/* 定位模擬舞台 */}
            <div className="relative bg-slate-900/90 rounded-lg border border-slate-800 h-44 p-3 overflow-hidden">
              <div className="text-[10px] text-slate-500 font-mono">瀏覽器視窗 (Viewport 根原點 0,0)</div>

              {/* 父層容器 */}
              <div
                className={`w-48 h-28 mx-auto mt-3 rounded-lg border-2 border-dashed p-2 transition-all relative ${
                  positionHasRelative
                    ? 'border-emerald-400 bg-emerald-950/30'
                    : 'border-slate-700 bg-slate-950/40'
                }`}
              >
                <div className="text-[11px] font-bold text-slate-300">
                  父層容器 .parent
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  {positionHasRelative ? 'position: relative ⚓ (鎖定原點)' : 'position: static (無錨定點)'}
                </div>

                {/* 當有 relative 時，子元素固定在父層右上角 */}
                {positionHasRelative && (
                  <div className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg animate-bounce">
                    HOT (子 absolute)
                  </div>
                )}
              </div>

              {/* 當沒有 relative 時，子元素直接飄到瀏覽器右上角 */}
              {!positionHasRelative && (
                <div className="absolute top-2 right-2 bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-lg animate-pulse">
                  HOT (飄到外太空！)
                </div>
              )}
            </div>

            <div className="mt-3 text-xs p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
              {positionHasRelative ? (
                <span className="text-emerald-300 font-medium">
                  🎯 完美錨定：父層設定 relative 後，子層 absolute 的 top: 0, right: 0 就會乖乖依據父層右上角對齊。
                </span>
              ) : (
                <span className="text-rose-300 font-medium">
                  ⚠️ 悲劇發生：父層缺少 relative，子層 absolute 會一路往上尋找，最後跑到整個網頁右上角！
                </span>
              )}
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 7. Flexbox 雙軸指揮圖解
    // ----------------------------------------------------------------
    case 'css-flexbox-superhero':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Columns className="w-3.5 h-3.5" />
                <span>Flexbox 雙軸指揮架構圖 (Main & Cross Axis)</span>
              </span>
              <div className="flex gap-1">
                {(['flex-start', 'center', 'space-between'] as const).map((just) => (
                  <button
                    key={just}
                    type="button"
                    onClick={() => setFlexJustify(just)}
                    className={`text-[11px] px-2 py-0.5 rounded transition-colors font-mono ${
                      flexJustify === just
                        ? 'bg-sky-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400'
                    }`}
                  >
                    {just}
                  </button>
                ))}
              </div>
            </div>

            {/* 雙軸示意箭頭 + 容器展示 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] text-sky-400 font-mono px-1">
                <span>主軸 Main Axis (justify-content) ➔</span>
                <span className="text-slate-400">gap: 12px</span>
              </div>

              <div
                className="p-3 bg-slate-900 rounded-lg border border-sky-500/40 flex items-center min-h-[90px] transition-all gap-3"
                style={{ justifyContent: flexJustify }}
              >
                <div className="w-14 h-12 bg-sky-500 text-slate-950 font-bold rounded flex items-center justify-center text-xs shadow-md">
                  1
                </div>
                <div className="w-14 h-12 bg-sky-400 text-slate-950 font-bold rounded flex items-center justify-center text-xs shadow-md">
                  2
                </div>
                <div className="w-14 h-12 bg-sky-300 text-slate-950 font-bold rounded flex items-center justify-center text-xs shadow-md">
                  3
                </div>
              </div>

              <div className="text-[11px] text-indigo-400 font-mono px-1">
                ↓ 交叉軸 Cross Axis (align-items: center 垂直置中)
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-sky-400 font-bold">終極置中公式：</span>
              <code className="text-indigo-300 font-mono ml-1">display: flex; justify-content: center; align-items: center;</code>
              <span className="text-slate-400 block mt-1">
                同時搞定水平與垂直置中，前端面試與技能競賽最高頻考點！
              </span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 8. Grid 棋盤網格圖解
    // ----------------------------------------------------------------
    case 'css-grid-layout':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-purple-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <GridIcon className="w-3.5 h-3.5" />
                <span>Grid 二維棋盤劃線圖 (2D Grid Blueprint)</span>
              </span>
              <span className="text-[11px] text-purple-300 font-mono">repeat(3, 1fr)</span>
            </div>

            {/* 3 欄等比棋盤示意圖 */}
            <div className="p-3 bg-slate-900 rounded-lg border border-purple-500/40">
              <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-mono">
                <div className="bg-purple-950/60 border border-purple-500/40 p-3 rounded text-purple-200">
                  <div className="font-bold text-sm">1fr</div>
                  <div className="text-[10px] text-slate-400">第一欄</div>
                </div>
                <div className="bg-purple-950/60 border border-purple-500/40 p-3 rounded text-purple-200">
                  <div className="font-bold text-sm">1fr</div>
                  <div className="text-[10px] text-slate-400">第二欄</div>
                </div>
                <div className="bg-purple-950/60 border border-purple-500/40 p-3 rounded text-purple-200">
                  <div className="font-bold text-sm">1fr</div>
                  <div className="text-[10px] text-slate-400">第三欄</div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-purple-400 font-bold">什麼是 1fr？</span>
              <span className="text-slate-400 ml-1">
                fr 代表「Fraction 等份比例」。三欄各設 1fr，瀏覽器會將容器寬度減去 gap 間距後「完美均分三等份」，視窗變大變小自動等比縮放！
              </span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 9. 圓角與立體陰影光學圖解
    // ----------------------------------------------------------------
    case 'css-shadows-radii':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5" />
                <span>圓角演變與陰影光學 (Optics & Geometry)</span>
              </span>
              <span className="text-[11px] text-slate-400">視覺層次解析</span>
            </div>

            {/* 圓角階梯與頭像 */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-900 border border-slate-700 rounded-none">
                <div className="font-mono text-slate-300">0px</div>
                <div className="text-[10px] text-slate-500 mt-0.5">銳利直角</div>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-700 rounded-lg">
                <div className="font-mono text-slate-300">8px</div>
                <div className="text-[10px] text-slate-500 mt-0.5">柔和卡片</div>
              </div>
              <div className="p-2 bg-slate-900 border border-slate-700 rounded-2xl">
                <div className="font-mono text-slate-300">16px</div>
                <div className="text-[10px] text-slate-500 mt-0.5">現代膠囊</div>
              </div>
              <div className="p-2 bg-sky-950/60 border border-sky-500/50 rounded-full flex flex-col items-center justify-center">
                <div className="font-mono text-sky-300 font-bold">50%</div>
                <div className="text-[10px] text-sky-400 font-bold">正圓頭像</div>
              </div>
            </div>

            {/* 陰影四參數解讀 */}
            <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-2">
              <div className="font-mono text-amber-300">
                box-shadow: <span className="text-sky-400">0</span> <span className="text-indigo-400">10px</span> <span className="text-emerald-400">25px</span> <span className="text-slate-400">rgba(0,0,0,0.4);</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400 pt-1">
                <div>• <span className="text-sky-400 font-mono">X-offset (0)</span>：水平位移</div>
                <div>• <span className="text-indigo-400 font-mono">Y-offset (10px)</span>：垂直向下沉</div>
                <div>• <span className="text-emerald-400 font-mono">Blur (25px)</span>：羽化柔焦半徑</div>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 10. 動畫與轉場時間軸圖解
    // ----------------------------------------------------------------
    case 'css-transitions-animations':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-indigo-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>轉場貝茲曲線與微互動 (Transition Timeline)</span>
              </span>
              <span className="text-[11px] text-indigo-300 font-mono">0.3s ease</span>
            </div>

            {/* 瞬變 vs 絲滑曲線圖 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/30">
                <div className="font-bold text-rose-400 mb-1">❌ 沒加 transition（瞬間瞬切）</div>
                <div className="h-16 flex items-center justify-between px-2 bg-slate-900 rounded font-mono text-[11px]">
                  <span>0s: 原樣</span>
                  <span className="text-rose-400 font-bold">⚡ 0秒閃變！</span>
                  <span>hover 結束</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5">突兀閃爍，缺乏視覺連續性。</div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30">
                <div className="font-bold text-emerald-400 mb-1">✅ 加了 transition（絲滑過渡）</div>
                <div className="h-16 flex items-center justify-between px-2 bg-slate-900 rounded font-mono text-[11px]">
                  <span>0s 起點</span>
                  <span className="text-emerald-300 font-bold">〜 0.3s 柔順緩動 〜</span>
                  <span>終點</span>
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5">配合 transform 上浮 4px，滿分高級感。</div>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-amber-400 font-bold">💡 考場地雷提醒：</span>
              <span>transition 務必宣告在「元素本體」，千萬不要只宣告在 :hover 裡面，否則滑鼠移開時會變回生硬瞬切！</span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 11. 響應式 Media Queries 跨屏圖解
    // ----------------------------------------------------------------
    case 'css-responsive-media-queries':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-sky-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5" />
                <span>跨裝置響應式變形圖解 (RWD Transformation)</span>
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setRwdMode('desktop')}
                  className={`text-[11px] px-2.5 py-0.5 rounded transition-colors ${
                    rwdMode === 'desktop'
                      ? 'bg-sky-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  🖥️ 電腦版 (&gt;768px)
                </button>
                <button
                  type="button"
                  onClick={() => setRwdMode('mobile')}
                  className={`text-[11px] px-2.5 py-0.5 rounded transition-colors ${
                    rwdMode === 'mobile'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  📱 手機版 (≤600px)
                </button>
              </div>
            </div>

            {/* 跨屏模擬器 */}
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 flex justify-center">
              <div
                className={`transition-all duration-300 border-2 border-dashed border-sky-500/40 p-3 rounded-lg ${
                  rwdMode === 'desktop' ? 'w-full' : 'w-48'
                }`}
              >
                <div className="text-[10px] text-slate-400 font-mono mb-2 text-center">
                  {rwdMode === 'desktop' ? '寬螢幕：flex-direction: row (橫排並立)' : '小螢幕：flex-direction: column (直排堆疊)'}
                </div>

                <div
                  className={`flex gap-2 transition-all ${
                    rwdMode === 'desktop' ? 'flex-row' : 'flex-col'
                  }`}
                >
                  <div className="flex-1 bg-sky-500/30 border border-sky-400 text-sky-200 text-xs p-2 rounded text-center font-semibold">
                    卡片 1
                  </div>
                  <div className="flex-1 bg-sky-500/30 border border-sky-400 text-sky-200 text-xs p-2 rounded text-center font-semibold">
                    卡片 2
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-sky-400 font-bold">自適應金手秘笈：</span>
              <span>
                在大螢幕保留橫排視野，在手機版觸發
                <code className="text-amber-300 font-mono mx-1">@media (max-width: 600px)</code>
                自動直排，徹底杜絕水平橫向捲軸！
              </span>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 13. 一頁式形象網站架構與 RWD 骨架圖 (畢業專題考題)
    // ----------------------------------------------------------------
    case 'css-capstone-landing-page':
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-amber-500/40 rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>🏆 一頁式形象網站解剖藍圖 (One-Page Anatomy)</span>
              </span>

              {/* 切換電腦版 vs 手機版檢視 */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setRwdMode('desktop')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    rwdMode === 'desktop'
                      ? 'bg-sky-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🖥️ 電腦版 (3欄 Grid)
                </button>
                <button
                  type="button"
                  onClick={() => setRwdMode('mobile')}
                  className={`px-2.5 py-1 rounded font-medium transition-all ${
                    rwdMode === 'mobile'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  📱 手機版 (1欄 RWD)
                </button>
              </div>
            </div>

            {/* 結構骨架視覺圖解模擬器 */}
            <div className={`mx-auto transition-all duration-500 bg-slate-900 border border-slate-700 rounded-xl p-3 shadow-xl ${
              rwdMode === 'desktop' ? 'w-full max-w-xl' : 'w-64 max-w-full'
            }`}>
              {/* 1. Navbar */}
              <div className="p-2 rounded bg-slate-800/90 border border-sky-500/40 flex items-center justify-between text-[11px] mb-2">
                <span className="font-bold text-sky-400">⚡ LOGO</span>
                <div className="flex items-center gap-2 text-[10px] text-slate-300">
                  <span>首頁</span>
                  <span>作品</span>
                  <span className="bg-sky-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">聯絡</span>
                </div>
              </div>
              <div className="text-[10px] text-sky-400/80 font-mono mb-2 text-center">
                ↑ .navbar {'{ display: flex; justify-content: space-between; }'}
              </div>

              {/* 2. Hero Section */}
              <div className="relative rounded bg-slate-800 border border-amber-500/40 p-4 text-center overflow-hidden mb-2">
                <div className="absolute top-1.5 right-1.5 bg-amber-500 text-slate-950 font-bold text-[9px] px-2 py-0.5 rounded-full shadow-xs">
                  🏆 絕對定位 (position: absolute)
                </div>
                <div className="text-[10px] text-slate-400 font-mono mb-1">
                  📸 Picsum 橫幅 (object-fit: cover)
                </div>
                <div className="text-xs font-bold text-white mb-1">極致簡約 • 數位未來</div>
                <div className="text-[10px] text-slate-300 max-w-xs mx-auto">
                  Hero Banner 主視覺區塊
                </div>
              </div>

              {/* 3. Cards Grid */}
              <div className={`grid gap-2 mb-2 transition-all ${
                rwdMode === 'desktop' ? 'grid-cols-3' : 'grid-cols-1'
              }`}>
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-2 rounded bg-slate-800/80 border border-slate-700 text-center">
                    <div className="h-10 rounded bg-slate-700/60 flex items-center justify-center text-[9px] text-sky-300 font-mono mb-1">
                      🖼️ Picsum {num}
                    </div>
                    <div className="text-[10px] font-bold text-slate-200">專案卡片 0{num}</div>
                    <div className="text-[9px] text-slate-400">等比卡片</div>
                  </div>
                ))}
              </div>
              <div className="text-[10px] text-amber-400/80 font-mono text-center">
                {rwdMode === 'desktop' 
                  ? '↑ .cards-grid { display: grid; grid-template-columns: repeat(3, 1fr); }'
                  : '↑ @media (max-width: 768px) { .cards-grid { grid-template-columns: 1fr; } }'}
              </div>

              {/* 4. Footer */}
              <div className="mt-2 p-1.5 rounded bg-slate-950 text-center text-[9px] text-slate-500">
                © 2026 一頁式網站結業專案
              </div>
            </div>

            {/* 考題重點提示 */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-sky-400">📸 Picsum 假圖防破版關鍵：</span>
                <p className="text-[11px] text-slate-300 mt-1 font-mono">
                  img {'{ width: 100%; height: 180px; object-fit: cover; }'}
                </p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/90 border border-slate-800">
                <span className="font-bold text-amber-400">📱 響應式雙向斷點檢驗：</span>
                <p className="text-[11px] text-slate-300 mt-1 font-mono">
                  電腦版 3 欄等分 ➔ 手機版自適應折疊 1 欄
                </p>
              </div>
            </div>
          </div>
        </div>
      );

    // ----------------------------------------------------------------
    // 12. 純 CSS Spinner 摩天輪運作拆解圖
    // ----------------------------------------------------------------
    case 'css-competition-final':
    default:
      return (
        <div className="space-y-4">
          <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5" />
                <span>純 CSS Spinner 運作分解圖 (Loading Ring)</span>
              </span>
              <span className="text-[11px] text-emerald-300 font-mono">0° → 360°</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-slate-700 mb-2"></div>
                <div className="font-bold text-slate-300">1. 正圓底框</div>
                <div className="text-[10px] text-slate-400 mt-1">border-radius: 50%</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-slate-700 border-t-sky-400 mb-2"></div>
                <div className="font-bold text-sky-400">2. 單邊高亮</div>
                <div className="text-[10px] text-slate-400 mt-1">border-top-color: #38bdf8</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <div className="w-10 h-10 mx-auto rounded-full border-4 border-slate-700 border-t-sky-400 animate-spin mb-2"></div>
                <div className="font-bold text-emerald-400">3. 無窮旋轉</div>
                <div className="text-[10px] text-slate-400 mt-1">animation: spin 1s infinite</div>
              </div>
            </div>

            <div className="mt-3 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold">三行關鍵代碼：</span>
              <code className="text-sky-300 font-mono ml-1">border-radius: 50%; border-top-color: #38bdf8; animation: spin 1s linear infinite;</code>
            </div>
          </div>
        </div>
      );
  }
};
