import React from 'react';
import { Layers } from 'lucide-react';

interface BoxModelValues {
  margin: string;
  border: string;
  padding: string;
  width: string;
  height: string;
}

interface BoxModelInspectorProps {
  values?: BoxModelValues;
}

export const BoxModelInspector: React.FC<BoxModelInspectorProps> = ({
  values = {
    margin: '16px',
    border: '2px',
    padding: '20px',
    width: 'auto',
    height: 'auto',
  },
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs font-mono select-none">
      <div className="flex items-center gap-2 mb-3 text-slate-400 font-sans font-semibold text-xs uppercase tracking-wider">
        <Layers className="w-3.5 h-3.5 text-amber-400" />
        <span>盒模型即時透視圖 (Box Model Inspector)</span>
      </div>

      {/* Margin (Orange) */}
      <div className="bg-amber-950/40 border border-amber-500/40 rounded-lg p-2.5 text-center relative transition-all">
        <span className="absolute top-1 left-2 text-[10px] text-amber-400 font-bold uppercase tracking-wider">
          margin ({values.margin})
        </span>

        {/* Border (Yellow) */}
        <div className="bg-yellow-950/40 border border-yellow-500/40 rounded-md p-2.5 text-center relative mt-3 mb-1 transition-all">
          <span className="absolute top-1 left-2 text-[10px] text-yellow-400 font-bold uppercase tracking-wider">
            border ({values.border})
          </span>

          {/* Padding (Green) */}
          <div className="bg-emerald-950/40 border border-emerald-500/40 rounded p-2.5 text-center relative mt-3 mb-1 transition-all">
            <span className="absolute top-1 left-2 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
              padding ({values.padding})
            </span>

            {/* Content (Blue) */}
            <div className="bg-sky-900/60 border border-sky-400/60 rounded py-2 px-4 text-center mt-3 text-sky-200 font-semibold shadow-inner">
              <span className="block text-[10px] text-sky-400">content</span>
              <span>{values.width} × {values.height}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 text-[11px] text-slate-400 text-center font-sans">
        💡 橘色外距 (Margin) ➔ 黃色邊框 (Border) ➔ 綠色內距 (Padding) ➔ 藍色內容 (Content)
      </div>
    </div>
  );
};
