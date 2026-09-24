import React, { useState } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  Copy, 
  Check, 
  Download, 
  Monitor, 
  Smartphone, 
  Tablet, 
  Layers, 
  Code2,
  Play
} from 'lucide-react';
import { VsCodeEditor } from './VsCodeEditor';

const PRESETS = [
  {
    name: '🌟 預設範本：金手獎現代卡片',
    html: `<div class="card">
  <span class="tag">技能競賽</span>
  <h2>CSS 互動實驗室</h2>
  <p>在這裡你可以自由揮灑創意，測試任何 CSS 屬性與動畫效果！</p>
  <button class="btn">探索更多</button>
</div>`,
    css: `.card {
  background: linear-gradient(135deg, #1e293b, #0f172a);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid #334155;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
  max-width: 360px;
  text-align: center;
}

.tag {
  display: inline-block;
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  padding: 4px 12px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: bold;
}

h2 {
  color: #f8fafc;
  margin: 14px 0 8px 0;
  font-size: 22px;
}

p {
  color: #94a3b8;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 24px;
}

.btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
}`,
  },
  {
    name: '📐 Flexbox 終極對齊試驗場',
    html: `<div class="flex-playground">
  <div class="box box-1">1: 首頁</div>
  <div class="box box-2">2: 課程</div>
  <div class="box box-3">3: 競賽題庫</div>
  <div class="box box-4">4: 獎牌榜</div>
</div>`,
    css: `.flex-playground {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  background-color: #1e293b;
  padding: 24px;
  border-radius: 12px;
  border: 2px dashed #475569;
  width: 100%;
  max-width: 500px;
}

.box {
  background-color: #3b82f6;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
  font-weight: bold;
  font-size: 14px;
  transition: transform 0.2s;
}

.box:hover {
  transform: scale(1.05);
}

.box-1 { background-color: #3b82f6; }
.box-2 { background-color: #10b981; }
.box-3 { background-color: #f59e0b; }
.box-4 { background-color: #8b5cf6; }`,
  },
  {
    name: '⚡ 懸浮發光按鈕 (Glow Button)',
    html: `<div class="button-showcase">
  <button class="neon-btn">
    <span>✨ 發光粒子特效</span>
  </button>
</div>`,
    css: `.button-showcase {
  text-align: center;
}

.neon-btn {
  background: linear-gradient(90deg, #ec4899, #8b5cf6);
  border: none;
  color: white;
  padding: 16px 36px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
}

.neon-btn:hover {
  transform: scale(1.08);
  box-shadow: 0 0 35px rgba(236, 72, 153, 0.8), 0 0 15px rgba(139, 92, 246, 0.6);
}

.neon-btn:active {
  transform: scale(0.98);
}`,
  },
];

export const SandboxView: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [htmlCode, setHtmlCode] = useState(PRESETS[0].html);
  const [cssCode, setCssCode] = useState(PRESETS[0].css);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showOutlines, setShowOutlines] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setHtmlCode(PRESETS[index].html);
    setCssCode(PRESETS[index].css);
  };

  const handleReset = () => {
    if (window.confirm('確定要重設當前預設範本嗎？')) {
      setHtmlCode(PRESETS[selectedPresetIndex].html);
      setCssCode(PRESETS[selectedPresetIndex].css);
    }
  };

  const handleCopyAll = () => {
    const fullCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <title>CSS 自由沙盒作品</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 30px;
      background-color: #0b0f19;
      color: #f8fafc;
      font-family: system-ui, -apple-system, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'css-sandbox-artwork.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const outlineCss = showOutlines ? `* { outline: 1px dashed rgba(56, 189, 248, 0.4) !important; }` : '';

  const iframeDoc = `
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
          ${outlineCss}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-5">
      {/* Header bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              自由創作沙盒試驗場
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                老師示範 & 自由發揮
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              支援即時 HTML & CSS 雙向自訂編寫，老師可用於現場投影片展示或學生隨意測試新語法。
            </p>
          </div>
        </div>

        {/* Toolbar options */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedPresetIndex}
            onChange={(e) => handleSelectPreset(Number(e.target.value))}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
          >
            {PRESETS.map((p, idx) => (
              <option key={idx} value={idx}>
                {p.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-colors"
            title="重設當前範本"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>重設</span>
          </button>

          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '已複製全部' : '複製代碼'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs rounded-xl shadow transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下載 HTML 檔</span>
          </button>
        </div>
      </div>

      {/* Grid: Left HTML/CSS Editors / Right Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Editors (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* HTML Editor with VS Code Syntax Highlighting */}
          <VsCodeEditor
            value={htmlCode}
            onChange={setHtmlCode}
            language="html"
            placeholder="<!-- 在此輸入 HTML 結構 -->"
            height="180px"
          />

          {/* CSS Editor with VS Code Syntax Highlighting */}
          <VsCodeEditor
            value={cssCode}
            onChange={setCssCode}
            language="css"
            placeholder="/* 在此輸入 CSS 樣式... */"
            height="300px"
          />
        </div>

        {/* Right Column: Live Sandbox Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            {/* Toolbar */}
            <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                <span>即時渲染結果</span>
              </div>

              {/* Viewport switchers */}
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  onClick={() => setViewport('desktop')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewport === 'desktop' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="寬螢幕"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('tablet')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewport === 'tablet' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="平板"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewport('mobile')}
                  className={`p-1.5 rounded text-xs transition-colors ${
                    viewport === 'mobile' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                  title="手機"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Outlines */}
              <button
                onClick={() => setShowOutlines(!showOutlines)}
                className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                  showOutlines
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>外框線</span>
              </button>
            </div>

            {/* Canvas */}
            <div className="p-4 bg-slate-950 flex items-center justify-center min-h-[530px] overflow-hidden">
              <div
                className={`bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-2xl transition-all duration-300 ${
                  viewport === 'desktop'
                    ? 'w-full h-[530px]'
                    : viewport === 'tablet'
                    ? 'w-[480px] h-[530px]'
                    : 'w-[320px] h-[530px]'
                }`}
              >
                <iframe
                  title="Free Sandbox Live Preview"
                  srcDoc={iframeDoc}
                  className="w-full h-full border-0"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
