import React, { useRef, useEffect, useState, useMemo } from 'react';

interface VsCodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  height?: string;
  readOnly?: boolean;
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
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = useMemo(() => {
    return value.split('\n');
  }, [value]);

  // Sync scroll between line numbers and textarea
  const handleScroll = () => {
    if (textareaRef.current && lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
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
    if (readOnly) return;
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

      // Set cursor between the pair
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        updateCursorInfo();
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

      // If cursor is right between { and }
      if (charBefore === '{' && charAfter === '}') {
        e.preventDefault();
        // Determine current line indent
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
        }, 0);
        return;
      }

      // General Smart Enter: inherit previous line indentation
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const currentLineText = value.slice(lineStart, start);
      const matchIndent = currentLineText.match(/^(\s*)/);
      if (matchIndent && matchIndent[1].length > 0) {
        e.preventDefault();
        const indent = matchIndent[1];
        const insertText = '\n' + indent;
        const newValue = value.slice(0, start) + insertText + value.slice(end);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + insertText.length;
          updateCursorInfo();
        }, 0);
        return;
      }
    }

    // 4. VS Code: Tab key inserts 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!e.shiftKey) {
        const indent = '  ';
        const newValue = value.slice(0, start) + indent + value.slice(end);
        onChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + indent.length;
          updateCursorInfo();
        }, 0);
      } else {
        // Shift+Tab: outdent current line
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        if (value.slice(lineStart, lineStart + 2) === '  ') {
          const newValue = value.slice(0, lineStart) + value.slice(lineStart + 2);
          onChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = Math.max(lineStart, start - 2);
            updateCursorInfo();
          }, 0);
        }
      }
      return;
    }

    // 5. VS Code: Backspace pair deletion
    if (e.key === 'Backspace' && start === end && start > 0) {
      const prevChar = value[start - 1];
      const nextChar = value[start];

      if (
        (prevChar === '{' && nextChar === '}') ||
        (prevChar === '(' && nextChar === ')') ||
        (prevChar === '[' && nextChar === ']') ||
        (prevChar === '"' && nextChar === '"') ||
        (prevChar === "'" && nextChar === "'")
      ) {
        e.preventDefault();
        const newValue = value.slice(0, start - 1) + value.slice(start + 1);
        onChange(newValue);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start - 1;
          updateCursorInfo();
        }, 0);
        return;
      }
    }
  };

  // Helper function to insert snippet at cursor (e.g. from quick chips)
  const insertSnippet = (snippet: string, cursorOffset = snippet.length) => {
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
    }, 0);
  };

  return (
    <div className="flex flex-col bg-[#1e1e1e] border border-[#333333] rounded-xl overflow-hidden shadow-xl text-slate-200">
      {/* VS Code Tab Header */}
      <div className="bg-[#252526] border-b border-[#1f1f1f] px-3 py-1.5 flex items-center justify-between text-xs select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-[#1e1e1e] text-sky-400 font-mono text-[11px] rounded-t-md border-t-2 border-sky-500">
            <span className="text-[#38bdf8] font-bold">#</span>
            <span>style.css</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            (支援 VS Code 自動補全括號、智慧縮排)
          </span>
        </div>

        {/* 快速常用符號鍵盤小工具（新手/選手便利鍵） */}
        {!readOnly && (
          <div className="flex items-center gap-1 overflow-x-auto">
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

      {/* Editor Main Canvas with Synchronized Line Numbers */}
      <div className="relative flex bg-[#1e1e1e]" style={{ height }}>
        {/* Line Numbers Gutter */}
        <div
          ref={lineNumbersRef}
          aria-hidden="true"
          className="w-12 bg-[#1e1e1e] border-r border-[#2d2d2d] py-3 text-right pr-3 font-mono text-xs select-none overflow-hidden text-[#858585] leading-[20px]"
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

        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursorInfo}
          onClick={updateCursorInfo}
          onScroll={handleScroll}
          readOnly={readOnly}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[#d4d4d4] font-mono text-xs leading-[20px] p-3 resize-none focus:outline-none border-0 selection:bg-[#264f78] whitespace-pre tab-[2] overflow-auto"
          style={{ tabSize: 2 }}
        />
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
          <span className="font-semibold">CSS</span>
        </div>
      </div>
    </div>
  );
};
