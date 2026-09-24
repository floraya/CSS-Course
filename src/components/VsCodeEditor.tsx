import React, { useRef, useState, useMemo, useLayoutEffect } from 'react';
import { highlightCode } from '../utils/codeHighlighter';
import { Copy, Check } from 'lucide-react';

export interface VsCodeEditorProps {
  value: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
  readOnly?: boolean;
  language?: 'css' | 'html';
  fileName?: string;
}

const AUTO_CLOSE_PAIRS: Record<string, string> = {
  '{': '}',
  '(': ')',
  '[': ']',
  '"': '"',
  "'": "'",
};

const CLOSING_CHARS = new Set(['}', ')', ']', '"', "'"]);

export const VsCodeEditor: React.FC<VsCodeEditorProps> = ({
  value,
  onChange,
  placeholder = '/* 請在此輸入 CSS 程式碼 */',
  height = '320px',
  readOnly = false,
  language = 'css',
  fileName,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLPreElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    return value.split('\n');
  }, [value]);

  const defaultFileName = fileName || (language === 'html' ? 'index.html' : 'style.css');

  // Syntax highlighting via Prism with VS Code Dark+ classes
  const highlightedHtml = useMemo(() => {
    return highlightCode(value, language);
  }, [value, language]);

  // Sync scroll between textarea, line numbers, and highlight display layer
  const handleScroll = () => {
    if (textareaRef.current) {
      const top = textareaRef.current.scrollTop;
      const left = textareaRef.current.scrollLeft;

      if (lineNumbersRef.current) {
        lineNumbersRef.current.scrollTop = top;
      }
      if (highlightRef.current) {
        highlightRef.current.scrollTop = top;
        highlightRef.current.scrollLeft = left;
      }
    }
  };

  // Sync scroll on initial render or value change
  useLayoutEffect(() => {
    handleScroll();
  }, [value]);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Update cursor position line & column
  const updateCursorInfo = () => {
    if (!textareaRef.current) return;
    const pos = textareaRef.current.selectionStart;
    const textBefore = value.slice(0, pos);
    const linesBefore = textBefore.split('\n');
    const currentLine = linesBefore.length;
    const currentCol = linesBefore[linesBefore.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (readOnly || !onChange) return;
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // 1. VS Code: Auto-closing brackets: { -> {}
    if (AUTO_CLOSE_PAIRS[e.key] && start === end) {
      e.preventDefault();
      const openChar = e.key;
      const closeChar = AUTO_CLOSE_PAIRS[openChar];

      // If user typed quotes and next char is the quote itself, step over
      if ((openChar === '"' || openChar === "'") && value[start] === openChar) {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        updateCursorInfo();
        return;
      }

      const newValue = value.slice(0, start) + openChar + closeChar + value.slice(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        updateCursorInfo();
        handleScroll();
      }, 0);
      return;
    }

    // 2. VS Code: Step over closing bracket if user manually types it
    if (CLOSING_CHARS.has(e.key) && start === end && value[start] === e.key) {
      e.preventDefault();
      textarea.selectionStart = textarea.selectionEnd = start + 1;
      updateCursorInfo();
      return;
    }

    // 3. VS Code: Smart Enter inside { }
    if (e.key === 'Enter') {
      const charBefore = value[start - 1];
      const charAfter = value[start];

      if (charBefore === '{' && charAfter === '}') {
        e.preventDefault();
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const currentLineText = value.slice(lineStart, start);
        const matchIndent = currentLineText.match(/^(\s*)/);
        const baseIndent = matchIndent ? matchIndent[1] : '';
        const insideIndent = baseIndent + '  ';

        const insertText = `\n${insideIndent}\n${baseIndent}`;
        const newValue = value.slice(0, start) + insertText + value.slice(end);
        onChange(newValue);

        setTimeout(() => {
          const newPos = start + 1 + insideIndent.length;
          textarea.selectionStart = textarea.selectionEnd = newPos;
          updateCursorInfo();
          handleScroll();
        }, 0);
        return;
      }

      // Preserve indentation on regular Enter
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLineText = value.slice(lineStart, start);
      const matchIndent = currentLineText.match(/^(\s*)/);
      if (matchIndent && matchIndent[1].length > 0) {
        e.preventDefault();
        const indent = matchIndent[1];
        const newValue = value.slice(0, start) + '\n' + indent + value.slice(end);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + indent.length;
          updateCursorInfo();
          handleScroll();
        }, 0);
        return;
      }
    }

    // 4. VS Code: Tab Indent (2 spaces)
    if (e.key === 'Tab') {
      e.preventDefault();
      const indent = '  ';

      if (!e.shiftKey) {
        const newValue = value.slice(0, start) + indent + value.slice(end);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + indent.length;
          updateCursorInfo();
          handleScroll();
        }, 0);
      } else {
        // Shift + Tab outdent
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const lineText = value.slice(lineStart, start);
        if (lineText.startsWith('  ')) {
          const newValue = value.slice(0, lineStart) + value.slice(lineStart + 2);
          onChange(newValue);

          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 2);
            updateCursorInfo();
            handleScroll();
          }, 0);
        }
      }
      return;
    }

    // 5. Backspace pair deletion: deleting { deletes matching }
    if (e.key === 'Backspace' && start === end && start > 0) {
      const prevChar = value[start - 1];
      const nextChar = value[start];
      if (AUTO_CLOSE_PAIRS[prevChar] === nextChar) {
        e.preventDefault();
        const newValue = value.slice(0, start - 1) + value.slice(start + 1);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start - 1;
          updateCursorInfo();
          handleScroll();
        }, 0);
      }
    }
  };

  const insertSnippet = (snippet: string, cursorOffset: number = snippet.length) => {
    if (readOnly || !onChange) return;
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const newValue = value.slice(0, start) + snippet + value.slice(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + cursorOffset;
      updateCursorInfo();
      handleScroll();
    }, 0);
  };

  return (
    <div className={`flex flex-col bg-[#1e1e1e] border border-[#333333] rounded-xl overflow-hidden shadow-xl text-slate-200 ${className}`}>
      {/* VS Code Tab Header */}
      <div className="bg-[#252526] border-b border-[#1f1f1f] px-3 py-1.5 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] text-sky-400 font-mono text-[11px] rounded-t-md border-t-2 border-sky-500">
            <span className={language === 'html' ? 'text-amber-400 font-bold' : 'text-[#38bdf8] font-bold'}>
              {language === 'html' ? '<>' : '#'}
            </span>
            <span>{defaultFileName}</span>
            {readOnly && (
              <span className="text-[10px] text-slate-500 bg-[#2d2d2d] px-1 rounded ml-1">唯讀</span>
            )}
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            {readOnly ? '(VS Code 語法色彩標籤)' : '(支援 VS Code 語法高亮、自動補全括號、智慧縮排)'}
          </span>
        </div>

        {/* 頂部操作按鈕（複製代碼 / 常用快捷片段） */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-[#2d2d2d] hover:bg-[#383838] transition-colors"
            title="複製程式碼"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="text-[10px]">{copied ? '已複製' : '複製'}</span>
          </button>

          {!readOnly && language === 'css' && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                type="button"
                onClick={() => insertSnippet('{\n  \n}', 4)}
                className="px-2 py-0.5 rounded bg-[#2d2d2d] hover:bg-[#3d3d3d] text-[11px] font-mono text-amber-300 transition-colors"
                title="插入大括號換行"
              >
                {`{ }`}
              </button>
              <button
                type="button"
                onClick={() => insertSnippet(': ;', 2)}
                className="px-2 py-0.5 rounded bg-[#2d2d2d] hover:bg-[#3d3d3d] text-[11px] font-mono text-sky-300 transition-colors"
                title="插入屬性冒號分號"
              >
                : ;
              </button>
              <button
                type="button"
                onClick={() => insertSnippet('px')}
                className="px-1.5 py-0.5 rounded bg-[#2d2d2d] hover:bg-[#3d3d3d] text-[10px] font-mono text-slate-300 transition-colors"
              >
                px
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Editor Main Canvas with Synchronized Line Numbers & Highlighting */}
      <div className="relative flex bg-[#1e1e1e]" style={{ height }}>
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-12 shrink-0 bg-[#1e1e1e] border-r border-[#2d2d2d] py-3 text-right pr-3 font-mono text-xs select-none overflow-hidden text-[#858585] leading-[20px]"
        >
          {lines.map((_, i) => (
            <div
              key={i}
              className={`${
                cursorPos.line === i + 1 ? 'text-sky-400 font-bold bg-[#282828]' : ''
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code Body Area with Highlighting Overlay */}
        <div className="relative flex-1 h-full overflow-hidden">
          {/* Background Highlighted Syntax Layer */}
          <pre
            ref={highlightRef}
            aria-hidden="true"
            className="vscode-highlight absolute inset-0 pointer-events-none p-3 font-mono text-xs leading-[20px] whitespace-pre tab-[2] overflow-hidden m-0 border-0 bg-transparent select-none"
            style={{
              tabSize: 2,
              fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
            dangerouslySetInnerHTML={{
              __html: highlightedHtml ? (highlightedHtml + (value.endsWith('\n') ? '<br />&nbsp;' : '')) : '',
            }}
          />

          {/* Foreground Textarea (Transparent text, visible cursor, caret and selection) */}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorInfo}
            onClick={updateCursorInfo}
            onScroll={handleScroll}
            readOnly={readOnly}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder={placeholder}
            className="vscode-editor-textarea absolute inset-0 w-full h-full bg-transparent font-mono text-xs leading-[20px] p-3 resize-none focus:outline-none border-0 selection:bg-[#264f78]/60 whitespace-pre tab-[2] overflow-auto m-0"
            style={{
              tabSize: 2,
              fontFamily: "'Fira Code', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              caretColor: '#ffffff',
            }}
          />
        </div>
      </div>

      {/* VS Code Status Bar */}
      <div className="bg-[#007acc] text-white px-3 py-1 flex items-center justify-between text-[11px] font-mono select-none">
        <div className="flex items-center gap-3">
          <span>
            行 {cursorPos.line}，欄 {cursorPos.col}
          </span>
          <span className="hidden sm:inline">空格: 2</span>
        </div>
        <div className="flex items-center gap-3">
          <span>UTF-8</span>
          <span className="font-semibold uppercase">{language}</span>
        </div>
      </div>
    </div>
  );
};
