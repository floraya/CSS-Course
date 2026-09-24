import Prism from 'prismjs';

// Enhance Prism CSS definitions to match VS Code Dark+ color classifications
if (Prism.languages.css) {
  Prism.languages.insertBefore('css', 'punctuation', {
    'color-hex': {
      pattern: /#(?:[0-9a-fA-F]{3,4}){1,2}\b/,
      alias: 'number'
    },
    'unit-number': {
      pattern: /\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|deg|s|ms|fr|ch|vmin|vmax)?\b/,
      alias: 'number'
    },
    'css-keyword': {
      pattern: /\b(?:block|inline-block|inline|flex|grid|none|relative|absolute|fixed|sticky|static|auto|inherit|initial|unset|border-box|content-box|center|space-between|space-around|space-evenly|stretch|flex-start|flex-end|bold|normal|pointer|hidden|visible|transparent|solid|dashed|dotted|double|wrap|nowrap|row|column|uppercase|lowercase|capitalize|underline|sans-serif|serif|monospace)\b/i,
      alias: 'keyword'
    },
    'css-function': {
      pattern: /\b(?:rgba?|hsla?|calc|var|min|max|clamp|url|linear-gradient|radial-gradient)(?=\()/i,
      alias: 'function'
    }
  });
}

/**
 * Highlights code string into VS Code Dark+ themed HTML tokens
 */
export function highlightCode(code: string, language: 'css' | 'html' | 'markup' = 'css'): string {
  if (!code) return '';
  const lang = language === 'html' ? 'markup' : language;
  const grammar = Prism.languages[lang] || Prism.languages.css;
  
  let highlighted = Prism.highlight(code, grammar, lang);

  // VS Code bracket pair colorization: replace { and } with gold colored spans
  highlighted = highlighted.replace(
    /(<span class="token punctuation">)(\{|\})(<\/span>)/g,
    '<span class="token punctuation bracket-gold">$2</span>'
  );

  return highlighted;
}
